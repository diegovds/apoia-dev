import { DollarSign, Users, Wallet } from 'lucide-react'
import getStatsCreator from '../_data-access/get-stats-creator'
import { StatCard } from './stats-card'
import { formatCurrency } from '@/utils/format'

export async function Stats({
  userId,
  stripeAccountId,
}: {
  userId: string
  stripeAccountId: string
}) {
  const { totalDonations, totalAmountDonated, balance } = await getStatsCreator(
    userId,
    stripeAccountId,
  )

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatCard
        title="Apoiadores"
        description="Total de apoiadores"
        icon={<Users className="h-8 w-8 text-blue-400" />}
        value={totalDonations || '0'}
      />

      <StatCard
        title="Total recebido"
        description="Quantidade total recebida"
        icon={<DollarSign className="h-8 w-8 text-amber-500" />}
        value={formatCurrency(totalAmountDonated || 0)}
      />

      <StatCard
        title="Saldo em conta"
        description="Saldo pendente"
        icon={<Wallet className="h-8 w-8 text-green-500" />}
        value={formatCurrency(balance || 0)}
      />
    </div>
  )
}
