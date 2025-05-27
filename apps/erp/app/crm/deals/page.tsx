import type { Metadata } from "next"
import { ArrowRight, ChevronRight, DollarSign, LineChart, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Deals | CRM",
  description: "Track and manage sales deals and opportunities",
}

export default function DealsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deals</h1>
          <p className="text-muted-foreground">Track and manage your sales pipeline and opportunities</p>
        </div>
        <Button>
          <DollarSign className="mr-2 h-4 w-4" />
          New Deal
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,824,568</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deals Closing This Month</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">$342,500 potential revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+5% from last quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Deal Size</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$78,350</div>
            <p className="text-xs text-muted-foreground">+12.3% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pipeline" className="w-full">
        <TabsList>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="active">Active Deals</TabsTrigger>
          <TabsTrigger value="won">Won</TabsTrigger>
          <TabsTrigger value="lost">Lost</TabsTrigger>
        </TabsList>
        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <PipelineStage title="Qualification" count={8} value={245000} deals={qualificationDeals} />
            <PipelineStage title="Proposal" count={5} value={378500} deals={proposalDeals} />
            <PipelineStage title="Negotiation" count={3} value={186000} deals={negotiationDeals} />
            <PipelineStage title="Closing" count={2} value={125000} deals={closingDeals} />
          </div>
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid gap-4 p-4">
              {activeDeals.map((deal, index) => (
                <DealRow key={index} deal={deal} />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="won" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid gap-4 p-4">
              {wonDeals.map((deal, index) => (
                <DealRow key={index} deal={deal} />
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="lost" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid gap-4 p-4">
              {lostDeals.map((deal, index) => (
                <DealRow key={index} deal={deal} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PipelineStageProps {
  title: string
  count: number
  value: number
  deals: Deal[]
}

function PipelineStage({ title, count, value, deals }: PipelineStageProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        <Badge variant="outline">{count}</Badge>
      </div>
      <div className="mb-4 text-sm font-medium">${value.toLocaleString()}</div>
      <div className="space-y-3">
        {deals.map((deal, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-sm">{deal.name}</CardTitle>
              <CardDescription className="text-xs">{deal.company}</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">${deal.value.toLocaleString()}</span>
                <Badge variant={deal.probability >= 70 ? "default" : "outline"}>{deal.probability}%</Badge>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Closing: {deal.closeDate}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <ChevronRight className="h-3 w-3" />
                  <span className="sr-only">View deal</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface Deal {
  name: string
  company: string
  value: number
  probability: number
  closeDate: string
  stage: string
  owner: string
}

function DealRow({ deal }: { deal: Deal }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border p-3 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">{deal.name}</h3>
          <Badge variant="outline">{deal.stage}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{deal.company}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 md:flex-nowrap">
        <div className="min-w-[100px]">
          <p className="text-sm font-medium">${deal.value.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{deal.probability}% probability</span>
          </div>
        </div>
        <div className="min-w-[100px]">
          <p className="text-sm">{deal.closeDate}</p>
          <p className="text-xs text-muted-foreground">Expected close</p>
        </div>
        <div className="min-w-[100px]">
          <p className="text-sm">{deal.owner}</p>
          <p className="text-xs text-muted-foreground">Owner</p>
        </div>
        <Button variant="ghost" size="sm" className="ml-auto">
          <ArrowRight className="mr-2 h-4 w-4" />
          View
        </Button>
      </div>
    </div>
  )
}

// Sample data
const qualificationDeals: Deal[] = [
  {
    name: "Manufacturing Software",
    company: "Acme Corp",
    value: 75000,
    probability: 30,
    closeDate: "Jul 15, 2025",
    stage: "Qualification",
    owner: "John Smith",
  },
  {
    name: "Inventory System",
    company: "TechSolutions",
    value: 45000,
    probability: 40,
    closeDate: "Jun 30, 2025",
    stage: "Qualification",
    owner: "Sarah Johnson",
  },
  {
    name: "Quality Control Module",
    company: "NewCo",
    value: 35000,
    probability: 25,
    closeDate: "Aug 10, 2025",
    stage: "Qualification",
    owner: "Mike Williams",
  },
]

const proposalDeals: Deal[] = [
  {
    name: "Enterprise Agreement",
    company: "MegaCorp",
    value: 150000,
    probability: 60,
    closeDate: "Jun 15, 2025",
    stage: "Proposal",
    owner: "Lisa Chen",
  },
  {
    name: "Custom Implementation",
    company: "StartupX",
    value: 85000,
    probability: 50,
    closeDate: "Jul 1, 2025",
    stage: "Proposal",
    owner: "David Lee",
  },
]

const negotiationDeals: Deal[] = [
  {
    name: "Maintenance Contract",
    company: "GlobalTech",
    value: 95000,
    probability: 75,
    closeDate: "May 30, 2025",
    stage: "Negotiation",
    owner: "Emma Wilson",
  },
  {
    name: "Software Upgrade",
    company: "IndustryCo",
    value: 65000,
    probability: 80,
    closeDate: "Jun 5, 2025",
    stage: "Negotiation",
    owner: "Robert Taylor",
  },
]

const closingDeals: Deal[] = [
  {
    name: "Full ERP System",
    company: "ManufacturingPro",
    value: 85000,
    probability: 90,
    closeDate: "May 20, 2025",
    stage: "Closing",
    owner: "John Smith",
  },
  {
    name: "Annual Support",
    company: "TechGiant",
    value: 40000,
    probability: 95,
    closeDate: "May 25, 2025",
    stage: "Closing",
    owner: "Sarah Johnson",
  },
]

const activeDeals: Deal[] = [...qualificationDeals, ...proposalDeals, ...negotiationDeals, ...closingDeals]

const wonDeals: Deal[] = [
  {
    name: "Production Planning",
    company: "ManufacturingX",
    value: 120000,
    probability: 100,
    closeDate: "Apr 15, 2025",
    stage: "Won",
    owner: "John Smith",
  },
  {
    name: "Quality Module",
    company: "PrecisionCo",
    value: 45000,
    probability: 100,
    closeDate: "Apr 28, 2025",
    stage: "Won",
    owner: "Lisa Chen",
  },
]

const lostDeals: Deal[] = [
  {
    name: "Inventory System",
    company: "CompetitorA",
    value: 65000,
    probability: 0,
    closeDate: "Apr 10, 2025",
    stage: "Lost",
    owner: "Mike Williams",
  },
  {
    name: "Maintenance Contract",
    company: "IndustryB",
    value: 35000,
    probability: 0,
    closeDate: "Mar 30, 2025",
    stage: "Lost",
    owner: "Emma Wilson",
  },
]
