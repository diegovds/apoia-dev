import { Button } from '@/components/ui/button'
import { HandCoins, LogOut } from 'lucide-react'
import Link from 'next/link'
import { MobileMenu } from './menu-mobile'

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-amber-500"
          >
            <HandCoins className="mr-2 h-6 w-6" />
            <span className="text-xl font-bold">ApoiaDev</span>
          </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/dashboard"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/me"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Meu perfil
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sair</span>
          </Button>
        </nav>

        <MobileMenu />
      </div>
    </header>
  )
}
