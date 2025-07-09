import { FeatureCard } from '@/components/FeatureCard'
import { Button } from '@/components/ui/button'
import { ArrowRight, HandCoins, Heart, Shield, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <div className="flex items-center text-xl font-bold text-amber-500">
            <HandCoins className="mr-2 h-6 w-6" />
            <span>ApoiaDev</span>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-6 text-center">
              <div className="mb-2 inline-block rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
                Plataforma para criadores de conteúdo
              </div>

              <h1 className="bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                Monetize seu público de forma descomplicada
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Receba doações diretamente dos seus seguidores através de uma
                página personalizada e elegante, sem complicações.
              </p>

              <div className="pt-4">
                <form>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 bg-amber-500 px-8 font-medium text-white hover:bg-amber-600"
                  >
                    Começar agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-amber-600" />}
              title="Rápido e simples"
              description="Configure sua página em minutos e comece a receber doações imediatamente."
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8 text-amber-600" />}
              title="Conexão direta"
              description="Crie uma conexão mais próxima com seus apoiadores através de mensagens personalizadas."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-amber-600" />}
              title="Pagamentos seguros"
              description="Transações protegidas e transferências automáticas para sua conta bancária."
            />
          </div>
        </div>
      </main>
    </div>
  )
}
