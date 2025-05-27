"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Plus, Search, Filter, ArrowUpDown, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for orders
const orders = [
  {
    id: "ORD-2023-042",
    customer: "Acme Manufacturing",
    date: "2023-04-15",
    status: "Completed",
    total: "$12,450.00",
    items: 8,
  },
  {
    id: "ORD-2023-041",
    customer: "TechPro Industries",
    date: "2023-04-14",
    status: "Shipped",
    total: "$8,975.00",
    items: 5,
  },
  {
    id: "ORD-2023-040",
    customer: "Global Dynamics",
    date: "2023-04-12",
    status: "Processing",
    total: "$15,320.00",
    items: 12,
  },
  {
    id: "ORD-2023-039",
    customer: "Precision Engineering",
    date: "2023-04-10",
    status: "Completed",
    total: "$9,840.00",
    items: 7,
  },
  {
    id: "ORD-2023-038",
    customer: "Acme Manufacturing",
    date: "2023-04-08",
    status: "Completed",
    total: "$6,750.00",
    items: 4,
  },
  {
    id: "ORD-2023-037",
    customer: "TechPro Industries",
    date: "2023-04-05",
    status: "Cancelled",
    total: "$3,200.00",
    items: 2,
  },
  {
    id: "ORD-2023-036",
    customer: "Global Dynamics",
    date: "2023-04-03",
    status: "Completed",
    total: "$11,450.00",
    items: 9,
  },
  {
    id: "ORD-2023-035",
    customer: "Precision Engineering",
    date: "2023-04-01",
    status: "Completed",
    total: "$7,890.00",
    items: 6,
  },
]

export default function OrdersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <Button size="default" className="h-10">
          <Link href="/orders/new" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search orders..." className="pl-8 w-full" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full sm:w-auto grid grid-cols-4 sm:inline-flex h-auto">
          <TabsTrigger value="all" className="py-2">
            All Orders
          </TabsTrigger>
          <TabsTrigger value="processing" className="py-2">
            Processing
          </TabsTrigger>
          <TabsTrigger value="shipped" className="py-2">
            Shipped
          </TabsTrigger>
          <TabsTrigger value="completed" className="py-2">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card className="border shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left font-medium p-4">Order ID</th>
                      <th className="text-left font-medium p-4">Customer</th>
                      <th className="text-left font-medium p-4">Date</th>
                      <th className="text-left font-medium p-4">Status</th>
                      <th className="text-left font-medium p-4">Items</th>
                      <th className="text-left font-medium p-4">Total</th>
                      <th className="text-right font-medium p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                        onClick={() => (window.location.href = `/orders/${order.id}`)}
                      >
                        <td className="p-4 font-medium">{order.id}</td>
                        <td className="p-4">{order.customer}</td>
                        <td className="p-4">{order.date}</td>
                        <td className="p-4">
                          <StatusBadge
                            status={
                              order.status === "Completed"
                                ? "success"
                                : order.status === "Cancelled"
                                  ? "error"
                                  : "warning"
                            }
                          >
                            {order.status}
                          </StatusBadge>
                        </td>
                        <td className="p-4">{order.items}</td>
                        <td className="p-4 font-medium">{order.total}</td>
                        <td className="p-4 text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Additional actions
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="mt-4">
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <p>Processing orders will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipped" className="mt-4">
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <p>Shipped orders will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="mt-4">
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <p>Completed orders will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
