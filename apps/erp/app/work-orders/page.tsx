"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { Plus, Search, Eye, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for work orders
const workOrders = [
  {
    id: "WO-2023-0542",
    customer: "Acme Manufacturing",
    partNumber: "ACM-1042",
    partName: "Hydraulic Manifold",
    quantity: 25,
    dueDate: "2023-05-15",
    status: "In Progress",
    completionPercentage: 45,
  },
  {
    id: "WO-2023-0541",
    customer: "TechPro Industries",
    partNumber: "TP-2310",
    partName: "Mounting Bracket",
    quantity: 100,
    dueDate: "2023-05-20",
    status: "Not Started",
    completionPercentage: 0,
  },
  {
    id: "WO-2023-0540",
    customer: "Global Dynamics",
    partNumber: "GD-4502",
    partName: "Precision Gear",
    quantity: 50,
    dueDate: "2023-05-10",
    status: "Complete",
    completionPercentage: 100,
  },
  {
    id: "WO-2023-0539",
    customer: "Precision Engineering",
    partNumber: "PE-1205",
    partName: "Shaft Coupling",
    quantity: 30,
    dueDate: "2023-05-18",
    status: "In Progress",
    completionPercentage: 75,
  },
  {
    id: "WO-2023-0538",
    customer: "Innovative Metals",
    partNumber: "IM-3301",
    partName: "Control Panel Housing",
    quantity: 15,
    dueDate: "2023-05-25",
    status: "On Hold",
    completionPercentage: 20,
  },
]

export default function WorkOrdersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Orders</h1>
          <p className="text-muted-foreground">Manage and track production work orders</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search work orders..." className="pl-8 w-full" />
          </div>
          <Button size="default" className="h-10">
            <Link href="/work-orders/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create Work Order
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
                  <th className="text-left font-medium p-4">Work Order</th>
                  <th className="text-left font-medium p-4">Customer</th>
                  <th className="text-left font-medium p-4">Part</th>
                  <th className="text-left font-medium p-4">Quantity</th>
                  <th className="text-left font-medium p-4">Due Date</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-left font-medium p-4">Completion</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workOrders.map((workOrder) => (
                  <tr
                    key={workOrder.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => (window.location.href = `/work-orders/${workOrder.id}`)}
                  >
                    <td className="p-4 font-medium">{workOrder.id}</td>
                    <td className="p-4">{workOrder.customer}</td>
                    <td className="p-4">
                      <div>{workOrder.partName}</div>
                      <div className="text-xs text-muted-foreground">{workOrder.partNumber}</div>
                    </td>
                    <td className="p-4">{workOrder.quantity}</td>
                    <td className="p-4">{workOrder.dueDate}</td>
                    <td className="p-4">
                      <StatusBadge
                        status={
                          workOrder.status === "Complete"
                            ? "success"
                            : workOrder.status === "In Progress"
                              ? "warning"
                              : workOrder.status === "On Hold"
                                ? "error"
                                : "info"
                        }
                      >
                        {workOrder.status}
                      </StatusBadge>
                    </td>
                    <td className="p-4">{workOrder.completionPercentage}%</td>
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
