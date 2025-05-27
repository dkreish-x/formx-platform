import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "KPIs | Form(X) Manufacturing",
  description: "Key Performance Indicators",
}

export default function KpisPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Key Performance Indicators</h1>
          <p className="text-muted-foreground">Track and analyze key performance indicators.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Sales KPIs</CardTitle>
            <CardDescription>Sales performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track sales growth, conversion rates, and customer acquisition costs.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Production KPIs</CardTitle>
            <CardDescription>Manufacturing metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Monitor OEE, cycle time, and production efficiency metrics.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Quality KPIs</CardTitle>
            <CardDescription>Quality metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track defect rates, first-pass yield, and customer complaints.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Financial KPIs</CardTitle>
            <CardDescription>Financial metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Monitor gross margin, operating expenses, and cash flow metrics.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Inventory KPIs</CardTitle>
            <CardDescription>Inventory metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track inventory turnover, carrying costs, and stock accuracy.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Customer KPIs</CardTitle>
            <CardDescription>Customer metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Monitor customer satisfaction, retention, and lifetime value.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
