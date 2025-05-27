"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { Plus, Search, Eye, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for non-conformance reports
const nonConformanceReports = [
  {
    id: "NCR-2023-042",
    partNumber: "PA-1042",
    partName: "Bracket Assembly",
    customer: "Acme Industries",
    orderNumber: "ORD-2023-1042",
    reportedBy: "John Smith",
    reportDate: "2023-05-10",
    status: "Open",
    severity: "Major",
    description: "Dimensions out of tolerance on mounting holes",
  },
  {
    id: "NCR-2023-041",
    partNumber: "PA-2310",
    partName: "Mounting Plate",
    customer: "TechCorp Solutions",
    orderNumber: "ORD-2023-1041",
    reportedBy: "Sarah Johnson",
    reportDate: "2023-05-08",
    status: "In Review",
    severity: "Minor",
    description: "Surface finish does not meet specification",
  },
  {
    id: "NCR-2023-040",
    partNumber: "PA-4502",
    partName: "Housing Cover",
    customer: "Innovate Engineering",
    orderNumber: "ORD-2023-1040",
    reportedBy: "Michael Chen",
    reportDate: "2023-05-05",
    status: "Resolved",
    severity: "Critical",
    description: "Material hardness below specification",
  },
  {
    id: "NCR-2023-039",
    partNumber: "PA-1205",
    partName: "Shaft Coupling",
    customer: "Global Manufacturing",
    orderNumber: "ORD-2023-1039",
    reportedBy: "Lisa Rodriguez",
    reportDate: "2023-05-03",
    status: "Closed",
    severity: "Major",
    description: "Incorrect material used in production",
  },
  {
    id: "NCR-2023-038",
    partNumber: "PA-3301",
    partName: "Gear Assembly",
    customer: "Precision Parts Inc",
    orderNumber: "ORD-2023-1038",
    reportedBy: "David Wilson",
    reportDate: "2023-04-28",
    status: "Open",
    severity: "Minor",
    description: "Missing documentation for heat treatment process",
  },
]

export default function NonConformancePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Non-Conformance Reports</h1>
          <p className="text-muted-foreground">Manage and track quality issues</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search reports..." className="pl-8 w-full" />
          </div>
          <Button size="default" className="h-10">
            <Link href="/quality/non-conformance/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create Report
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
                  <th className="text-left font-medium p-4">NCR ID</th>
                  <th className="text-left font-medium p-4">Part</th>
                  <th className="text-left font-medium p-4">Customer</th>
                  <th className="text-left font-medium p-4">Order</th>
                  <th className="text-left font-medium p-4">Reported By</th>
                  <th className="text-left font-medium p-4">Date</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-left font-medium p-4">Severity</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {nonConformanceReports.map((report) => (
                  <tr
                    key={report.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => (window.location.href = `/quality/non-conformance/${report.id}`)}
                  >
                    <td className="p-4 font-medium">{report.id}</td>
                    <td className="p-4">
                      <div>{report.partName}</div>
                      <div className="text-xs text-muted-foreground">{report.partNumber}</div>
                    </td>
                    <td className="p-4">{report.customer}</td>
                    <td className="p-4">{report.orderNumber}</td>
                    <td className="p-4">{report.reportedBy}</td>
                    <td className="p-4">{report.reportDate}</td>
                    <td className="p-4">
                      <StatusBadge
                        status={
                          report.status === "Closed" || report.status === "Resolved"
                            ? "success"
                            : report.status === "In Review"
                              ? "warning"
                              : "error"
                        }
                      >
                        {report.status}
                      </StatusBadge>
                    </td>
                    <td className="p-4">
                      <StatusBadge
                        status={
                          report.severity === "Minor" ? "info" : report.severity === "Major" ? "warning" : "error"
                        }
                      >
                        {report.severity}
                      </StatusBadge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Additional actions
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
