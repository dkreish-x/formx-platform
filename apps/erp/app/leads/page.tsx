"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PlusCircle, Search, Eye } from "lucide-react"

// Mock data for leads
const leads = [
  {
    id: "LEAD-001",
    company: "Innovative Solutions",
    contact: "Robert Johnson",
    email: "robert@innovativesolutions.com",
    phone: "(555) 987-6543",
    source: "Trade Show",
    status: "New",
    assignedTo: "Jane Doe",
    createdAt: "2023-05-10",
  },
  {
    id: "LEAD-002",
    company: "Tech Dynamics",
    contact: "Sarah Williams",
    email: "sarah@techdynamics.com",
    phone: "(555) 876-5432",
    source: "Website",
    status: "Contacted",
    assignedTo: "Mike Wilson",
    createdAt: "2023-05-08",
  },
  {
    id: "LEAD-003",
    company: "Global Manufacturing",
    contact: "David Lee",
    email: "david@globalmanufacturing.com",
    phone: "(555) 765-4321",
    source: "Referral",
    status: "Qualified",
    assignedTo: "Jane Doe",
    createdAt: "2023-05-05",
  },
  {
    id: "LEAD-004",
    company: "Precision Fabricators",
    contact: "Emily Chen",
    email: "emily@precisionfab.com",
    phone: "(555) 654-3210",
    source: "LinkedIn",
    status: "Proposal",
    assignedTo: "John Smith",
    createdAt: "2023-05-03",
  },
  {
    id: "LEAD-005",
    company: "Advanced Engineering",
    contact: "Michael Brown",
    email: "michael@advancedeng.com",
    phone: "(555) 543-2109",
    source: "Cold Call",
    status: "Negotiation",
    assignedTo: "Mike Wilson",
    createdAt: "2023-04-28",
  },
]

export default function LeadsPage() {
  const router = useRouter()

  const handleRowClick = (leadId: string) => {
    router.push(`/leads/${leadId}`)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
          <p className="text-muted-foreground">Manage your sales leads</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search leads..."
              className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Button size="default" variant="default" className="h-10">
            <Link href="/leads/new" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Lead
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium p-4">ID</th>
                  <th className="text-left font-medium p-4">Company</th>
                  <th className="text-left font-medium p-4">Contact</th>
                  <th className="text-left font-medium p-4">Source</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-left font-medium p-4">Assigned To</th>
                  <th className="text-left font-medium p-4">Created</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => handleRowClick(lead.id)}
                  >
                    <td className="p-4">{lead.id}</td>
                    <td className="p-4">
                      <div className="font-medium">{lead.company}</div>
                    </td>
                    <td className="p-4">
                      <div>{lead.contact}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                    </td>
                    <td className="p-4">{lead.source}</td>
                    <td className="p-4">
                      <StatusBadge
                        status={
                          lead.status === "New"
                            ? "info"
                            : lead.status === "Contacted"
                              ? "warning"
                              : lead.status === "Qualified"
                                ? "success"
                                : lead.status === "Proposal"
                                  ? "warning"
                                  : "info"
                        }
                      >
                        {lead.status}
                      </StatusBadge>
                    </td>
                    <td className="p-4">{lead.assignedTo}</td>
                    <td className="p-4">{lead.createdAt}</td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/leads/${lead.id}`)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
