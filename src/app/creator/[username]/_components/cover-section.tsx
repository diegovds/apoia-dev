import { AvatarIcon } from '@/components/avatar-icon'
import Image from 'next/image'

interface CoverSectionProps {
  coverImage: string
  profileImage: string
  name: string
}

export default function CoverSection({
  coverImage,
  name,
  profileImage,
}: CoverSectionProps) {
  return (
    <div className="relative h-48 w-full sm:h-64 md:h-80">
      <Image
        src={coverImage}
        alt="Capa do usuário"
        fill
        className="object-cover"
        priority
        quality={100}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute right-0 bottom-2 left-0 p-4 md:bottom-6 md:p-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:gap-6">
            <div className="relative flex-shrink-0">
              <AvatarIcon name={name} profileImage={profileImage} />
            </div>
            <div className="pb-0 sm:pb-4">
              <h1 className="text-center text-2xl font-bold text-white sm:text-left sm:text-3xl md:text-4xl">
                {name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
