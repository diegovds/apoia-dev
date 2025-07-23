import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = auth(async function GET(request) {
  if (!request.auth) {
    return NextResponse.json(
      { error: 'Usuário não autenticado' },
      { status: 401 },
    )
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
        userId: request.auth.user?.id,
        status: 'PAID',
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json({ data: donates })
  } catch (err) {
    return NextResponse.json(
      { error: 'Falha ao buscar doações' },
      { status: 400 },
    )
  }
})
