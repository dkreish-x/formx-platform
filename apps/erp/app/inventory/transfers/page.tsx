import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Transfers | Form(X) Manufacturing",
  description: "Inventory transfer management",
}

export default function TransfersPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Transfers</h1>
          <p className="text-muted-foreground">Manage inventory movements between locations.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Transfer Management</CardTitle>
            <CardDescription>Track and manage inventory transfers</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Inventory transfer management features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
