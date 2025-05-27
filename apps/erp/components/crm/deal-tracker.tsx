"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, Calendar, TrendingUp, ChevronRight } from "lucide-react"
import Link from "next/link"

// Sample data for deals
const deals = [
  {
    id: "OPP-001",
    name: "Custom Machining Project",
    customer: "Acme Industries",
    value: 45000,
    stage: "Proposal",
    probability: 60,
    expectedCloseDate: "2023-06-15",
    lastActivity: "2023-05-10",
    owner: "Jane Doe",
    activities: 12,
    notes: 5,
    tasks: 3,
    meetings: 4,
  },
  {
    id: "OPP-002",
    name: "Production Line Automation",
    customer: "TechCorp",
    value: 120000,
    stage: "Negotiation",
    probability: 75,
    expectedCloseDate: "2023-07-20",
    lastActivity: "2023-05-12",
    owner: "John Smith",
    activities: 18,
    notes: 7,
    tasks: 5,
    meetings: 6,
  },
  {
    id: "OPP-003",
    name: "Prototype Development",
    customer: "Innovative Solutions",
    value: 28500,
    stage: "Discovery",
    probability: 30,
    expectedCloseDate: "2023-08-10",
    lastActivity: "2023-05-08",
    owner: "Jane Doe",
    activities: 6,
    notes: 2,
    tasks: 3,
    meetings: 1,
  },
  {
    id: "OPP-004",
    name: "Annual Maintenance Contract",
    customer: "Global Manufacturing",
    value: 65000,
    stage: "Closing",
    probability: 90,
    expectedCloseDate: "2023-05-30",
    lastActivity: "2023-05-11",
    owner: "Mike Wilson",
    activities: 15,
    notes: 4,
    tasks: 2,
    meetings: 9,
  },
  {
    id: "OPP-005",
    name: "Equipment Upgrade",
    customer: "Precision Engineering",
    value: 85000,
    stage: "Discovery",
    probability: 40,
    expectedCloseDate: "2023-09-15",
    lastActivity: "2023-05-09",
    owner: "Sarah Johnson",
    activities: 8,
    notes: 3,
    tasks: 4,
    meetings: 1,
  },
]

// Pipeline stages with their respective colors
const pipelineStages = [
  { id: "Discovery", color: "bg-blue-100 border-blue-300 text-blue-800" },
  { id: "Qualification", color: "bg-indigo-100 border-indigo-300 text-indigo-800" },
  { id: "Proposal", color: "bg-purple-100 border-purple-300 text-purple-800" },
  { id: "Negotiation", color: "bg-amber-100 border-amber-300 text-amber-800" },
  { id: "Closing", color: "bg-green-100 border-green-300 text-green-800" },
]

export function DealTracker() {
  const [view, setView] = useState<"all" | "my-deals">("all")

  // Calculate total pipeline value
  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0)

  // Calculate weighted pipeline value (based on probability)
  const weightedValue = deals.reduce((sum, deal) => sum + (deal.value * deal.probability) / 100, 0)

  // Group deals by stage
  const dealsByStage = deals.reduce(
    (acc, deal) => {
      acc[deal.stage] = acc[deal.stage] || []
      acc[deal.stage].push(deal)
      return acc
    },
    {} as Record<string, typeof deals>,
  )

  // Calculate stage values
  const stageValues = Object.entries(dealsByStage).reduce(
    (acc, [stage, stageDeals]) => {
      acc[stage] = stageDeals.reduce((sum, deal) => sum + deal.value, 0)
      return acc
    },
    {} as Record<string, number>,
  )

  const getStageColor = (stage: string) => {
    const stageInfo = pipelineStages.find((s) => s.id === stage)
    return stageInfo?.color || "bg-gray-100 border-gray-300 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Deal Pipeline</CardTitle>
            <Tabs value={view} onValueChange={(value) => setView(value as "all" | "my-deals")}>
              <TabsList>
                <TabsTrigger value="all">All Deals</TabsTrigger>
                <TabsTrigger value="my-deals">My Deals</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center p-4 border rounded-md">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Pipeline</div>
                <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center p-4 border rounded-md">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Weighted Pipeline</div>
                <div className="text-2xl font-bold">${Math.round(weightedValue).toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center p-4 border rounded-md">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Deals Closing This Month</div>
                <div className="text-2xl font-bold">3</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {Object.entries(dealsByStage).map(([stage, stageDeals]) => (
              <div key={stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={getStageColor(stage)}>{stage}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {stageDeals.length} {stageDeals.length === 1 ? "deal" : "deals"}
                    </span>
                  </div>
                  <div className="font-medium">${stageValues[stage].toLocaleString()}</div>
                </div>

                <Progress value={(stageValues[stage] / totalValue) * 100} className="h-2" />

                <div className="space-y-2 mt-3">
                  {stageDeals.map((deal) => (
                    <Link key={deal.id} href={`/opportunities/${deal.id}`}>
                      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/20 transition-colors">
                        <div className="flex-1">
                          <div className="font-medium">{deal.name}</div>
                          <div className="text-sm text-muted-foreground">{deal.customer}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${deal.value.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">{deal.probability}% probability</div>
                        </div>
                        <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
