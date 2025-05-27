import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Warehousing | Form(X) Manufacturing",
  description: "Warehouse management",
}

export default function WarehousingPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Warehousing</h1>
          <p className="text-muted-foreground">Manage warehouse operations and storage.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Warehouse Management</CardTitle>
            <CardDescription>Track and manage warehouse operations</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Warehouse management features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
