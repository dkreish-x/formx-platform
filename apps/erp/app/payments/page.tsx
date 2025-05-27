import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Payments | Form(X) Manufacturing",
  description: "Payment management",
}

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Track and manage customer payments.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Payment Management</CardTitle>
            <CardDescription>Track and manage customer payments</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Payment management features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
