"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { ClipboardCheck, Eye, Filter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for CAPA records
const capaRecords = [
  {
    id: "CAPA-2025-018",
    title: "Supplier Quality Issue - Fastener Defects",
    source: "Receiving Inspection",
    assignedTo: "J. Smith",
    dueDate: "May 20, 2025",
    status: "Open",
    statusType: "warning",
    priority: "High",
    priorityType: "error",
  },
  {
    id: "CAPA-2025-017",
    title: "Calibration Process Improvement",
    source: "Internal Audit",
    assignedTo: "M. Johnson",
    dueDate: "May 18, 2025",
    status: "In Progress",
    statusType: "info",
    priority: "Medium",
    priorityType: "warning",
  },
  {
    id: "CAPA-2025-016",
    title: "Documentation Control Procedure Update",
    source: "Management Review",
    assignedTo: "R. Davis",
    dueDate: "May 15, 2025",
    status: "In Progress",
    statusType: "info",
    priority: "Medium",
    priorityType: "warning",
  },
  {
    id: "CAPA-2025-015",
    title: "Training Program Enhancement",
    source: "Employee Feedback",
    assignedTo: "L. Wilson",
    dueDate: "May 12, 2025",
    status: "Open",
    statusType: "warning",
    priority: "Low",
    priorityType: "success",
  },
  {
    id: "CAPA-2025-014",
    title: "Machine Maintenance Schedule Revision",
    source: "Equipment Breakdown",
    assignedTo: "J. Smith",
    dueDate: "May 10, 2025",
    status: "Past Due",
    statusType: "error",
    priority: "High",
    priorityType: "error",
  },
  {
    id: "CAPA-2025-013",
    title: "Customer Complaint - Surface Finish",
    source: "Customer Feedback",
    assignedTo: "M. Johnson",
    dueDate: "May 8, 2025",
    status: "Closed",
    statusType: "success",
    priority: "High",
    priorityType: "error",
  },
  {
    id: "CAPA-2025-012",
    title: "Process Validation Improvement",
    source: "Internal Audit",
    assignedTo: "R. Davis",
    dueDate: "May 5, 2025",
    status: "Closed",
    statusType: "success",
    priority: "Medium",
    priorityType: "warning",
  },
]

export default function CapaPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Corrective & Preventive Actions</h1>
          <p className="text-muted-foreground">Manage and track CAPA records</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search CAPA records..." className="pl-8 w-full" />
          </div>
          <Button size="default" className="h-10">
            <Link href="/quality/capa/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              New CAPA
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
                  <th className="text-left font-medium p-4">Source</th>
                  <th className="text-left font-medium p-4">Assigned To</th>
                  <th className="text-left font-medium p-4">Due Date</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-left font-medium p-4">Priority</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {capaRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => (window.location.href = `/quality/capa/${record.id}`)}
                  >
                    <td className="p-4 font-medium">{record.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="h-4 w-4 text-blue-500" />
                        <span>{record.title}</span>
                      </div>
                    </td>
                    <td className="p-4">{record.source}</td>
                    <td className="p-4">{record.assignedTo}</td>
                    <td className="p-4">{record.dueDate}</td>
                    <td className="p-4">
                      <StatusBadge status={record.statusType as any}>{record.status}</StatusBadge>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={record.priorityType as any}>{record.priority}</StatusBadge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/quality/capa/${record.id}`
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
