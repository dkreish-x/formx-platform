import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Business Intelligence | Form(X) Manufacturing",
  description: "Advanced analytics and business intelligence",
}

export default function BusinessIntelligencePage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Intelligence</h1>
          <p className="text-muted-foreground">Advanced data analysis and visualization tools.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Data Warehouse</CardTitle>
            <CardDescription>Centralized data repository</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Access and manage your centralized data warehouse.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Data Visualization</CardTitle>
            <CardDescription>Interactive data visualizations</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create and view interactive data visualizations and charts.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Predictive Analytics</CardTitle>
            <CardDescription>Forecasting and prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Use machine learning models to forecast business trends.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Custom Reports</CardTitle>
            <CardDescription>Build custom reports</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create and schedule custom reports for your business needs.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
