import Image from 'next/image'

export default async function Apoia({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  console.log(username)

  return (
    <div className="min-h-[calc(100vh-64px)]">
      <div className="relative h-64 w-full bg-black">
        <Image
          src={'https://github.com/devfraga.png'}
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
            src={'https://github.com/devfraga.png'}
            className="absolute -top-16 flex h-36 w-36 items-center justify-center rounded-xl border-4 border-white bg-gray-50 object-cover text-3xl text-zinc-900 duration-300 select-none hover:shadow-lg"
            alt="Matheus Fraga"
            width={96}
            height={96}
            quality={100}
          />
          <h1 className="mt-20 mb-4 text-xl font-bold md:text-2xl">
            Fulano Dev
          </h1>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 md:grid-cols-2">
        <section className="mx-2 hidden h-fit flex-col rounded-md bg-gray-50 p-5 md:flex">
          <p className="text-lg font-semibold">Sobre Fulano Dev</p>
          <p className="mt-2 text-gray-500">
            Descrição generica sobre o fulano dev
          </p>
        </section>

        <section className="mx-2 h-fit rounded-md bg-gray-50 p-5">
          <h3 className="text-lg font-semibold">Apoie o Matheus Fraga:</h3>
        </section>
      </div>
    </div>
  )
}
