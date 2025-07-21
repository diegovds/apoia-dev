'use client'

import { Button } from '@/components/ui/button'
import { Link2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { createUsername } from '../_actions/create-username'
import { env } from '../../../../../env-public'

interface UrlPreviewProps {
  username: string | null
}

export function UrlPreview({ username: slug }: UrlPreviewProps) {
  const [error, setError] = useState<null | string>(null)
  const [username, setUsername] = useState<null | string>(slug)

  const submitAction = async (formdata: FormData) => {
    const username = formdata.get('username') as string

    if (username === '') {
      return
    }

    const response = await createUsername({ username })

    if (response.error) {
      setError(response.error)
      return
    }

    if (response.data) {
      setUsername(response.data)
    }
  }

  if (username) {
    return (
      <div className="flex flex-1 items-center justify-between p-2 text-gray-100">
        <div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-center">
          <h3 className="text-lg font-bold">Sua URL:</h3>
          <Link href={`/creator/${username}`} target="_blank">
            {env.NEXT_PUBLIC_HOST_URL}/creator/{username}
          </Link>
        </div>
        <Link
          href={`/creator/${username}`}
          target="_blank"
          className="hidden rounded-md bg-blue-500 px-4 py-1 md:block"
        >
          <Link2 className="h-5 w-5 text-white" />
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex flex-1 items-center p-2 text-gray-100">
        <form
          action={submitAction}
          className="flex flex-1 flex-col items-start gap-4 md:flex-row md:items-center"
        >
          <div className="flex w-full items-center justify-center">
            <p className="">{env.NEXT_PUBLIC_HOST_URL}/creator/</p>
            <input
              type="text"
              className="h-9 flex-1 rounded-md border border-gray-300 bg-gray-50 px-1 text-black outline-none"
              placeholder="Digite seu username..."
              name="username"
            />
          </div>
          <Button
            type="submit"
            className="h-9 w-full cursor-pointer rounded-md bg-blue-500 px-4 text-white hover:bg-blue-600 md:w-fit"
          >
            Salvar
          </Button>
        </form>
      </div>
      {error && <p className="pl-2 text-red-500">{error}</p>}
    </div>
  )
}
