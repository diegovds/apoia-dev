import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AboutSectionProps {
  name: string
  description: string
}

export default function AboutSection({ description, name }: AboutSectionProps) {
  return (
    <Card className="border-0 bg-white/90 shadow-xl backdrop-blur-sm duration-300 hover:bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
          <div className="h-6 w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-600" />
          Sobre {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          <p className="text-sm text-gray-600 sm:text-base lg:text-lg">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
