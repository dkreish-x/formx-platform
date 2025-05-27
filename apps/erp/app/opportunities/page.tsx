"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Plus, Filter, ArrowUpDown, MoreHorizontal, Eye, Briefcase } from "lucide-react"

export default function OpportunitiesPage() {
  // Mock data for opportunities
  const opportunities = [
    {
      id: "OPP-001",
      name: "Custom Machining Project",
      customer: "Acme Industries",
      value: "$45,000",
      stage: "Proposal",
      probability: "60%",
      expectedCloseDate: "2023-06-15",
      owner: "Jane Smith",
    },
    {
      id: "OPP-002",
      name: "Production Line Automation",
      customer: "TechCorp",
      value: "$120,000",
      stage: "Negotiation",
      probability: "75%",
      expectedCloseDate: "2023-07-10",
      owner: "John Davis",
    },
    {
      id: "OPP-003",
      name: "Prototype Development",
      customer: "Innovative Solutions",
      value: "$28,500",
      stage: "Discovery",
      probability: "40%",
      expectedCloseDate: "2023-08-22",
      owner: "Sarah Johnson",
    },
    {
      id: "OPP-004",
      name: "Maintenance Contract",
      customer: "Global Manufacturing",
      value: "$65,000",
      stage: "Closed Won",
      probability: "100%",
      expectedCloseDate: "2023-05-30",
      owner: "Michael Brown",
    },
    {
      id: "OPP-005",
      name: "Equipment Upgrade",
      customer: "Precision Engineering",
      value: "$85,000",
      stage: "Needs Analysis",
      probability: "30%",
      expectedCloseDate: "2023-09-15",
      owner: "Jane Smith",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
          <p className="text-muted-foreground">Manage your sales pipeline and track opportunities.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Opportunity
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing <strong>{opportunities.length}</strong> opportunities
        </div>
      </div>

      <div className="border rounded-md">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">Name</th>
              <th className="py-3 px-4 text-left font-medium">Customer</th>
              <th className="py-3 px-4 text-left font-medium">Value</th>
              <th className="py-3 px-4 text-left font-medium">Stage</th>
              <th className="py-3 px-4 text-left font-medium">Probability</th>
              <th className="py-3 px-4 text-left font-medium">Close Date</th>
              <th className="py-3 px-4 text-left font-medium">Owner</th>
              <th className="py-3 px-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map((opportunity) => (
              <tr
                key={opportunity.id}
                className="border-b hover:bg-primary/5 cursor-pointer"
                onClick={() => (window.location.href = `/opportunities/${opportunity.id}`)}
              >
                <td className="py-3 px-4">
                  <div className="font-medium">{opportunity.name}</div>
                  <div className="text-sm text-muted-foreground">{opportunity.id}</div>
                </td>
                <td className="py-3 px-4">{opportunity.customer}</td>
                <td className="py-3 px-4">{opportunity.value}</td>
                <td className="py-3 px-4">
                  <StatusBadge
                    status={
                      opportunity.stage === "Discovery"
                        ? "info"
                        : opportunity.stage === "Needs Analysis"
                          ? "warning"
                          : opportunity.stage === "Proposal"
                            ? "warning"
                            : opportunity.stage === "Negotiation"
                              ? "warning"
                              : opportunity.stage === "Closed Won"
                                ? "success"
                                : opportunity.stage === "Closed Lost"
                                  ? "error"
                                  : "default"
                    }
                  >
                    {opportunity.stage}
                  </StatusBadge>
                </td>
                <td className="py-3 px-4">{opportunity.probability}</td>
                <td className="py-3 px-4">{opportunity.expectedCloseDate}</td>
                <td className="py-3 px-4">{opportunity.owner}</td>
                <td className="py-3 px-4 text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `/opportunities/${opportunity.id}`
                    }}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$343,500</div>
            <p className="text-xs text-muted-foreground">5 active opportunities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proposal Stage</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,000</div>
            <p className="text-xs text-muted-foreground">1 opportunity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Negotiation Stage</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$120,000</div>
            <p className="text-xs text-muted-foreground">1 opportunity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
