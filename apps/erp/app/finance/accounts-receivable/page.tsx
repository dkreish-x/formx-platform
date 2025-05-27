import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Accounts Receivable | Form(X) Manufacturing",
  description: "Accounts receivable management",
}

export default function AccountsReceivablePage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Accounts Receivable</h1>
          <p className="text-muted-foreground">Manage customer payments and accounts receivable.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Accounts Receivable Management</CardTitle>
            <CardDescription>Track and manage customer payments</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Accounts receivable management features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
