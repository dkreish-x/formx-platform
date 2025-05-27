"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { Eye, Filter, GraduationCap, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for training records
const trainingRecords = [
  {
    id: "TRN-2025-024",
    title: "ISO 9001:2015 Awareness",
    type: "Quality System",
    instructor: "J. Smith",
    scheduledDate: "May 15, 2025",
    participants: 12,
    status: "Scheduled",
    statusType: "info",
  },
  {
    id: "TRN-2025-023",
    title: "Internal Auditor Training",
    type: "Auditing",
    instructor: "External - QMS Consultants",
    scheduledDate: "May 18-19, 2025",
    participants: 6,
    status: "Scheduled",
    statusType: "info",
  },
  {
    id: "TRN-2025-022",
    title: "GD&T Fundamentals",
    type: "Technical",
    instructor: "M. Johnson",
    scheduledDate: "May 22, 2025",
    participants: 8,
    status: "Scheduled",
    statusType: "info",
  },
  {
    id: "TRN-2025-021",
    title: "Root Cause Analysis",
    type: "Problem Solving",
    instructor: "R. Davis",
    scheduledDate: "May 25, 2025",
    participants: 15,
    status: "Scheduled",
    statusType: "info",
  },
  {
    id: "TRN-2025-020",
    title: "ITAR Compliance",
    type: "Regulatory",
    instructor: "External - Compliance Partners",
    scheduledDate: "May 28, 2025",
    participants: 42,
    status: "Scheduled",
    statusType: "info",
  },
  {
    id: "TRN-2025-019",
    title: "Measurement System Analysis",
    type: "Technical",
    instructor: "L. Wilson",
    scheduledDate: "April 28, 2025",
    participants: 10,
    status: "Completed",
    statusType: "success",
  },
  {
    id: "TRN-2025-018",
    title: "Statistical Process Control",
    type: "Technical",
    instructor: "M. Johnson",
    scheduledDate: "April 20, 2025",
    participants: 12,
    status: "Completed",
    statusType: "success",
  },
]

export default function QualityTrainingPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quality Training</h1>
          <p className="text-muted-foreground">Manage quality-related training and certifications</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search training records..." className="pl-8 w-full" />
          </div>
          <Button size="default" className="h-10">
            <Link href="/quality/training/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              New Training
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
                  <th className="text-left font-medium p-4">Instructor</th>
                  <th className="text-left font-medium p-4">Scheduled Date</th>
                  <th className="text-left font-medium p-4">Participants</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainingRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => (window.location.href = `/quality/training/${record.id}`)}
                  >
                    <td className="p-4 font-medium">{record.id}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-teal-500" />
                        <span>{record.title}</span>
                      </div>
                    </td>
                    <td className="p-4">{record.type}</td>
                    <td className="p-4">{record.instructor}</td>
                    <td className="p-4">{record.scheduledDate}</td>
                    <td className="p-4">{record.participants}</td>
                    <td className="p-4">
                      <StatusBadge status={record.statusType as any}>{record.status}</StatusBadge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/quality/training/${record.id}`
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
