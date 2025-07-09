import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const donations = [
  {
    id: '1',
    donorName: 'João Silva',
    donorMessage: 'Adoro seu trabalho!',
    amount: 1000,
    createdAt: new Date('2023-10-01T12:00:00Z'),
  },
]

export function DonationTable() {
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
            {donations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">
                  {donation.donorName}
                </TableCell>
                <TableCell className="max-w-72">
                  {donation.donorMessage}
                </TableCell>
                <TableCell className="text-center">{donation.amount}</TableCell>
                <TableCell className="text-center">
                  {donation.createdAt.toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Versão para mobile */}
      <div className="space-y-4 lg:hidden">
        {donations.map((donation) => (
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
                  {donation.amount}
                </span>
                <span className="text-muted-foreground text-sm">
                  {donation.createdAt.toDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}
