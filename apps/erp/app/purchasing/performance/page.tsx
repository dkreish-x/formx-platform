"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import Link from "next/link"
import { StatusBadge } from "@/components/ui/status-badge"

// Mock data for supplier performance
const supplierPerformance = [
  {
    id: "SUP-001",
    name: "Precision Metals Inc.",
    onTimeDelivery: "98%",
    qualityRating: "95%",
    responseTime: "24h",
    costVariance: "+2%",
    overallScore: "A",
  },
  {
    id: "SUP-002",
    name: "FastTrack Electronics",
    onTimeDelivery: "92%",
    qualityRating: "90%",
    responseTime: "12h",
    costVariance: "-1%",
    overallScore: "B+",
  },
  {
    id: "SUP-003",
    name: "Global Hardware Solutions",
    onTimeDelivery: "95%",
    qualityRating: "93%",
    responseTime: "36h",
    costVariance: "0%",
    overallScore: "B",
  },
  {
    id: "SUP-004",
    name: "Quality Plastics Co.",
    onTimeDelivery: "85%",
    qualityRating: "88%",
    responseTime: "48h",
    costVariance: "+5%",
    overallScore: "C+",
  },
  {
    id: "SUP-005",
    name: "Innovative Components Ltd.",
    onTimeDelivery: "99%",
    qualityRating: "97%",
    responseTime: "8h",
    costVariance: "+3%",
    overallScore: "A+",
  },
  {
    id: "SUP-006",
    name: "Reliable Fasteners",
    onTimeDelivery: "94%",
    qualityRating: "92%",
    responseTime: "24h",
    costVariance: "-2%",
    overallScore: "B+",
  },
  {
    id: "SUP-007",
    name: "Tech Solutions Group",
    onTimeDelivery: "90%",
    qualityRating: "89%",
    responseTime: "36h",
    costVariance: "+1%",
    overallScore: "B",
  },
]

export default function SupplierPerformancePage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supplier Performance</h1>
          <p className="text-muted-foreground">Track and analyze supplier performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search suppliers..." className="max-w-[250px]" />
          <Button>Generate Report</Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          Filter
        </Button>
      </div>

      <Card>
        <div className="p-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>On-Time Delivery</TableHead>
                <TableHead>Quality Rating</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Cost Variance</TableHead>
                <TableHead>Overall Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supplierPerformance.map((supplier) => (
                <TableRow key={supplier.id} className="cursor-pointer" onClick={() => {}}>
                  <TableCell>{supplier.id}</TableCell>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={
                        Number.parseInt(supplier.onTimeDelivery) >= 95
                          ? "success"
                          : Number.parseInt(supplier.onTimeDelivery) >= 90
                            ? "default"
                            : Number.parseInt(supplier.onTimeDelivery) >= 85
                              ? "warning"
                              : "error"
                      }
                    >
                      {supplier.onTimeDelivery}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={
                        Number.parseInt(supplier.qualityRating) >= 95
                          ? "success"
                          : Number.parseInt(supplier.qualityRating) >= 90
                            ? "default"
                            : Number.parseInt(supplier.qualityRating) >= 85
                              ? "warning"
                              : "error"
                      }
                    >
                      {supplier.qualityRating}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{supplier.responseTime}</TableCell>
                  <TableCell>{supplier.costVariance}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={
                        supplier.overallScore.startsWith("A")
                          ? "success"
                          : supplier.overallScore.startsWith("B")
                            ? "default"
                            : supplier.overallScore.startsWith("C")
                              ? "warning"
                              : "error"
                      }
                    >
                      {supplier.overallScore}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/purchasing/performance/${supplier.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
