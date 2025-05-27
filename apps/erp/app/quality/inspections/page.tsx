"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { Eye, Filter, Microscope, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for inspections
const inspections = [
  {
    id: "INSP-2025-089",
    type: "Receiving",
    partOrder: "PO-2025-042 / Aluminum Sheet",
    date: "May 11, 2025",
    inspector: "J. Smith",
    status: "Passed",
    statusType: "success",
  },
  {
    id: "INSP-2025-088",
    type: "In-Process",
    partOrder: "WO-2025-156 / Bracket Assembly",
    date: "May 10, 2025",
    inspector: "M. Johnson",
    status: "Conditional",
    statusType: "warning",
  },
  {
    id: "INSP-2025-087",
    type: "Final",
    partOrder: "WO-2025-142 / Control Panel",
    date: "May 9, 2025",
    inspector: "R. Davis",
    status: "Passed",
    statusType: "success",
  },
  {
    id: "INSP-2025-086",
    type: "FAI",
    partOrder: "P/N: A-5678-01 / Mounting Plate",
    date: "May 8, 2025",
    inspector: "J. Smith",
    status: "Failed",
    statusType: "error",
  },
  {
    id: "INSP-2025-085",
    type: "Receiving",
    partOrder: "PO-2025-038 / Fasteners",
    date: "May 7, 2025",
    inspector: "M. Johnson",
    status: "Passed",
    statusType: "success",
  },
  {
    id: "INSP-2025-084",
    type: "In-Process",
    partOrder: "WO-2025-135 / Enclosure",
    date: "May 6, 2025",
    inspector: "R. Davis",
    status: "Conditional",
    statusType: "warning",
  },
  {
    id: "INSP-2025-083",
    type: "Final",
    partOrder: "WO-2025-128 / Power Supply",
    date: "May 5, 2025",
    inspector: "J. Smith",
    status: "Passed",
    statusType: "success",
  },
]

export default function InspectionsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quality Inspections</h1>
          <p className="text-muted-foreground">Manage and track quality inspection activities</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search inspections..." className="pl-8 w-full" />
          </div>
          <Button size="default" className="h-10">
            <Link href="/quality/inspections/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              New Inspection
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
                  <th className="text-left font-medium p-4">Type</th>
                  <th className="text-left font-medium p-4">Part/Order</th>
                  <th className="text-left font-medium p-4">Date</th>
                  <th className="text-left font-medium p-4">Inspector</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inspections.map((inspection) => (
                  <tr
                    key={inspection.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => (window.location.href = `/quality/inspections/${inspection.id}`)}
                  >
                    <td className="p-4 font-medium">{inspection.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Microscope className="h-4 w-4 text-indigo-500" />
                        <span>{inspection.type}</span>
                      </div>
                    </td>
                    <td className="p-4">{inspection.partOrder}</td>
                    <td className="p-4">{inspection.date}</td>
                    <td className="p-4">{inspection.inspector}</td>
                    <td className="p-4">
                      <StatusBadge status={inspection.statusType as any}>{inspection.status}</StatusBadge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/quality/inspections/${inspection.id}`
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
