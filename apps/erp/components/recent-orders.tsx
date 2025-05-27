"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentOrders() {
  // This would be fetched from an API in a real implementation
  const orders = [
    {
      id: "ORD-001",
      customer: {
        name: "Acme Corp",
        avatar: "/letter-a-abstract.png",
      },
      status: "In Progress",
      date: "2023-04-15",
      amount: "$1,250.00",
    },
    {
      id: "ORD-002",
      customer: {
        name: "TechGiant Inc",
        avatar: "/letter-t-typography.png",
      },
      status: "Completed",
      date: "2023-04-14",
      amount: "$3,450.00",
    },
    {
      id: "ORD-003",
      customer: {
        name: "Quantum Systems",
        avatar: "/abstract-geometric-sculpture.png",
      },
      status: "Pending",
      date: "2023-04-13",
      amount: "$2,100.00",
    },
    {
      id: "ORD-004",
      customer: {
        name: "Stellar Manufacturing",
        avatar: "/abstract-letter-s.png",
      },
      status: "Completed",
      date: "2023-04-12",
      amount: "$5,780.00",
    },
  ]

  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={order.customer.avatar || "/placeholder.svg"} alt={order.customer.name} />
                  <AvatarFallback>{order.customer.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{order.customer.name}</p>
                  <p className="text-xs text-muted-foreground">{order.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    order.status === "Completed" ? "success" : order.status === "In Progress" ? "default" : "outline"
                  }
                  className="text-xs"
                >
                  {order.status}
                </Badge>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.amount}</p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
