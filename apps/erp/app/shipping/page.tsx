"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Filter, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function ShippingPage() {
  // Sample data
  const shipments = [
    {
      id: "SO-000131",
      customer: "NexaTech Industries",
      poNumber: "PO-013579",
      orderDate: "12-12-2023",
      shipped: "Not Shipped",
      invoiced: "Not Invoiced",
      total: "$59,437.00",
    },
    {
      id: "SO-000130",
      customer: "LuminaGear Systems",
      poNumber: "PO-013579",
      orderDate: "02-03-2024",
      shipped: "Partially Shipped",
      invoiced: "Partially Invoiced",
      total: "$59,437.00",
    },
    {
      id: "SO-000129",
      customer: "Ethera Dynamics",
      poNumber: "PO-013579",
      orderDate: "09-25-2023",
      shipped: "Shipped",
      invoiced: "Fully Invoiced",
      total: "$59,437.00",
    },
    {
      id: "SO-000127",
      customer: "OmniCraft Technologies",
      poNumber: "PO-013579",
      orderDate: "12-12-2023",
      shipped: "Not Shipped",
      invoiced: "Not Invoiced",
      total: "$59,437.00",
    },
    {
      id: "SO-000126",
      customer: "VertexVista Productions",
      poNumber: "PO-013579",
      orderDate: "12-23-2023",
      shipped: "Partially Shipped",
      invoiced: "Partially Invoiced",
      total: "$55,520.00",
    },
    {
      id: "SO-000125",
      customer: "HorizonHub Innovations",
      poNumber: "PO-013579",
      orderDate: "04-20-2023",
      shipped: "Not Shipped",
      invoiced: "Not Invoiced",
      total: "$59,437.00",
    },
    {
      id: "SO-000124",
      customer: "BlueWave Manufacturing",
      poNumber: "PO-013579",
      orderDate: "05-09-2023",
      shipped: "Partially Shipped",
      invoiced: "Partially Invoiced",
      total: "$59,437.00",
    },
  ]

  // Stats
  const stats = [
    { label: "Partially Ready To Ship", count: 23, value: "$17,057.00", color: "bg-gray-200" },
    { label: "Ready To Ship", count: 57, value: "$72,921.00", color: "bg-blue-500" },
    { label: "Late", count: 22, value: "$14,057.00", color: "bg-red-500" },
    { label: "Completed", count: 132, value: "$101,057.00", color: "bg-black" },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shipping</h1>
          <p className="text-muted-foreground">Manage outgoing shipments and deliveries.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Shipment
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-sm ${stat.color}`}></div>
                <span className="text-sm text-gray-500">{stat.label}</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-2xl font-bold">{stat.count}</span>
                <span className="text-sm text-gray-500">Value</span>
              </div>
              <div className="text-right text-sm font-medium">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Shipping List</h2>
          <div className="flex mt-2 space-x-4">
            <Link href="/shipping/receiving" className="text-sm text-gray-500">
              Receiving List
            </Link>
            <Link href="/shipping" className="text-sm font-medium border-b-2 border-black pb-1">
              Shipping List
            </Link>
            <Link href="/shipping/shipments" className="text-sm text-gray-500">
              Shipments
            </Link>
            <Link href="/shipping/carriers" className="text-sm text-gray-500">
              Carriers
            </Link>
            <Link href="/shipping/tracking" className="text-sm text-gray-500">
              Tracking
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input placeholder="Search shipments..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">PO Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Shipped</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Invoiced</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = `/shipping/${shipment.id}`)}
                  >
                    <td className="px-4 py-3 text-sm font-medium">{shipment.id}</td>
                    <td className="px-4 py-3 text-sm">{shipment.customer}</td>
                    <td className="px-4 py-3 text-sm">{shipment.poNumber}</td>
                    <td className="px-4 py-3 text-sm">{shipment.orderDate}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        variant={
                          shipment.shipped === "Not Shipped"
                            ? "outline"
                            : shipment.shipped === "Partially Shipped"
                              ? "warning"
                              : "success"
                        }
                      >
                        {shipment.shipped}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        variant={
                          shipment.invoiced === "Not Invoiced"
                            ? "outline"
                            : shipment.invoiced === "Partially Invoiced"
                              ? "warning"
                              : "success"
                        }
                      >
                        {shipment.invoiced}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">{shipment.total}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/shipping/${shipment.id}`
                        }}
                      >
                        <Eye className="h-4 w-4" />
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
