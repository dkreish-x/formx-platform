"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { AlertTriangle, ClipboardCheck, Eye, FileText, Filter, Microscope, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function QualityPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quality Management</h1>
          <p className="text-muted-foreground">Manage quality processes, documentation, and compliance</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search quality records..." className="pl-8 w-full" />
          </div>
          <Button size="default" className="h-10">
            <Link href="/quality/dashboard" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Quality Dashboard
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
                  <th className="text-left font-medium p-4">Module</th>
                  <th className="text-left font-medium p-4">Description</th>
                  <th className="text-left font-medium p-4">Open Items</th>
                  <th className="text-left font-medium p-4">Last Updated</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                  onClick={() => (window.location.href = "/quality/inspections")}
                >
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-2">
                      <Microscope className="h-4 w-4 text-indigo-500" />
                      <span>Inspections</span>
                    </div>
                  </td>
                  <td className="p-4">Quality inspection management</td>
                  <td className="p-4">28</td>
                  <td className="p-4">May 11, 2025</td>
                  <td className="p-4">
                    <StatusBadge status="success">Active</StatusBadge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = "/quality/inspections"
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </td>
                </tr>
                <tr
                  className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                  onClick={() => (window.location.href = "/quality/non-conformance")}
                >
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Non-Conformance</span>
                    </div>
                  </td>
                  <td className="p-4">Non-conformance reporting and tracking</td>
                  <td className="p-4">7</td>
                  <td className="p-4">May 10, 2025</td>
                  <td className="p-4">
                    <StatusBadge status="warning">Attention Needed</StatusBadge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = "/quality/non-conformance"
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </td>
                </tr>
                <tr
                  className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                  onClick={() => (window.location.href = "/quality/capa")}
                >
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="h-4 w-4 text-blue-500" />
                      <span>CAPA</span>
                    </div>
                  </td>
                  <td className="p-4">Corrective and preventive actions</td>
                  <td className="p-4">12</td>
                  <td className="p-4">May 9, 2025</td>
                  <td className="p-4">
                    <StatusBadge status="warning">5 Past Due</StatusBadge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = "/quality/capa"
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </td>
                </tr>
                <tr
                  className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                  onClick={() => (window.location.href = "/quality/documents")}
                >
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-emerald-500" />
                      <span>Documents</span>
                    </div>
                  </td>
                  <td className="p-4">Quality system documentation</td>
                  <td className="p-4">245</td>
                  <td className="p-4">May 8, 2025</td>
                  <td className="p-4">
                    <StatusBadge status="info">9 Pending Review</StatusBadge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = "/quality/documents"
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </td>
                </tr>
                <tr
                  className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                  onClick={() => (window.location.href = "/quality/audits")}
                >
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="h-4 w-4 text-violet-500" />
                      <span>Audits</span>
                    </div>
                  </td>
                  <td className="p-4">Internal and external quality audits</td>
                  <td className="p-4">4</td>
                  <td className="p-4">May 7, 2025</td>
                  <td className="p-4">
                    <StatusBadge status="success">On Schedule</StatusBadge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = "/quality/audits"
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </td>
                </tr>
                <tr
                  className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                  onClick={() => (window.location.href = "/quality/training")}
                >
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-2">
                      <ClipboardCheck className="h-4 w-4 text-teal-500" />
                      <span>Training</span>
                    </div>
                  </td>
                  <td className="p-4">Quality training management</td>
                  <td className="p-4">8</td>
                  <td className="p-4">May 6, 2025</td>
                  <td className="p-4">
                    <StatusBadge status="info">Scheduled</StatusBadge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.location.href = "/quality/training"
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
