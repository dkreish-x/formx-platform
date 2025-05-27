import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, ShoppingCart, Clock, Package } from "lucide-react"
import type { DashboardStats as DashboardStatsType } from "@/types/dashboard"

interface DashboardStatsProps {
  data: DashboardStatsType
}

export default function DashboardStats({ data }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Active RFQs"
        value={data.activeRfqs}
        change={data.rfqsThisMonth}
        icon={<FileText className="h-5 w-5" />}
      />

      <StatsCard
        title="Pending Quotes"
        value={data.pendingQuotes}
        change={data.quotesThisMonth}
        icon={<Clock className="h-5 w-5" />}
      />

      <StatsCard
        title="Active Orders"
        value={data.activeOrders}
        change={data.ordersThisMonth}
        icon={<ShoppingCart className="h-5 w-5" />}
      />

      <StatsCard
        title="Completed Orders"
        value={data.completedOrders}
        change={data.completedThisMonth}
        icon={<Package className="h-5 w-5" />}
      />
    </div>
  )
}

interface StatsCardProps {
  title: string
  value: number
  change: number
  icon: React.ReactNode
}

function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-md">
      <div className="h-2 bg-gradient-to-r from-brand-dark-gold to-brand-dark-gold/30" />
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {change > 0 ? (
                <span className="text-green-600 font-medium">+{change} this month</span>
              ) : (
                "No new items this month"
              )}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-brand-dark-gold/10 flex items-center justify-center text-brand-dark-gold">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
