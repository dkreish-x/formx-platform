import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "HR Training | Form(X) Manufacturing",
  description: "Employee training management",
}

export default function HrTrainingPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Training</h1>
          <p className="text-muted-foreground">Manage employee training and development programs.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Training Management</CardTitle>
            <CardDescription>Track and manage employee training</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Employee training management features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
