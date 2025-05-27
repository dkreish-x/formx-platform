import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "General Ledger | Form(X) Manufacturing",
  description: "General ledger management",
}

export default function GeneralLedgerPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">General Ledger</h1>
          <p className="text-muted-foreground">Manage your accounting records and general ledger.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>General Ledger Management</CardTitle>
            <CardDescription>Track and manage accounting records</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. General ledger management features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
