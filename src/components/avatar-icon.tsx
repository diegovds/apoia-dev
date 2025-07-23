import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface AvatarIconProps {
  profileImage: string
  name: string
}

export function AvatarIcon({ name, profileImage }: AvatarIconProps) {
  return (
    <Avatar className="group h-20 w-20 border-2 border-white shadow-2xl sm:h-24 sm:w-24 md:h-32 md:w-32 md:border-4">
      <AvatarImage
        src={profileImage}
        className="duration-300 group-hover:scale-125 group-hover:-rotate-6"
      />
      <AvatarFallback className="text-lg font-bold md:text-xl">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  )
}
