"use client"

import Link from "next/link"
import { Eye, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// Mock data for maintenance work orders
const workOrders = [
  {
    id: "WO-2023-0001",
    equipment: "CNC Mill #3",
    type: "Preventive",
    priority: "Medium",
    assignedTo: "John Smith",
    dueDate: "2023-05-15",
    status: "Scheduled",
  },
  {
    id: "WO-2023-0002",
    equipment: "Laser Cutter #1",
    type: "Corrective",
    priority: "High",
    assignedTo: "Maria Rodriguez",
    dueDate: "2023-05-12",
    status: "In Progress",
  },
  {
    id: "WO-2023-0003",
    equipment: "Hydraulic Press #2",
    type: "Preventive",
    priority: "Low",
    assignedTo: "David Chen",
    dueDate: "2023-05-20",
    status: "Scheduled",
  },
  {
    id: "WO-2023-0004",
    equipment: "Welding Robot",
    type: "Emergency",
    priority: "Critical",
    assignedTo: "Sarah Johnson",
    dueDate: "2023-05-10",
    status: "In Progress",
  },
  {
    id: "WO-2023-0005",
    equipment: "Paint Booth",
    type: "Corrective",
    priority: "Medium",
    assignedTo: "Michael Brown",
    dueDate: "2023-05-18",
    status: "Completed",
  },
  {
    id: "WO-2023-0006",
    equipment: "Assembly Line #1",
    type: "Preventive",
    priority: "Medium",
    assignedTo: "Lisa Wong",
    dueDate: "2023-05-25",
    status: "Scheduled",
  },
  {
    id: "WO-2023-0007",
    equipment: "Forklift #3",
    type: "Corrective",
    priority: "High",
    assignedTo: "Robert Taylor",
    dueDate: "2023-05-14",
    status: "On Hold",
  },
]

export default function MaintenanceWorkOrdersPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance Work Orders</h1>
          <p className="text-muted-foreground">Manage equipment maintenance work orders</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search work orders..."
                className="w-full bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>
          <Button>
            <Link href="/maintenance/work-orders/new">Create Work Order</Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-8 text-xs">
          Filter
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50 text-xs">
                  <th className="px-4 py-3 text-left font-medium">Work Order ID</th>
                  <th className="px-4 py-3 text-left font-medium">Equipment</th>
                  <th className="px-4 py-3 text-left font-medium">Type</th>
                  <th className="px-4 py-3 text-left font-medium">Priority</th>
                  <th className="px-4 py-3 text-left font-medium">Assigned To</th>
                  <th className="px-4 py-3 text-left font-medium">Due Date</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workOrders.map((workOrder) => (
                  <tr
                    key={workOrder.id}
                    className="border-b transition-colors hover:bg-muted/50"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.location.href = `/maintenance/work-orders/${workOrder.id}`
                    }}
                  >
                    <td className="px-4 py-3 text-sm">{workOrder.id}</td>
                    <td className="px-4 py-3 text-sm">{workOrder.equipment}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant={workOrder.type === "Emergency" ? "destructive" : "outline"}>
                        {workOrder.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        variant={
                          workOrder.priority === "Critical"
                            ? "destructive"
                            : workOrder.priority === "High"
                              ? "warning"
                              : workOrder.priority === "Medium"
                                ? "secondary"
                                : "info"
                        }
                      >
                        {workOrder.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">{workOrder.assignedTo}</td>
                    <td className="px-4 py-3 text-sm">{workOrder.dueDate}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        variant={
                          workOrder.status === "Scheduled"
                            ? "info"
                            : workOrder.status === "In Progress"
                              ? "warning"
                              : workOrder.status === "Completed"
                                ? "success"
                                : "destructive"
                        }
                      >
                        {workOrder.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <Link href={`/maintenance/work-orders/${workOrder.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
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
