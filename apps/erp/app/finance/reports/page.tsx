import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Financial Reports | Form(X) Manufacturing",
  description: "Financial reporting",
}

export default function FinancialReportsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
          <p className="text-muted-foreground">Generate and view financial statements and reports.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Financial Reporting</CardTitle>
            <CardDescription>Generate and view financial reports</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This page is under development. Financial reporting features will be available soon.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
