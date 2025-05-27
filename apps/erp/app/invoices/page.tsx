import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Invoices | Form(X) Manufacturing",
  description: "Invoice management",
}

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">Manage customer invoices and payment tracking.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Invoice Management</CardTitle>
            <CardDescription>Track and manage customer invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Invoice management features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
