import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { UrlPreview } from './_components/url'

export default async function Me() {
  const session = await auth()

  if (!session?.user) {
    redirect('/')
  }

  const userData = {
    id: session.user.id,
    name: session.user?.name || null,
    username: session.user?.username || null,
    bio: session.user?.bio || null,
    image: session.user?.image || null,
  }

  return (
    <main className="flex h-full w-full flex-col items-center gap-4 p-4">
      <section className="mx-auto flex w-full flex-col gap-2 rounded-md bg-zinc-900 p-4 lg:flex-row lg:items-center">
        <UrlPreview username={userData.username} />
      </section>
    </main>
  )
}
