import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Sales | Form(X) Manufacturing",
  description: "Sales management and tracking",
}

export default function SalesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Management</h1>
          <p className="text-muted-foreground">Track sales performance and manage your sales pipeline.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Manage customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View and manage all customer orders in one place.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Track invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage invoices and track payment status.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Contracts</CardTitle>
            <CardDescription>Manage customer contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create and manage customer contracts and agreements.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription>Track sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Analyze sales data and track performance metrics.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
