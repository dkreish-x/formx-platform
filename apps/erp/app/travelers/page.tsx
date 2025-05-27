"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { Plus, Search, Eye, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for travelers
const travelers = [
  {
    id: "TRAV-2023-0142",
    partNumber: "PA-1042",
    partName: "Bracket Assembly",
    customer: "Acme Industries",
    orderNumber: "ORD-2023-1042",
    status: "In Production",
    currentOperation: "CNC Milling",
    completionPercentage: 40,
    dueDate: "2023-05-15",
  },
  {
    id: "TRAV-2023-0143",
    partNumber: "PA-2310",
    partName: "Mounting Plate",
    customer: "TechCorp Solutions",
    orderNumber: "ORD-2023-1041",
    status: "Quality Check",
    currentOperation: "Inspection",
    completionPercentage: 80,
    dueDate: "2023-05-14",
  },
  {
    id: "TRAV-2023-0144",
    partNumber: "PA-4502",
    partName: "Housing Cover",
    customer: "Innovate Engineering",
    orderNumber: "ORD-2023-1040",
    status: "Material Prep",
    currentOperation: "Cutting",
    completionPercentage: 10,
    dueDate: "2023-05-20",
  },
  {
    id: "TRAV-2023-0145",
    partNumber: "PA-1205",
    partName: "Shaft Coupling",
    customer: "Global Manufacturing",
    orderNumber: "ORD-2023-1039",
    status: "Finishing",
    currentOperation: "Anodizing",
    completionPercentage: 90,
    dueDate: "2023-05-12",
  },
  {
    id: "TRAV-2023-0146",
    partNumber: "PA-3301",
    partName: "Gear Assembly",
    customer: "Precision Parts Inc",
    orderNumber: "ORD-2023-1038",
    status: "Complete",
    currentOperation: "Shipping",
    completionPercentage: 100,
    dueDate: "2023-05-10",
  },
]

export default function TravelersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Digital Travelers</h1>
          <p className="text-muted-foreground">Track production through the manufacturing process</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search travelers..." className="pl-8 w-full" />
          </div>
          <Button size="default" className="h-10">
            <Link href="/travelers/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Create Traveler
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
                  <th className="text-left font-medium p-4">Traveler ID</th>
                  <th className="text-left font-medium p-4">Part</th>
                  <th className="text-left font-medium p-4">Customer</th>
                  <th className="text-left font-medium p-4">Order</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-left font-medium p-4">Current Operation</th>
                  <th className="text-left font-medium p-4">Completion</th>
                  <th className="text-left font-medium p-4">Due Date</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {travelers.map((traveler) => (
                  <tr
                    key={traveler.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => (window.location.href = `/travelers/${traveler.id}`)}
                  >
                    <td className="p-4 font-medium">{traveler.id}</td>
                    <td className="p-4">
                      <div>{traveler.partName}</div>
                      <div className="text-xs text-muted-foreground">{traveler.partNumber}</div>
                    </td>
                    <td className="p-4">{traveler.customer}</td>
                    <td className="p-4">{traveler.orderNumber}</td>
                    <td className="p-4">
                      <StatusBadge
                        status={
                          traveler.status === "Complete"
                            ? "success"
                            : traveler.status === "Quality Check"
                              ? "warning"
                              : traveler.status === "In Production"
                                ? "info"
                                : traveler.status === "Material Prep"
                                  ? "info"
                                  : "warning"
                        }
                      >
                        {traveler.status}
                      </StatusBadge>
                    </td>
                    <td className="p-4">{traveler.currentOperation}</td>
                    <td className="p-4">{traveler.completionPercentage}%</td>
                    <td className="p-4">{traveler.dueDate}</td>
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
