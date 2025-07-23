import { AvatarIcon } from '@/components/avatar-icon'
import { UserDataForm } from './form'

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
    <section className="mx-auto flex w-full flex-col items-center gap-4 px-4">
      <div className="">
        <AvatarIcon profileImage={user.image ?? ''} name={user.name ?? '...'} />
      </div>
      <div className="w-full sm:w-[500px]">
        <UserDataForm name={user.name} bio={user.bio} />
      </div>
    </section>
  )
}
