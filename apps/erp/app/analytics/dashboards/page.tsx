import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Dashboards | Form(X) Manufacturing",
  description: "Performance dashboards and metrics",
}

export default function DashboardsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Dashboards</h1>
          <p className="text-muted-foreground">View key performance indicators and metrics.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Sales Dashboard</CardTitle>
            <CardDescription>Sales performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track sales performance, revenue, and growth metrics.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Production Dashboard</CardTitle>
            <CardDescription>Manufacturing metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Monitor production efficiency, output, and quality metrics.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Financial Dashboard</CardTitle>
            <CardDescription>Financial performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track financial performance, cash flow, and profitability.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Inventory Dashboard</CardTitle>
            <CardDescription>Inventory metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Monitor inventory levels, turnover, and stock status.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
