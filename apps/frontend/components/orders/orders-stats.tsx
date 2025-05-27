import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, DollarSign, Layers } from "lucide-react"

interface OrdersStatsProps {
  stats: {
    total: number
    active: number
    completed: number
    cancelled: number
    totalSpent: number
    averageOrderValue: number
    mostOrderedMaterial: string
    mostUsedProcess: string
  }
}

export default function OrdersStats({ stats }: OrdersStatsProps) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <CardDescription>All time orders</CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-brand-dark-gold/10 flex items-center justify-center text-brand-dark-gold">
            <Package className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {stats.active} active, {stats.completed} completed, {stats.cancelled} cancelled
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CardDescription>All time spending</CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-brand-dark-gold/10 flex items-center justify-center text-brand-dark-gold">
            <DollarSign className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">Avg. ${stats.averageOrderValue.toFixed(2)} per order</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-sm font-medium">Most Used</CardTitle>
            <CardDescription>Popular materials & processes</CardDescription>
          </div>
          <div className="h-10 w-10 rounded-full bg-brand-dark-gold/10 flex items-center justify-center text-brand-dark-gold">
            <Layers className="h-5 w-5" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-md font-medium">{stats.mostOrderedMaterial}</div>
          <p className="text-xs text-muted-foreground mt-1">Process: {stats.mostUsedProcess}</p>
        </CardContent>
      </Card>
    </>
  )
}
