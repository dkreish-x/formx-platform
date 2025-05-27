"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import Link from "next/link"
import { StatusBadge } from "@/components/ui/status-badge"

// Mock data for receiving
const receivingItems = [
  {
    id: "RCV-001",
    poNumber: "PO-2023-0042",
    supplier: "Precision Metals Inc.",
    expectedDate: "2023-04-20",
    items: 12,
    status: "Scheduled",
  },
  {
    id: "RCV-002",
    poNumber: "PO-2023-0039",
    supplier: "FastTrack Electronics",
    expectedDate: "2023-04-18",
    items: 8,
    status: "In Transit",
  },
  {
    id: "RCV-003",
    poNumber: "PO-2023-0035",
    supplier: "Global Hardware Solutions",
    expectedDate: "2023-04-15",
    items: 15,
    status: "Arrived",
  },
  {
    id: "RCV-004",
    poNumber: "PO-2023-0031",
    supplier: "Quality Plastics Co.",
    expectedDate: "2023-04-12",
    items: 5,
    status: "Inspecting",
  },
  {
    id: "RCV-005",
    poNumber: "PO-2023-0028",
    supplier: "Innovative Components Ltd.",
    expectedDate: "2023-04-10",
    items: 20,
    status: "Completed",
  },
  {
    id: "RCV-006",
    poNumber: "PO-2023-0025",
    supplier: "Reliable Fasteners",
    expectedDate: "2023-04-08",
    items: 30,
    status: "Completed",
  },
  {
    id: "RCV-007",
    poNumber: "PO-2023-0022",
    supplier: "Tech Solutions Group",
    expectedDate: "2023-04-05",
    items: 3,
    status: "Issue Found",
  },
]

export default function ReceivingPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Receiving</h1>
          <p className="text-muted-foreground">Manage incoming shipments and inventory receiving</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search receiving..." className="max-w-[250px]" />
          <Button>Record Receipt</Button>
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
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Expected Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receivingItems.map((item) => (
                <TableRow key={item.id} className="cursor-pointer" onClick={() => {}}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell className="font-medium">{item.poNumber}</TableCell>
                  <TableCell>{item.supplier}</TableCell>
                  <TableCell>{item.expectedDate}</TableCell>
                  <TableCell>{item.items}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={
                        item.status === "Completed"
                          ? "success"
                          : item.status === "Arrived" || item.status === "Inspecting"
                            ? "info"
                            : item.status === "In Transit" || item.status === "Scheduled"
                              ? "warning"
                              : "error"
                      }
                    >
                      {item.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/purchasing/receiving/${item.id}`}>
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
