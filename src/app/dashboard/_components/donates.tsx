import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency, formatDate } from '@/utils/format'
import getDonates from '../_data-access/get-donates'

export async function DonationTable({ userId }: { userId: string }) {
  const { donates, error } = await getDonates(userId)

  if (error) {
    return null
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
            {donates?.map((donation) => (
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
        {donates?.map((donation) => (
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
