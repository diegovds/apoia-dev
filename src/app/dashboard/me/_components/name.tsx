'use client'

import { debounce } from 'lodash'
import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'sonner'
import { changeName } from '../_actions/change-name'

interface NameProps {
  initialName: string
}

export function Name({ initialName }: NameProps) {
  const [name, setName] = useState(initialName)
  const [originalName] = useState(initialName)

  const debouncedSaveName = useRef(
    debounce(async (currentName: string) => {
      if (currentName.trim() === '') {
        setName(originalName)
        return
      }

      if (currentName !== name) {
        try {
          const response = await changeName({ name: currentName })

          if (response.error) {
            setName(originalName)
            toast.error('Erro ao alterar o nome. Tente novamente.')
            return
          }

          toast.success('Nome alterado com sucesso!')
        } catch (error) {
          toast.error('Erro ao alterar o nome. Tente novamente.')
          setName(originalName)
        }
      }
    }, 500),
  ).current

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)

    debouncedSaveName(value)
  }

  return (
    <input
      type="text"
      className="my-3 w-full max-w-2xl rounded-b-md border border-gray-100 bg-gray-50 p-2 text-center text-xl font-bold outline-none md:text-2xl"
      value={name}
      onChange={handleChangeName}
    />
  )
}
