import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type StatCardProps = {
  title: string
  description: string
  value: string | number
  icon: React.ReactNode
  iconClassName?: string
}

export function StatCard({
  title,
  description,
  value,
  icon,
  iconClassName = '',
}: StatCardProps) {
  return (
    <Card className="border-0 bg-gradient-to-br from-zinc-900 to-zinc-800 text-white shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="text-gray-200">
            {description}
          </CardDescription>
        </div>

        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold tracking-tight select-none">{value}</p>
      </CardContent>
    </Card>
  )
}
