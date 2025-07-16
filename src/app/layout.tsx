import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ApoiaDev',
  description: 'Plataforma para criadores de conteúdo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          {children}
          <Toaster
            duration={3000}
            toastOptions={{
              style: {
                fontFamily: 'var(--font-geist-sans)',
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  )
}
