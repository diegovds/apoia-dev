import { auth } from '@/lib/auth'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Stats } from './_components/analytics'
import CreateAccountButton from './_components/create-account-button'
import { DonationTable } from './_components/donates'
import { getStripeDashboard } from './_data-access/get-stripe-dashboard'

export async function generateMetadata(): Promise<Metadata> {
  const session = await auth()

  return {
    title: `Dashboard - ${session?.user?.name || 'Sem nome'}`,
  }
}

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  const urlStripeDashboard = await getStripeDashboard(
    session.user.connectedStripeAccountId,
  )

  return (
    <div className="p-4">
      <section className="mb-4 flex items-center justify-between">
        <div className="flex w-full items-center justify-between gap-2">
          <h1 className="text-2xl font-semibold">Minha conta</h1>

          {urlStripeDashboard && (
            <a
              href={urlStripeDashboard}
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

      {session.user.connectedStripeAccountId && (
        <>
          <h2 className="mb-2 text-2xl font-semibold">Últimas doações</h2>
          <Stats
            userId={session.user.id}
            stripeAccountId={session.user.connectedStripeAccountId}
          />
          <DonationTable userId={session.user.id} />
        </>
      )}
    </div>
  )
}
