'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { logout } from '../_actions/logout'

export function LogoutButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-red-500 hover:bg-red-50 hover:text-red-600"
      onClick={async () => {
        await logout()
      }}
    >
      <LogOut className="h-5 w-5" />
      <span className="sr-only">Sair</span>
    </Button>
  )
}
