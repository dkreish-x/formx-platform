import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Marketing | Form(X) Manufacturing",
  description: "Marketing campaigns and analytics",
}

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing</h1>
          <p className="text-muted-foreground">Manage your marketing campaigns and track performance.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Email Campaigns</CardTitle>
            <CardDescription>Manage your email marketing campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create and manage email campaigns to reach your customers.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Social Media</CardTitle>
            <CardDescription>Manage your social media presence</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Schedule and track social media posts across platforms.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Track marketing performance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Analyze the performance of your marketing campaigns.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
