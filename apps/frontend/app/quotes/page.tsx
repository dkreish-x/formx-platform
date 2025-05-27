import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Clock, Package, FileText, CheckCircle } from "lucide-react"
import QuotesList from "@/components/quotes/quotes-list"
import QuotesFilters from "@/components/quotes/quotes-filters"
import QuotesStats from "@/components/quotes/quotes-stats"

export const metadata: Metadata = {
  title: "Quotes | Form(X)",
  description: "View and manage your manufacturing quotes",
}

// This would be replaced with a real data fetching function in a production app
async function getQuotes() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    pending: [
      {
        id: "QT-2024-001",
        name: "Aluminum Bracket",
        date: "May 15, 2024",
        status: "Pending",
        total: 1250.0,
        validUntil: "June 15, 2024",
        process: "CNC Machining",
        material: "6061-T6 Aluminum",
        quantity: 50,
        leadTime: "7-10 days",
      },
      {
        id: "QT-2024-002",
        name: "Custom Housing",
        date: "May 12, 2024",
        status: "Under Review",
        total: 890.0,
        validUntil: "June 12, 2024",
        process: "3D Printing",
        material: "ABS Plastic",
        quantity: 25,
        leadTime: "5-7 days",
      },
    ],
    approved: [
      {
        id: "QT-2024-003",
        name: "Steel Plate",
        date: "May 10, 2024",
        status: "Approved",
        total: 2150.0,
        validUntil: "June 10, 2024",
        process: "Sheet Metal",
        material: "304 Stainless Steel",
        quantity: 100,
        leadTime: "10-14 days",
      },
      {
        id: "QT-2024-004",
        name: "Prototype Gear",
        date: "May 8, 2024",
        status: "Approved",
        total: 450.0,
        validUntil: "June 8, 2024",
        process: "CNC Machining",
        material: "Delrin",
        quantity: 10,
        leadTime: "3-5 days",
      },
    ],
    expired: [
      {
        id: "QT-2024-005",
        name: "Titanium Component",
        date: "April 20, 2024",
        status: "Expired",
        total: 3200.0,
        validUntil: "May 20, 2024",
        process: "CNC Machining",
        material: "Titanium Grade 5",
        quantity: 5,
        leadTime: "14-21 days",
      },
    ],
    stats: {
      total: 5,
      pending: 2,
      approved: 2,
      expired: 1,
      totalValue: 7940.0,
      averageQuoteValue: 1588.0,
      mostQuotedMaterial: "Aluminum 6061",
      mostUsedProcess: "CNC Machining",
    },
  }
}

export default async function QuotesPage() {
  const user = await getCurrentUser()

  // If not authenticated, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  // If user is a partner, redirect to partner portal
  if (user.type === "partner") {
    redirect("/channel-partner")
  }

  const { pending, approved, expired, stats } = await getQuotes()

  return (
    <main className="container py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild className="mb-1">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-brand-dark-grey">Quotes</h1>
          </div>
          <p className="text-muted-foreground">View and manage your manufacturing quotes</p>
        </div>
        <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey" asChild>
          <Link href="/quote">
            <FileText className="mr-2 h-4 w-4" />
            Get New Quote
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <QuotesStats stats={stats} />
      </div>

      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle>Quote Management</CardTitle>
          <CardDescription>View and manage all your manufacturing quotes in one place</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="pending" className="w-full">
            <div className="px-6 border-b">
              <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0 gap-6">
                <TabsTrigger
                  value="pending"
                  className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground data-[state=active]:border-brand-dark-gold data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Pending Quotes ({pending.length})
                </TabsTrigger>
                <TabsTrigger
                  value="approved"
                  className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground data-[state=active]:border-brand-dark-gold data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approved Quotes ({approved.length})
                </TabsTrigger>
                <TabsTrigger
                  value="expired"
                  className="rounded-none border-b-2 border-transparent px-0 pb-3 pt-2 font-medium text-muted-foreground data-[state=active]:border-brand-dark-gold data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Expired Quotes ({expired.length})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="pending" className="p-0">
              <QuotesFilters />
              <QuotesList quotes={pending} />
            </TabsContent>
            <TabsContent value="approved" className="p-0">
              <QuotesFilters />
              <QuotesList quotes={approved} />
            </TabsContent>
            <TabsContent value="expired" className="p-0">
              <QuotesFilters />
              <QuotesList quotes={expired} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}
