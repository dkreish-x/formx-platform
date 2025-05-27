import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Add a Channel Partner card to the dashboard grid */}
      {/* This should be placed in an appropriate location in your dashboard layout */}

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-brand-dark-gold/5 to-transparent">
          <CardTitle>Channel Partner Portal</CardTitle>
          <CardDescription>Submit referrals and track your commissions</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4">
            Access your Channel Partner Portal to submit new referrals and track your commission earnings.
          </p>
          <Button asChild>
            <Link href="/channel-partner">Access Portal</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
