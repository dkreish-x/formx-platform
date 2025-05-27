"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"

// Mock data for schedule timeline
const timeSlots = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

const resources = [
  {
    id: "M001",
    name: "CNC Mill #1",
    type: "Machine",
    schedule: [
      { id: "SCH-001", workOrder: "WO-1042", start: 1, duration: 3, status: "In Progress" },
      { id: "SCH-002", workOrder: "WO-1045", start: 5, duration: 2, status: "Scheduled" },
      { id: "SCH-003", workOrder: "WO-1048", start: 8, duration: 2, status: "Scheduled" },
    ],
  },
  {
    id: "M002",
    name: "CNC Mill #2",
    type: "Machine",
    schedule: [
      { id: "SCH-004", workOrder: "WO-1043", start: 0, duration: 2, status: "In Progress" },
      { id: "SCH-005", workOrder: "WO-1046", start: 3, duration: 4, status: "Scheduled" },
      { id: "SCH-006", workOrder: "WO-1049", start: 8, duration: 2, status: "Scheduled" },
    ],
  },
  {
    id: "M003",
    name: "CNC Lathe #1",
    type: "Machine",
    schedule: [
      { id: "SCH-007", workOrder: "WO-1044", start: 2, duration: 3, status: "Scheduled" },
      { id: "SCH-008", workOrder: "WO-1047", start: 6, duration: 3, status: "Scheduled" },
    ],
  },
  {
    id: "OP001",
    name: "John Smith",
    type: "Operator",
    schedule: [
      { id: "SCH-009", workOrder: "WO-1042", start: 1, duration: 3, status: "In Progress" },
      { id: "SCH-010", workOrder: "WO-1046", start: 5, duration: 2, status: "Scheduled" },
      { id: "SCH-011", workOrder: "WO-1049", start: 8, duration: 2, status: "Scheduled" },
    ],
  },
  {
    id: "OP002",
    name: "Sarah Johnson",
    type: "Operator",
    schedule: [
      { id: "SCH-012", workOrder: "WO-1043", start: 0, duration: 2, status: "In Progress" },
      { id: "SCH-013", workOrder: "WO-1047", start: 6, duration: 3, status: "Scheduled" },
    ],
  },
]

export function ScheduleTimeline() {
  const [currentDate, setCurrentDate] = useState("May 15, 2025")
  const [filter, setFilter] = useState("all")

  const filteredResources =
    filter === "all" ? resources : resources.filter((resource) => resource.type.toLowerCase() === filter)

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Production Schedule</CardTitle>
            <CardDescription>Visual timeline of scheduled operations</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">{currentDate}</div>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
              All
            </Button>
            <Button
              variant={filter === "machine" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("machine")}
            >
              Machines
            </Button>
            <Button
              variant={filter === "operator" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("operator")}
            >
              Operators
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>

        <div className="border rounded-lg overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Timeline header */}
            <div className="flex border-b">
              <div className="w-40 p-2 font-medium border-r">Resource</div>
              <div className="flex-1 flex">
                {timeSlots.map((time, index) => (
                  <div key={index} className="flex-1 p-2 text-center text-sm font-medium border-r last:border-r-0">
                    {time}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline rows */}
            {filteredResources.map((resource) => (
              <div key={resource.id} className="flex border-b last:border-b-0">
                <div className="w-40 p-2 border-r">
                  <div className="font-medium">{resource.name}</div>
                  <div className="text-xs text-muted-foreground">{resource.type}</div>
                </div>
                <div className="flex-1 flex relative p-2">
                  {resource.schedule.map((item) => (
                    <div
                      key={item.id}
                      className={`absolute h-12 rounded-md border p-1 text-xs flex flex-col justify-center ${
                        item.status === "In Progress" ? "bg-amber-100 border-amber-300" : "bg-blue-50 border-blue-200"
                      }`}
                      style={{
                        left: `${(item.start / timeSlots.length) * 100}%`,
                        width: `${(item.duration / timeSlots.length) * 100}%`,
                        top: "8px",
                      }}
                    >
                      <div className="font-medium truncate">{item.workOrder}</div>
                      <div className="flex items-center">
                        <Badge
                          variant={item.status === "In Progress" ? "warning" : "default"}
                          className="text-[10px] px-1 py-0"
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {/* Time slot grid lines */}
                  {timeSlots.map((_, index) => (
                    <div key={index} className="flex-1 border-r last:border-r-0" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
