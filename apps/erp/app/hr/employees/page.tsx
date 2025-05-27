import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Employees | Form(X) Manufacturing",
  description: "Employee management",
}

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">Manage employee information and records.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Employee Management</CardTitle>
            <CardDescription>Track and manage employee information</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Employee management features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
