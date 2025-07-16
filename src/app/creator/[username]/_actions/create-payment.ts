'use server'

import { z } from 'zod'

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
      data: null,
      errors: schema.error.issues[0].message,
    }
  }

  try {
    console.log(data)
  } catch (error) {
    return {
      data: null,
      errors: 'Erro ao criar pagamento. Tente novamente mais tarde.',
    }
  }
}
