import { notFound } from 'next/navigation'
import AboutSection from './_components/about-section'
import CoverSection from './_components/cover-section'
import { FormDonate } from './_components/form'
import { getInfoUser } from './_data-access/get-info-user'

export default async function Apoia({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  const user = await getInfoUser({ username })

  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <CoverSection
        coverImage={user.image ?? ''}
        profileImage={user.image ?? ''}
        name={user.name ?? 'Sem nome'}
      />

      <main className="container mx-auto max-w-6xl p-4 sm:p-6">
        <div className="relative z-10 -mt-8 flex flex-col-reverse gap-6 md:-mt-16 lg:flex-row lg:gap-8">
          <div className="flex-1">
            <AboutSection
              description={user.bio ?? 'Sem nome'}
              name={user.name ?? ''}
            />
          </div>
          <div className="flex-1">
            {' '}
            <FormDonate
              slug={user.username!}
              creatorId={user.connectedStripeAccountId ?? ''}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
