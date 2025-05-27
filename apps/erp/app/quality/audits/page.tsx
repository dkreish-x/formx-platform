"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { ClipboardCheck, Eye, Filter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for audits
const audits = [
  {
    id: "AUDIT-2025-012",
    title: "ISO 9001 Internal Audit - Production",
    type: "Internal",
    auditor: "J. Smith",
    scheduledDate: "May 15, 2025",
    status: "Scheduled",
    statusType: "info",
  },
  {
    id: "AUDIT-2025-011",
    title: "Customer Audit - Acme Corp",
    type: "Customer",
    auditor: "External - T. Johnson",
    scheduledDate: "May 22, 2025",
    status: "Scheduled",
    statusType: "info",
  },
  {
    id: "AUDIT-2025-010",
    title: "AS9100 Surveillance Audit",
    type: "Certification",
    auditor: "External - Certification Body",
    scheduledDate: "June 10, 2025",
    status: "Planned",
    statusType: "warning",
  },
  {
    id: "AUDIT-2025-009",
    title: "ITAR Compliance Audit",
    type: "Regulatory",
    auditor: "L. Wilson",
    scheduledDate: "July 5, 2025",
    status: "Planned",
    statusType: "warning",
  },
  {
    id: "AUDIT-2025-008",
    title: "ISO 9001 Internal Audit - Purchasing",
    type: "Internal",
    auditor: "M. Johnson",
    scheduledDate: "April 18, 2025",
    status: "Completed",
    statusType: "success",
  },
  {
    id: "AUDIT-2025-007",
    title: "Supplier Audit - XYZ Materials",
    type: "Supplier",
    auditor: "R. Davis",
    scheduledDate: "April 10, 2025",
    status: "Completed",
    statusType: "success",
  },
  {
    id: "AUDIT-2025-006",
    title: "ISO 9001 Internal Audit - Quality",
    type: "Internal",
    auditor: "J. Smith",
    scheduledDate: "March 25, 2025",
    status: "Completed",
    statusType: "success",
  },
]

export default function AuditsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quality Audits</h1>
          <p className="text-muted-foreground">Manage internal and external quality audits</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search audits..." className="pl-8 w-full" />
          </div>
          <Button size="default" className="h-10">
            <Link href="/quality/audits/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Schedule Audit
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
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
                  <th className="text-left font-medium p-4">Title</th>
                  <th className="text-left font-medium p-4">Type</th>
                  <th className="text-left font-medium p-4">Auditor</th>
                  <th className="text-left font-medium p-4">Scheduled Date</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {audits.map((audit) => (
                  <tr
                    key={audit.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => (window.location.href = `/quality/audits/${audit.id}`)}
                  >
                    <td className="p-4 font-medium">{audit.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4 text-violet-500" />
                        <span>{audit.title}</span>
                      </div>
                    </td>
                    <td className="p-4">{audit.type}</td>
                    <td className="p-4">{audit.auditor}</td>
                    <td className="p-4">{audit.scheduledDate}</td>
                    <td className="p-4">
                      <StatusBadge status={audit.statusType as any}>{audit.status}</StatusBadge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/quality/audits/${audit.id}`
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
