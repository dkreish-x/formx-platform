import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Performance Management | Form(X) Manufacturing",
  description: "Employee performance management",
}

export default function PerformancePage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Management</h1>
          <p className="text-muted-foreground">Track employee performance and conduct reviews.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Performance Management</CardTitle>
            <CardDescription>Track and manage employee performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Performance management features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
