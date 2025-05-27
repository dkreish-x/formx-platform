import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contracts | Form(X) Manufacturing",
  description: "Contract management",
}

export default function ContractsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contracts</h1>
          <p className="text-muted-foreground">Manage customer contracts and agreements.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Contract Management</CardTitle>
            <CardDescription>Track and manage customer contracts</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Contract management features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
