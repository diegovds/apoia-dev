import Image from 'next/image'
import { notFound } from 'next/navigation'
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
    <div className="min-h-[calc(100vh-64px)]">
      <div className="relative h-64 w-full bg-black">
        <Image
          src={user.image ?? 'https://github.com/diegovds.png'}
          alt="Banner"
          fill
          className="object-cover opacity-50"
          priority
          quality={100}
        />
      </div>

      <section className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <Image
            src={user.image ?? 'https://github.com/diegovds.png'}
            className="absolute -top-16 flex h-36 w-36 items-center justify-center rounded-xl border-4 border-white bg-gray-50 object-cover text-3xl text-zinc-900 duration-300 select-none hover:shadow-lg"
            alt={user.name ?? 'User Avatar'}
            width={96}
            height={96}
            quality={100}
          />
          <h1 className="mt-20 mb-4 text-xl font-bold md:text-2xl">
            {user.name ?? 'Sem nome'}
          </h1>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        <section className="mx-2 h-fit flex-col rounded-md bg-gray-50 p-5 md:flex">
          <p className="text-lg font-semibold">Sobre {user.name ?? ''}</p>
          <p className="mt-2 text-gray-500">{user.bio ?? 'Sem biografia'}</p>
        </section>

        <section className="mx-2 h-fit rounded-md bg-gray-50 p-5">
          <h3 className="text-lg font-semibold">
            {user.name ? `Apoiar ${user.name}` : 'Apoiar criador'}
          </h3>

          <FormDonate
            slug={user.username!}
            creatorId={user.connectedStripeAccountId ?? ''}
          />
        </section>
      </div>
    </div>
  )
}
