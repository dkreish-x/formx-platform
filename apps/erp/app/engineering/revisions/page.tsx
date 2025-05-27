import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Revisions | Form(X) Manufacturing",
  description: "Design revision management",
}

export default function RevisionsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Revision Management</h1>
          <p className="text-muted-foreground">Track and manage design changes and revisions.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Change Requests</CardTitle>
            <CardDescription>Manage design change requests</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track and approve design change requests.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Revision History</CardTitle>
            <CardDescription>Track design versions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View and manage design revision history.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Approval Workflow</CardTitle>
            <CardDescription>Manage revision approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track the approval process for design changes.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
