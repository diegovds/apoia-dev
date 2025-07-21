import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Stats } from './_components/analytics'
import CreateAccountButton from './_components/create-account-button'
import { DonationTable } from './_components/donates'
import { getLoginOnboardAccount } from './_data-access/create-onboard-account'

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  const accountUrl = await getLoginOnboardAccount(
    session.user.connectedStripeAccountId,
  )

  return (
    <div className="p-4">
      <section className="mb-4 flex items-center justify-between">
        <div className="flex w-full items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold">Minha conta</h1>

          {accountUrl && (
            <a
              href={accountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-zinc-900 px-4 py-1 text-white transition-colors hover:bg-zinc-800"
            >
              Ajustar conta
            </a>
          )}
        </div>
      </section>

      {!session.user.connectedStripeAccountId && <CreateAccountButton />}

      <Stats />

      <h2 className="mb-2 text-2xl font-semibold">Últimas doações</h2>
      <DonationTable />
    </div>
  )
}
