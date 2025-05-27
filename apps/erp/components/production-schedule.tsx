"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Filter, Plus, Search, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for production schedule
const scheduleItems = [
  {
    id: "SCH-001",
    workOrder: "WO-1042",
    partName: "Aluminum Bracket",
    machine: "CNC Mill #1",
    operator: "John Smith",
    startTime: "2025-05-15 08:00",
    endTime: "2025-05-15 11:00",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "SCH-002",
    workOrder: "WO-1043",
    partName: "Steel Flange",
    machine: "CNC Mill #2",
    operator: "Sarah Johnson",
    startTime: "2025-05-15 08:00",
    endTime: "2025-05-15 10:00",
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "SCH-003",
    workOrder: "WO-1044",
    partName: "Brass Fitting",
    machine: "CNC Lathe #1",
    operator: "Mike Williams",
    startTime: "2025-05-15 10:00",
    endTime: "2025-05-15 13:00",
    status: "Scheduled",
    priority: "Medium",
  },
  {
    id: "SCH-004",
    workOrder: "WO-1045",
    partName: "Titanium Component",
    machine: "CNC Mill #1",
    operator: "John Smith",
    startTime: "2025-05-15 13:00",
    endTime: "2025-05-15 15:00",
    status: "Scheduled",
    priority: "High",
  },
  {
    id: "SCH-005",
    workOrder: "WO-1046",
    partName: "Aluminum Housing",
    machine: "CNC Mill #2",
    operator: "Lisa Brown",
    startTime: "2025-05-15 11:00",
    endTime: "2025-05-15 15:00",
    status: "Scheduled",
    priority: "Low",
  },
]

export function ProductionSchedule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredSchedule = scheduleItems.filter((item) => {
    const matchesSearch =
      item.workOrder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.machine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.operator.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || item.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === "all" || item.priority.toLowerCase() === priorityFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Production Schedule</CardTitle>
            <CardDescription>Manage and view scheduled production operations</CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Schedule
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search schedules..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex items-center">
                    ID
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Work Order
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Part</TableHead>
                <TableHead>Machine</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Time
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedule.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.workOrder}</TableCell>
                  <TableCell>{item.partName}</TableCell>
                  <TableCell>{item.machine}</TableCell>
                  <TableCell>{item.operator}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center text-xs">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        Start: {item.startTime.split(" ")[1]}
                      </div>
                      <div className="flex items-center text-xs mt-1">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        End: {item.endTime.split(" ")[1]}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "In Progress" ? "warning" : item.status === "Scheduled" ? "default" : "success"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        item.priority === "High"
                          ? "border-red-500 text-red-500"
                          : item.priority === "Medium"
                            ? "border-amber-500 text-amber-500"
                            : "border-blue-500 text-blue-500"
                      }
                    >
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
