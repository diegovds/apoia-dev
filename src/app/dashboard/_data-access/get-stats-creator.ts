'use server'

import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export default async function getStatsCreator(
  userId: string,
  stripeAccountId: string,
) {
  if (!userId) {
    return {
      error: 'Usuário não autenticado',
    }
  }

  try {
    const totalDonations = await prisma.donation.count({
      where: {
        userId,
        status: 'PAID',
      },
    })

    const totalAmountDonated = await prisma.donation.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId,
        status: 'PAID',
      },
    })

    const balance = await stripe.balance.retrieve({
      stripeAccount: stripeAccountId,
    })

    return {
      totalDonations,
      totalAmountDonated: totalAmountDonated._sum.amount || 0,
      balance: balance?.pending[0]?.amount || 0,
    }
  } catch (error) {
    return {
      error: 'Erro ao obter estatísticas',
    }
  }
}
