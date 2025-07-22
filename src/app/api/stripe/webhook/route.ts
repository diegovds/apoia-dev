import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { env } from '../../../../../env-server'

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')!
  const endpointSecret = env.STRIPE_WEBHOOK_SECRET

  let event: Stripe.Event

  try {
    const payload = await req.text()
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (err) {
    return new NextResponse(`Webhook Error`, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const paymentIntentId = session.payment_intent as string

      const paymentIntent =
        await stripe.paymentIntents.retrieve(paymentIntentId)

      const donateId = paymentIntent.metadata.donationId

      try {
        await prisma.donation.update({
          where: {
            id: donateId,
          },
          data: {
            status: 'PAID',
          },
        })
      } catch (err) {
        console.log('## ERRO ', err)
      }

      break
    }

    default:
      console.log(`Evento não tratado ${event.type}`)
  }

  return NextResponse.json({ ok: true })
}
