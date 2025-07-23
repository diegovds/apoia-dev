'use client'

import { Button } from '@/components/ui/button'
import { DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { LogoutButtonMobile } from './logout-button-mobile'

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px] p-5 sm:w-[300px]">
        <DialogTitle>Menu</DialogTitle>

        <div className="flex flex-col gap-6 py-6">
          <Link
            href="/dashboard"
            className="hover:text-primary text-sm font-medium transition-colors"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/me"
            className="hover:text-primary text-sm font-medium transition-colors"
            onClick={() => setOpen(false)}
          >
            Meu perfil
          </Link>

          <LogoutButtonMobile />
        </div>
      </SheetContent>
    </Sheet>
  )
}
