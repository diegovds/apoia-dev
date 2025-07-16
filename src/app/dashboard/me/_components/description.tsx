'use client'

import { debounce } from 'lodash'
import { ChangeEvent, useRef, useState } from 'react'
import { toast } from 'sonner'
import { changeDescription } from '../_actions/change-bio'

interface DescriptionProps {
  initialDescription: string
}

export function Description({ initialDescription }: DescriptionProps) {
  const [description, setDescription] = useState(initialDescription)
  const [originalDescription] = useState(initialDescription)

  const debouncedSaveName = useRef(
    debounce(async (currentDescription: string) => {
      if (currentDescription.trim() === '') {
        setDescription(originalDescription)
        return
      }

      if (currentDescription !== description) {
        try {
          const response = await changeDescription({
            description: currentDescription,
          })

          if (response.error) {
            setDescription(originalDescription)
            toast.error('Erro ao alterar a descrição. Tente novamente.')
            return
          }

          toast.success('Descrição alterado com sucesso!')
        } catch (error) {
          toast.error('Erro ao alterar a descrição. Tente novamente.')
          setDescription(originalDescription)
        }
      }
    }, 500),
  ).current

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setDescription(value)

    debouncedSaveName(value)
  }

  return (
    <textarea
      className="my-3 h-40 w-full max-w-2xl resize-none rounded-b-md border border-gray-100 bg-gray-50 p-2 text-center text-base outline-none"
      value={description}
      onChange={handleChange}
    />
  )
}
