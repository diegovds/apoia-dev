import { DollarSign, Users, Wallet } from 'lucide-react'
import { StatCard } from './stats-card'

export async function Stats() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
      <StatCard
        title="Apoiadores"
        description="Total de apoiadores"
        icon={<Users className="h-8 w-8 text-blue-400" />}
        value={0}
      />

      <StatCard
        title="Total recebido"
        description="Quantidade total recebida"
        icon={<DollarSign className="h-8 w-8 text-amber-500" />}
        value={0}
      />

      <StatCard
        title="Saldo em conta"
        description="Saldo pendente"
        icon={<Wallet className="h-8 w-8 text-green-500" />}
        value={0}
      />
    </div>
  )
}
