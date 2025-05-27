import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, Package, Truck } from "lucide-react"
import OrdersList from "@/components/orders/orders-list"
import OrdersFilters from "@/components/orders/orders-filters"
import OrdersStats from "@/components/orders/orders-stats"

export const metadata: Metadata = {
  title: "Orders | Form(X)",
  description: "View and manage your manufacturing orders",
}

// This would be replaced with a real data fetching function in a production app
async function getOrders() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    active: [
      {
        id: "ORD-2023-1234",
        name: "Aluminum Enclosure",
        date: "May 15, 2023",
        status: "In Production",
        total: 245.0,
        dueDate: "May 20, 2023",
        process: "CNC Machining",
        material: "Aluminum 6061",
        quantity: 5,
        trackingNumber: null,
      },
      {
        id: "ORD-2023-1235",
        name: "Steel Brackets",
        date: "May 16, 2023",
        status: "Pending",
        total: 320.0,
        dueDate: "May 25, 2023",
        process: "Laser Cutting",
        material: "Steel 1018",
        quantity: 10,
        trackingNumber: null,
      },
      {
        id: "ORD-2023-1236",
        name: "Plastic Housings",
        date: "May 17, 2023",
        status: "Shipped",
        total: 175.0,
        dueDate: "May 22, 2023",
        process: "3D Printing",
        material: "ABS",
        quantity: 15,
        trackingNumber: "1Z999AA10123456784",
      },
    ],
    completed: [
      {
        id: "ORD-2023-1230",
        name: "Copper Heat Sinks",
        date: "May 10, 2023",
        status: "Completed",
        total: 450.0,
        dueDate: "May 15, 2023",
        process: "CNC Machining",
        material: "Copper C110",
        quantity: 8,
        trackingNumber: "1Z999AA10123456780",
      },
      {
        id: "ORD-2023-1231",
        name: "Titanium Brackets",
        date: "May 11, 2023",
        status: "Completed",
        total: 520.0,
        dueDate: "May 16, 2023",
        process: "CNC Machining",
        material: "Titanium Grade 5",
        quantity: 4,
        trackingNumber: "1Z999AA10123456781",
      },
      {
        id: "ORD-2023-1232",
        name: "Acrylic Panels",
        date: "May 12, 2023",
        status: "Completed",
        total: 175.0,
        dueDate: "May 17, 2023",
        process: "Laser Cutting",
        material: "Acrylic",
        quantity: 12,
        trackingNumber: "1Z999AA10123456782",
      },
      {
        id: "ORD-2023-1233",
        name: "Brass Fittings",
        date: "May 13, 2023",
        status: "Completed",
        total: 320.0,
        dueDate: "May 18, 2023",
        process: "CNC Turning",
        material: "Brass C360",
        quantity: 20,
        trackingNumber: "1Z999AA10123456783",
      },
    ],
    cancelled: [
      {
        id: "ORD-2023-1228",
        name: "Stainless Steel Brackets",
        date: "May 8, 2023",
        status: "Cancelled",
        total: 290.0,
        dueDate: "May 13, 2023",
        process: "Laser Cutting",
        material: "Stainless Steel 304",
        quantity: 6,
        trackingNumber: null,
      },
      {
        id: "ORD-2023-1229",
        name: "Delrin Gears",
        date: "May 9, 2023",
        status: "Cancelled",
        total: 210.0,
        dueDate: "May 14, 2023",
        process: "CNC Machining",
        material: "Delrin",
        quantity: 10,
        trackingNumber: null,
      },
    ],
    stats: {
      total: 9,
      active: 3,
      completed: 4,
      cancelled: 2,
      totalSpent: 2505.0,
      averageOrderValue: 278.33,
      mostOrderedMaterial: "Aluminum 6061",
      mostUsedProcess: "CNC Machining",
    },
  }
}

export default async function OrdersPage() {
  const { active, completed, cancelled, stats } = await getOrders()

  return (
    <main className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="mb-1">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-brand-dark-grey">Orders</h1>
          </div>
          <p className="text-muted-foreground">View and manage your manufacturing orders</p>
        </div>
        <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey">
          <Package className="mr-2 h-4 w-4" />
          Create New Order
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <OrdersStats stats={stats} />
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Order Management</CardTitle>
          <CardDescription>View and manage all your manufacturing orders in one place</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="active" className="w-full">
            <div className="px-6 border-b">
              <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0 gap-6">
                <TabsTrigger
                  value="active"
                  className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground data-[state=active]:border-brand-dark-gold data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Active Orders ({active.length})
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground data-[state=active]:border-brand-dark-gold data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Completed Orders ({completed.length})
                </TabsTrigger>
                <TabsTrigger
                  value="cancelled"
                  className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground data-[state=active]:border-brand-dark-gold data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Cancelled Orders ({cancelled.length})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="active" className="p-0">
              <OrdersFilters />
              <OrdersList orders={active} />
            </TabsContent>
            <TabsContent value="completed" className="p-0">
              <OrdersFilters />
              <OrdersList orders={completed} />
            </TabsContent>
            <TabsContent value="cancelled" className="p-0">
              <OrdersFilters />
              <OrdersList orders={cancelled} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}
