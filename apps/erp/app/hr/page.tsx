import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Human Resources | Form(X) Manufacturing",
  description: "Human resources management",
}

export default function HrPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Human Resources</h1>
          <p className="text-muted-foreground">Manage employees, training, and performance.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Employees</CardTitle>
            <CardDescription>Employee management</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage employee information and records.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Time Tracking</CardTitle>
            <CardDescription>Track employee time</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Monitor employee attendance and work hours.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Training</CardTitle>
            <CardDescription>Employee development</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage employee training and certification programs.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Performance</CardTitle>
            <CardDescription>Performance management</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track employee performance and conduct reviews.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
