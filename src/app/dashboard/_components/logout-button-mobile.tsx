'use client'

import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { logout } from '../_actions/logout'

export function LogoutButtonMobile() {
  return (
    <Button
      variant="ghost"
      className="cursor-pointer justify-start px-0 text-red-500 hover:bg-transparent hover:text-red-600"
      onClick={async () => {
        await logout()
      }}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sair
    </Button>
  )
}
