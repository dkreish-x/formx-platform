import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Package, Clock } from "lucide-react"
import DashboardStats from "@/components/dashboard/dashboard-stats"
import ActiveRFQs from "@/components/dashboard/active-rfqs"
import ActiveQuotes from "@/components/dashboard/active-quotes"
import OrderHistory from "@/components/dashboard/order-history"

export const metadata: Metadata = {
  title: "Dashboard | Form(X)",
  description: "Manufacturing quote and order management dashboard",
}

// This would be replaced with a real data fetching function in a production app
async function getDashboardData() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    stats: {
      activeRfqs: 8,
      pendingQuotes: 12,
      activeOrders: 5,
      completedOrders: 23,
      rfqsThisMonth: 3,
      quotesThisMonth: 7,
      ordersThisMonth: 2,
      completedThisMonth: 8,
    },
    rfqs: [
      {
        id: "RFQ-2024-001",
        name: "Aluminum Housing",
        date: "May 15, 2024",
        parts: 3,
        status: "Draft",
      },
      {
        id: "RFQ-2024-002",
        name: "Steel Brackets",
        date: "May 14, 2024",
        parts: 5,
        status: "Submitted",
      },
      {
        id: "RFQ-2024-003",
        name: "Plastic Components",
        date: "May 13, 2024",
        parts: 2,
        status: "In Review",
      },
    ],
    quotes: [
      {
        id: "QT-2024-001",
        name: "Aluminum Bracket",
        date: "May 12, 2024",
        total: 1250.0,
        status: "Approved",
      },
      {
        id: "QT-2024-002",
        name: "Custom Housing",
        date: "May 10, 2024",
        total: 890.0,
        status: "In Production",
      },
    ],
    orders: [
      {
        id: "ORD-2024-001",
        name: "Steel Components",
        date: "May 8, 2024",
        total: 2150.0,
        status: "Completed",
      },
      {
        id: "ORD-2024-002",
        name: "Titanium Parts",
        date: "May 5, 2024",
        total: 3200.0,
        status: "Completed",
      },
    ],
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser()

  // If not authenticated, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  // If user is a partner, redirect to partner portal
  if (user.type === "partner") {
    redirect("/channel-partner")
  }

  const { stats, rfqs, quotes, orders } = await getDashboardData()

  return (
    <main className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-dark-grey mb-2">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your manufacturing projects</p>
      </div>

      <div className="mb-8">
        <DashboardStats data={stats} />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest RFQs, quotes, and orders</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="rfqs" className="w-full">
            <div className="px-6 border-b">
              <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0 gap-6">
                <TabsTrigger
                  value="rfqs"
                  className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground data-[state=active]:border-brand-dark-gold data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Active RFQs ({rfqs.length})
                </TabsTrigger>
                <TabsTrigger
                  value="quotes"
                  className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground data-[state=active]:border-brand-dark-gold data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Active Quotes ({quotes.length})
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground data-[state=active]:border-brand-dark-gold data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Recent Orders ({orders.length})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="rfqs" className="p-0">
              <ActiveRFQs rfqs={rfqs} />
            </TabsContent>
            <TabsContent value="quotes" className="p-0">
              <ActiveQuotes quotes={quotes} />
            </TabsContent>
            <TabsContent value="orders" className="p-0">
              <OrderHistory orders={orders} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}
