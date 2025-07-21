'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

export default function CreateAccountButton() {
  const [loading, setLoading] = useState(false)

  async function handleCreateStripeAccount() {
    setLoading(true)

    try {
      const response = await fetch('/api/stripe/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error('Erro ao criar conta de pagamento')
        setLoading(false)
        return
      }

      window.location.href = data.url
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-5">
      <Button
        className="cursor-pointer"
        onClick={handleCreateStripeAccount}
        disabled={loading}
      >
        {loading ? 'Carregando...' : 'Ativar conta de pagamento'}
      </Button>
    </div>
  )
}
