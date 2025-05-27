"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import Link from "next/link"
import { StatusBadge } from "@/components/ui/status-badge"

// Mock data for suppliers
const suppliers = [
  {
    id: "SUP-001",
    name: "Precision Metals Inc.",
    category: "Raw Materials",
    rating: "Preferred",
    location: "Chicago, IL",
    lastOrder: "2023-04-15",
    status: "Active",
  },
  {
    id: "SUP-002",
    name: "FastTrack Electronics",
    category: "Electronics",
    rating: "Approved",
    location: "San Jose, CA",
    lastOrder: "2023-04-02",
    status: "Active",
  },
  {
    id: "SUP-003",
    name: "Global Hardware Solutions",
    category: "Hardware",
    rating: "Approved",
    location: "Austin, TX",
    lastOrder: "2023-03-28",
    status: "Active",
  },
  {
    id: "SUP-004",
    name: "Quality Plastics Co.",
    category: "Raw Materials",
    rating: "Under Review",
    location: "Detroit, MI",
    lastOrder: "2023-03-10",
    status: "On Hold",
  },
  {
    id: "SUP-005",
    name: "Innovative Components Ltd.",
    category: "Components",
    rating: "Preferred",
    location: "Boston, MA",
    lastOrder: "2023-04-10",
    status: "Active",
  },
  {
    id: "SUP-006",
    name: "Reliable Fasteners",
    category: "Hardware",
    rating: "Approved",
    location: "Pittsburgh, PA",
    lastOrder: "2023-03-22",
    status: "Active",
  },
  {
    id: "SUP-007",
    name: "Tech Solutions Group",
    category: "Electronics",
    rating: "New",
    location: "Seattle, WA",
    lastOrder: "2023-04-05",
    status: "Pending",
  },
]

export default function SuppliersPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
          <p className="text-muted-foreground">Manage supplier information and relationships</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search suppliers..." className="max-w-[250px]" />
          <Button>Add Supplier</Button>
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
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier.id} className="cursor-pointer" onClick={() => {}}>
                  <TableCell>{supplier.id}</TableCell>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.category}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={
                        supplier.rating === "Preferred"
                          ? "success"
                          : supplier.rating === "Approved"
                            ? "default"
                            : supplier.rating === "New"
                              ? "info"
                              : "warning"
                      }
                    >
                      {supplier.rating}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{supplier.location}</TableCell>
                  <TableCell>{supplier.lastOrder}</TableCell>
                  <TableCell>
                    <StatusBadge
                      status={
                        supplier.status === "Active" ? "success" : supplier.status === "Pending" ? "warning" : "error"
                      }
                    >
                      {supplier.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/purchasing/suppliers/${supplier.id}`}>
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
