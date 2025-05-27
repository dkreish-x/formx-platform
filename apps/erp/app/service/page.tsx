import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Service | Form(X) Manufacturing",
  description: "Customer service and support",
}

export default function ServicePage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Service</h1>
          <p className="text-muted-foreground">Manage customer service requests and support tickets.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>Manage customer support tickets</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track and resolve customer support tickets efficiently.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Knowledge Base</CardTitle>
            <CardDescription>Customer self-service resources</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage your knowledge base articles and FAQs.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Customer Feedback</CardTitle>
            <CardDescription>Track customer satisfaction</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Collect and analyze customer feedback and satisfaction metrics.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
