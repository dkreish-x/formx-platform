"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Package, AlertTriangle, Clock, DollarSign } from "lucide-react"

export function DashboardStats() {
  // In a real implementation, these would be fetched from the API
  const stats = [
    {
      title: "Open Orders",
      value: "24",
      change: "+2 from last week",
      icon: Package,
      trend: "up",
    },
    {
      title: "Quality Issues",
      value: "3",
      change: "-1 from last week",
      icon: AlertTriangle,
      trend: "down",
    },
    {
      title: "On-Time Delivery",
      value: "94%",
      change: "+2% from last month",
      icon: Clock,
      trend: "up",
    },
    {
      title: "Revenue MTD",
      value: "$128,430",
      change: "+12% from last month",
      icon: DollarSign,
      trend: "up",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden border card-hover animate-fade-in">
          <CardContent className="p-0">
            <div className="flex">
              <div className="flex-1 p-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className={`text-xs ${stat.trend === "up" ? "text-success" : "text-destructive"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center bg-primary/10 p-4">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
