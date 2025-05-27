"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, Eye, Filter } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

// Mock data for materials
const materials = [
  {
    id: "MAT-2023-0142",
    name: "Aluminum 6061-T6",
    type: "Raw Material",
    form: "Sheet",
    dimensions: '48" x 96" x 0.25"',
    lotNumber: "LOT-AL6061-2023-042",
    quantity: "25 sheets",
    location: "Rack A-12",
    supplier: "Metal Suppliers Inc.",
    purchaseOrder: "PO-2023-0098",
    receivedDate: "2023-04-28",
    certificationAvailable: true,
    allocated: "10 sheets",
    remaining: "15 sheets",
  },
  {
    id: "MAT-2023-0143",
    name: "Stainless Steel 304",
    type: "Raw Material",
    form: "Round Bar",
    dimensions: '1" Dia x 72"',
    lotNumber: "LOT-SS304-2023-031",
    quantity: "50 bars",
    location: "Rack B-05",
    supplier: "Steel Supply Co.",
    purchaseOrder: "PO-2023-0095",
    receivedDate: "2023-04-25",
    certificationAvailable: true,
    allocated: "20 bars",
    remaining: "30 bars",
  },
  {
    id: "MAT-2023-0144",
    name: "ABS Plastic",
    type: "Raw Material",
    form: "Sheet",
    dimensions: '24" x 48" x 0.125"',
    lotNumber: "LOT-ABS-2023-015",
    quantity: "30 sheets",
    location: "Rack C-08",
    supplier: "Plastic Distributors Inc.",
    purchaseOrder: "PO-2023-0090",
    receivedDate: "2023-04-20",
    certificationAvailable: false,
    allocated: "5 sheets",
    remaining: "25 sheets",
  },
  {
    id: "MAT-2023-0145",
    name: "Titanium Grade 5",
    type: "Raw Material",
    form: "Plate",
    dimensions: '12" x 12" x 0.5"',
    lotNumber: "LOT-TI5-2023-008",
    quantity: "10 plates",
    location: "Rack D-02",
    supplier: "Specialty Metals Inc.",
    purchaseOrder: "PO-2023-0085",
    receivedDate: "2023-04-15",
    certificationAvailable: true,
    allocated: "2 plates",
    remaining: "8 plates",
  },
  {
    id: "MAT-2023-0146",
    name: "Copper C110",
    type: "Raw Material",
    form: "Round Bar",
    dimensions: '0.5" Dia x 36"',
    lotNumber: "LOT-CU110-2023-022",
    quantity: "40 bars",
    location: "Rack B-10",
    supplier: "Metal Suppliers Inc.",
    purchaseOrder: "PO-2023-0080",
    receivedDate: "2023-04-10",
    certificationAvailable: true,
    allocated: "15 bars",
    remaining: "25 bars",
  },
]

export default function MaterialsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Materials</h1>
          <p className="text-muted-foreground">Manage your material inventory</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search materials..." className="pl-8 w-full" />
          </div>
          <Button size="default" className="h-10">
            <Link href="/inventory/materials/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Material
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
                  <th className="text-left font-medium p-4">Material</th>
                  <th className="text-left font-medium p-4">Type</th>
                  <th className="text-left font-medium p-4">Form</th>
                  <th className="text-left font-medium p-4">Dimensions</th>
                  <th className="text-left font-medium p-4">Location</th>
                  <th className="text-left font-medium p-4">Quantity</th>
                  <th className="text-left font-medium p-4">Allocated</th>
                  <th className="text-left font-medium p-4">Remaining</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material) => (
                  <tr
                    key={material.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => (window.location.href = `/inventory/materials/${material.id}`)}
                  >
                    <td className="p-4">{material.id}</td>
                    <td className="p-4">
                      <div className="font-medium">{material.name}</div>
                      <div className="text-xs text-muted-foreground">Lot: {material.lotNumber}</div>
                    </td>
                    <td className="p-4">{material.type}</td>
                    <td className="p-4">{material.form}</td>
                    <td className="p-4">{material.dimensions}</td>
                    <td className="p-4">{material.location}</td>
                    <td className="p-4">{material.quantity}</td>
                    <td className="p-4">{material.allocated}</td>
                    <td className="p-4">{material.remaining}</td>
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
