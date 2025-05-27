import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Analytics | Form(X) Manufacturing",
  description: "Business analytics and reporting",
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Business intelligence and performance metrics.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Dashboards</CardTitle>
            <CardDescription>Performance dashboards</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View key performance indicators and metrics.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Reports</CardTitle>
            <CardDescription>Detailed business reports</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Generate and view detailed business reports.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>KPIs</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track and analyze key performance indicators.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Business Intelligence</CardTitle>
            <CardDescription>Advanced analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Perform advanced data analysis and visualization.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
