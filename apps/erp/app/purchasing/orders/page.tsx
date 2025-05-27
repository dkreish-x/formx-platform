"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, Eye, Filter } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

// Mock data for purchase orders
const purchaseOrders = [
  {
    id: "PO-0003780",
    vendor: "AlloyWorks Supply Co.",
    status: "Draft",
    orderDate: "11-11-2024",
    receiveByDate: "12-09-2024",
    receiving: "None Received",
    billed: "Not Billed",
    total: "$2,957.00",
  },
  {
    id: "PO-0003781",
    vendor: "CuttingEdge Tool Co.",
    status: "Sent",
    orderDate: "11-11-2024",
    receiveByDate: "12-08-2024",
    receiving: "None Received",
    billed: "Partially Billed",
    total: "$15,931.00",
  },
  {
    id: "PO-0003782",
    vendor: "LathePro Distributors",
    status: "Sent",
    orderDate: "01-11-2024",
    receiveByDate: "12-11-2024",
    receiving: "None Received",
    billed: "Partially Billed",
    total: "$2,957.00",
  },
  {
    id: "PO-0003783",
    vendor: "Advanced Composites Inc.",
    status: "Draft",
    orderDate: "11-11-2024",
    receiveByDate: "12-06-2024",
    receiving: "None Received",
    billed: "Not Billed",
    total: "$2,957.00",
  },
  {
    id: "PO-0003784",
    vendor: "TitaniumTech Distributors",
    status: "Sent",
    orderDate: "11-13-2024",
    receiveByDate: "12-11-2024",
    receiving: "None Received",
    billed: "Partially Billed",
    total: "$2,957.00",
  },
  {
    id: "PO-0003785",
    vendor: "MetalMasters Warehouse",
    status: "Draft",
    orderDate: "11-01-2024",
    receiveByDate: "12-11-2024",
    receiving: "None Received",
    billed: "Not Billed",
    total: "$2,957.00",
  },
]

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
          <p className="text-muted-foreground">Manage your purchase orders</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search purchase orders..." className="pl-8 w-full" />
          </div>
          <Button size="default" className="h-10">
            <Link href="/purchasing/orders/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Purchase Order
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
                  <th className="text-left font-medium p-4">PO Number</th>
                  <th className="text-left font-medium p-4">Vendor</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-left font-medium p-4">Order Date</th>
                  <th className="text-left font-medium p-4">Receive By</th>
                  <th className="text-left font-medium p-4">Receiving</th>
                  <th className="text-left font-medium p-4">Billed</th>
                  <th className="text-left font-medium p-4">Total</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {purchaseOrders.map((po) => (
                  <tr
                    key={po.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => (window.location.href = `/purchasing/orders/${po.id}`)}
                  >
                    <td className="p-4">{po.id}</td>
                    <td className="p-4">
                      <div className="font-medium">{po.vendor}</div>
                    </td>
                    <td className="p-4">{po.status}</td>
                    <td className="p-4">{po.orderDate}</td>
                    <td className="p-4">{po.receiveByDate}</td>
                    <td className="p-4">{po.receiving}</td>
                    <td className="p-4">{po.billed}</td>
                    <td className="p-4">{po.total}</td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/purchasing/orders/${po.id}`
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
