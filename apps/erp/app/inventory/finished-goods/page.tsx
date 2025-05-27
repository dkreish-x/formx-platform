import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Finished Goods | Form(X) Manufacturing",
  description: "Finished goods inventory management",
}

export default function FinishedGoodsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finished Goods</h1>
          <p className="text-muted-foreground">Manage finished product inventory.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Finished Goods Inventory</CardTitle>
            <CardDescription>Track and manage finished products</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Finished goods inventory management features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
