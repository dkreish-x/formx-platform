"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Filter, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function ShipmentsPage() {
  // Sample data
  const shipments = [
    {
      id: "SH-000131",
      orderNumber: "SO-000131",
      customer: "NexaTech Industries",
      carrier: "FedEx",
      trackingNumber: "FDX7291834650",
      shipDate: "12-15-2023",
      deliveryDate: "12-18-2023",
      status: "Delivered",
    },
    {
      id: "SH-000130",
      orderNumber: "SO-000130",
      customer: "LuminaGear Systems",
      carrier: "UPS",
      trackingNumber: "1Z9823W40392847362",
      shipDate: "02-05-2024",
      deliveryDate: "02-08-2024",
      status: "In Transit",
    },
    {
      id: "SH-000129",
      orderNumber: "SO-000129",
      customer: "Ethera Dynamics",
      carrier: "DHL",
      trackingNumber: "DHL5739284650",
      shipDate: "09-27-2023",
      deliveryDate: "10-02-2023",
      status: "Delivered",
    },
    {
      id: "SH-000128",
      orderNumber: "SO-000127",
      customer: "OmniCraft Technologies",
      carrier: "USPS",
      trackingNumber: "9400100000000000000000",
      shipDate: "12-14-2023",
      deliveryDate: "12-20-2023",
      status: "Delivered",
    },
    {
      id: "SH-000127",
      orderNumber: "SO-000126",
      customer: "VertexVista Productions",
      carrier: "FedEx",
      trackingNumber: "FDX7291834651",
      shipDate: "12-24-2023",
      deliveryDate: "12-27-2023",
      status: "Exception",
    },
    {
      id: "SH-000126",
      orderNumber: "SO-000125",
      customer: "HorizonHub Innovations",
      carrier: "UPS",
      trackingNumber: "1Z9823W40392847363",
      shipDate: "04-22-2023",
      deliveryDate: "04-25-2023",
      status: "Delivered",
    },
    {
      id: "SH-000125",
      orderNumber: "SO-000124",
      customer: "BlueWave Manufacturing",
      carrier: "DHL",
      trackingNumber: "DHL5739284651",
      shipDate: "05-10-2023",
      deliveryDate: "05-15-2023",
      status: "Delivered",
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shipments</h1>
          <p className="text-muted-foreground">Track and manage all shipments.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Shipment
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex mt-2 space-x-4">
            <Link href="/shipping" className="text-sm text-gray-500">
              Shipping List
            </Link>
            <Link href="/shipping/shipments" className="text-sm font-medium border-b-2 border-black pb-1">
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Shipment ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Carrier</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tracking Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Ship Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Delivery Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = `/shipping/shipments/${shipment.id}`)}
                  >
                    <td className="px-4 py-3 text-sm font-medium">{shipment.id}</td>
                    <td className="px-4 py-3 text-sm">{shipment.orderNumber}</td>
                    <td className="px-4 py-3 text-sm">{shipment.customer}</td>
                    <td className="px-4 py-3 text-sm">{shipment.carrier}</td>
                    <td className="px-4 py-3 text-sm">{shipment.trackingNumber}</td>
                    <td className="px-4 py-3 text-sm">{shipment.shipDate}</td>
                    <td className="px-4 py-3 text-sm">{shipment.deliveryDate}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        variant={
                          shipment.status === "Delivered"
                            ? "success"
                            : shipment.status === "In Transit"
                              ? "info"
                              : shipment.status === "Exception"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {shipment.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/shipping/shipments/${shipment.id}`
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
