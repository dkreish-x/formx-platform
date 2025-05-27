"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, PlusCircle, Search, PenToolIcon as Tool } from "lucide-react"
import Link from "next/link"

export default function MaintenanceSchedulesPage() {
  // In a real implementation, these would be fetched from the API
  const schedules = [
    {
      id: "MAINT-2023-042",
      equipment: "CNC Mill 3",
      type: "Preventive",
      frequency: "Monthly",
      lastPerformed: "2023-04-12",
      dueDate: "2023-05-12",
      status: "Scheduled",
      assignee: "Mike Johnson",
      estimatedDuration: "4 hours",
    },
    {
      id: "MAINT-2023-043",
      equipment: "Laser Cutter 1",
      type: "Calibration",
      frequency: "Quarterly",
      lastPerformed: "2023-02-15",
      dueDate: "2023-05-15",
      status: "Scheduled",
      assignee: "David Chen",
      estimatedDuration: "2 hours",
    },
    {
      id: "MAINT-2023-044",
      equipment: "Powder Coating Booth",
      type: "Cleaning",
      frequency: "Weekly",
      lastPerformed: "2023-05-03",
      dueDate: "2023-05-10",
      status: "Overdue",
      assignee: "Unassigned",
      estimatedDuration: "3 hours",
    },
    {
      id: "MAINT-2023-045",
      equipment: "CNC Lathe 2",
      type: "Preventive",
      frequency: "Monthly",
      lastPerformed: "2023-04-18",
      dueDate: "2023-05-18",
      status: "Scheduled",
      assignee: "Sarah Williams",
      estimatedDuration: "4 hours",
    },
    {
      id: "MAINT-2023-046",
      equipment: "3D Printer 1",
      type: "Cleaning",
      frequency: "Weekly",
      lastPerformed: "2023-05-05",
      dueDate: "2023-05-12",
      status: "Scheduled",
      assignee: "Mike Johnson",
      estimatedDuration: "1 hour",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Schedules</h1>
          <p className="text-muted-foreground">Manage equipment maintenance schedules</p>
        </div>
        <Button size="default" variant="default" className="h-10">
          <Link href="/maintenance/schedules/new" className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Schedule
          </Link>
        </Button>
      </div>

      <Card className="border shadow-sm mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search schedules..." className="flex-1" />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="preventive">Preventive</SelectItem>
                  <SelectItem value="calibration">Calibration</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-x-auto rounded-md border shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left font-medium p-4">ID</th>
              <th className="text-left font-medium p-4">Equipment</th>
              <th className="text-left font-medium p-4">Type</th>
              <th className="text-left font-medium p-4">Due Date</th>
              <th className="text-left font-medium p-4">Assignee</th>
              <th className="text-left font-medium p-4">Status</th>
              <th className="text-right font-medium p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr
                key={schedule.id}
                className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                onClick={() => (window.location.href = `/maintenance/schedules/${schedule.id}`)}
              >
                <td className="p-4">
                  <div className="font-medium">{schedule.id}</div>
                  <div className="text-xs text-muted-foreground">Last: {schedule.lastPerformed}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    <Tool className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{schedule.equipment}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div>{schedule.type}</div>
                  <div className="text-xs text-muted-foreground">{schedule.frequency}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{schedule.dueDate}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{schedule.estimatedDuration}</div>
                </td>
                <td className="p-4">{schedule.assignee}</td>
                <td className="p-4">
                  <Badge
                    variant={
                      schedule.status === "Completed"
                        ? "default"
                        : schedule.status === "Scheduled"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {schedule.status}
                  </Badge>
                </td>
                <td className="p-4 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
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
    </div>
  )
}
