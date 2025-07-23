'use server'

import { prisma } from '@/lib/prisma'

export default async function getDonates(userId: string) {
  if (!userId) {
    return {
      error: 'Usuário não autenticado',
    }
  }

  try {
    const donates = await prisma.donation.findMany({
      select: {
        id: true,
        donorName: true,
        donorMessage: true,
        amount: true,
        createdAt: true,
      },
      where: {
        userId,
        status: 'PAID',
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return {
      donates,
    }
  } catch (error) {
    return {
      error: 'Erro ao obter doações',
    }
  }
}
