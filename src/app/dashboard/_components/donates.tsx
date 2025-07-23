'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Donation } from '@/generated/prisma'
import { formatCurrency, formatDate } from '@/utils/format'
import { useQuery } from '@tanstack/react-query'
import { env } from '../../../../env-public'

type DonationTableProp = Pick<
  Donation,
  'id' | 'donorName' | 'donorMessage' | 'amount' | 'createdAt'
>

interface ResponseData {
  data: DonationTableProp[]
}

export function DonationTable() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-donates'],
    queryFn: async () => {
      const url = `${env.NEXT_PUBLIC_HOST_URL}/api/donates`

      const response = await fetch(url)
      const json = (await response.json()) as ResponseData

      if (!response.ok) {
        return []
      }

      return json.data
    },
    refetchInterval: 60000, // refetch a cada 60 segundos
  })

  if (isLoading) {
    return (
      <div className="mt-5">
        <p className="text-center text-gray-700">Carregando...</p>
      </div>
    )
  }

  return (
    <>
      {/* Versão para desktop */}
      <div className="hidden lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-black">
                Nome do doador
              </TableHead>
              <TableHead className="font-semibold text-black">
                Mensagem
              </TableHead>
              <TableHead className="text-center font-semibold text-black">
                Valor
              </TableHead>
              <TableHead className="text-center font-semibold text-black">
                Data da doação
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">
                    {donation.donorName}
                  </TableCell>
                  <TableCell className="max-w-72">
                    {donation.donorMessage}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatCurrency(donation.amount)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(donation.createdAt)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {/* Versão para mobile */}
      <div className="space-y-4 lg:hidden">
        {data &&
          data.map((donation) => (
            <Card key={donation.id}>
              <CardHeader>
                <CardTitle className="text-lg">{donation.donorName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2 text-sm">
                  {donation.donorMessage}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-green-500">
                    {formatCurrency(donation.amount)}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {formatDate(donation.createdAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  )
}
