import { Header } from './_components/header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl">{children}</main>
    </>
  )
}
