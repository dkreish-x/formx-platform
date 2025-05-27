"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Filter, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function TrackingPage() {
  // Sample data
  const trackingRecords = [
    {
      id: "TRK-000131",
      shipmentId: "SH-000131",
      orderNumber: "SO-000131",
      customer: "NexaTech Industries",
      carrier: "FedEx",
      trackingNumber: "FDX7291834650",
      lastUpdate: "12-18-2023 14:32",
      location: "Customer Location",
      status: "Delivered",
    },
    {
      id: "TRK-000130",
      shipmentId: "SH-000130",
      orderNumber: "SO-000130",
      customer: "LuminaGear Systems",
      carrier: "UPS",
      trackingNumber: "1Z9823W40392847362",
      lastUpdate: "02-07-2024 09:15",
      location: "Regional Distribution Center",
      status: "In Transit",
    },
    {
      id: "TRK-000129",
      shipmentId: "SH-000129",
      orderNumber: "SO-000129",
      customer: "Ethera Dynamics",
      carrier: "DHL",
      trackingNumber: "DHL5739284650",
      lastUpdate: "10-02-2023 11:45",
      location: "Customer Location",
      status: "Delivered",
    },
    {
      id: "TRK-000128",
      shipmentId: "SH-000128",
      orderNumber: "SO-000127",
      customer: "OmniCraft Technologies",
      carrier: "USPS",
      trackingNumber: "9400100000000000000000",
      lastUpdate: "12-20-2023 16:20",
      location: "Customer Location",
      status: "Delivered",
    },
    {
      id: "TRK-000127",
      shipmentId: "SH-000127",
      orderNumber: "SO-000126",
      customer: "VertexVista Productions",
      carrier: "FedEx",
      trackingNumber: "FDX7291834651",
      lastUpdate: "12-26-2023 08:45",
      location: "Local Facility",
      status: "Exception",
    },
    {
      id: "TRK-000126",
      shipmentId: "SH-000126",
      orderNumber: "SO-000125",
      customer: "HorizonHub Innovations",
      carrier: "UPS",
      trackingNumber: "1Z9823W40392847363",
      lastUpdate: "04-25-2023 13:10",
      location: "Customer Location",
      status: "Delivered",
    },
    {
      id: "TRK-000125",
      shipmentId: "SH-000125",
      orderNumber: "SO-000124",
      customer: "BlueWave Manufacturing",
      carrier: "DHL",
      trackingNumber: "DHL5739284651",
      lastUpdate: "05-15-2023 10:30",
      location: "Customer Location",
      status: "Delivered",
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shipment Tracking</h1>
          <p className="text-muted-foreground">Track and monitor all shipments.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Track New Shipment
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex mt-2 space-x-4">
            <Link href="/shipping" className="text-sm text-gray-500">
              Shipping List
            </Link>
            <Link href="/shipping/shipments" className="text-sm text-gray-500">
              Shipments
            </Link>
            <Link href="/shipping/carriers" className="text-sm text-gray-500">
              Carriers
            </Link>
            <Link href="/shipping/tracking" className="text-sm font-medium border-b-2 border-black pb-1">
              Tracking
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input placeholder="Search by tracking number..." className="pl-10" />
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tracking ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Shipment ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Carrier</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Tracking Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Update</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Location</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {trackingRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = `/shipping/tracking/${record.id}`)}
                  >
                    <td className="px-4 py-3 text-sm font-medium">{record.id}</td>
                    <td className="px-4 py-3 text-sm">{record.shipmentId}</td>
                    <td className="px-4 py-3 text-sm">{record.orderNumber}</td>
                    <td className="px-4 py-3 text-sm">{record.customer}</td>
                    <td className="px-4 py-3 text-sm">{record.carrier}</td>
                    <td className="px-4 py-3 text-sm">{record.trackingNumber}</td>
                    <td className="px-4 py-3 text-sm">{record.lastUpdate}</td>
                    <td className="px-4 py-3 text-sm">{record.location}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        variant={
                          record.status === "Delivered"
                            ? "success"
                            : record.status === "In Transit"
                              ? "info"
                              : record.status === "Exception"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {record.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/shipping/tracking/${record.id}`
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
