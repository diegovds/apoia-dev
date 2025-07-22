'use server'

import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'
import { env } from '../../../../../env-server'

const createUsernameSchema = z.object({
  slug: z.string().min(1, 'Slug do creator é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  message: z
    .string()
    .min(1)
    .max(200, 'Mensagem deve ter no máximo 200 caracteres'),
  price: z.number().min(1500, 'Selecione um valor a partir de R$ 15'),
  creatorId: z.string(),
})

type CreatePaymentSchema = z.infer<typeof createUsernameSchema>

export async function createPayment(data: CreatePaymentSchema) {
  const schema = createUsernameSchema.safeParse(data)

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    }
  }

  if (!data.creatorId) {
    return {
      error: 'Criador não encontrado',
    }
  }

  try {
    const creator = await prisma.user.findFirst({
      where: { connectedStripeAccountId: data.creatorId },
    })

    if (!creator) {
      return {
        error: 'Criador não encontrado',
      }
    }

    const applicationFeeAmount = Math.floor(data.price * 0.1)

    const donation = await prisma.donation.create({
      data: {
        donorName: data.name,
        donorMessage: data.message,
        userId: creator.id,
        status: 'PENDING',
        amount: data.price - applicationFeeAmount,
      },
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${env.HOST_URL}/creator/${data.slug}`,
      cancel_url: `${env.HOST_URL}/creator/${data.slug}`,
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `Apoio a ${creator.name}`,
            },
            unit_amount: data.price,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: applicationFeeAmount,
        transfer_data: {
          destination: creator.connectedStripeAccountId as string,
        },
        metadata: {
          donorName: data.name,
          donorMessage: data.message,
          donationId: donation.id,
        },
      },
    })

    return {
      sessionId: session.id,
    }
  } catch (error) {
    return {
      error: 'Erro ao criar pagamento. Tente novamente mais tarde.',
    }
  }
}
