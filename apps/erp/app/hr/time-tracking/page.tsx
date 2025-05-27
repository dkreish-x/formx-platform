import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Time Tracking | Form(X) Manufacturing",
  description: "Employee time tracking",
}

export default function TimeTrackingPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Time Tracking</h1>
          <p className="text-muted-foreground">Track employee attendance and work hours.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Time Tracking Management</CardTitle>
            <CardDescription>Track and manage employee time</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Time tracking features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
