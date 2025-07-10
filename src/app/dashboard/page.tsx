import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Stats } from './_components/analytics'
import { DonationTable } from './_components/donates'

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  return (
    <div className="p-4">
      <section className="mb-4 flex items-center justify-between">
        <div className="flex w-full items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold">Minha conta</h1>
        </div>
      </section>

      <Stats />

      <h2 className="mb-2 text-2xl font-semibold">Últimas doações</h2>
      <DonationTable />
    </div>
  )
}
