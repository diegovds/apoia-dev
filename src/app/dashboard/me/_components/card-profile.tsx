import Image from 'next/image'
import { Description } from './description'
import { Name } from './name'

interface CardProfileProps {
  user: {
    id: string
    name: string | null
    username: string | null
    bio: string | null
    image: string | null
  }
}

export function CardProfile({ user }: CardProfileProps) {
  return (
    <section className="mx-auto flex w-full flex-col items-center px-4">
      <div className="">
        <Image
          src={user.image ?? 'https://github.com/diegovds.png'}
          alt="Foto de perfil"
          width={104}
          height={104}
          priority
          quality={100}
          className="rounded-xl border-4 border-white bg-gray-50 object-cover transition-shadow duration-300 hover:shadow-xl"
        />
      </div>
      <div>
        <Name initialName={user.name ?? 'Digite seu nome...'} />
        <Description
          initialDescription={user.bio ?? 'Digite sua biografia...'}
        />
      </div>
    </section>
  )
}
