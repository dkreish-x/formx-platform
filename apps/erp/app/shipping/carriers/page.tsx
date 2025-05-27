"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Filter, Plus, Search } from "lucide-react"
import Link from "next/link"

export default function CarriersPage() {
  // Sample data
  const carriers = [
    {
      id: "CAR-001",
      name: "FedEx",
      accountNumber: "FDX-9283746",
      serviceLevel: "Express",
      contactName: "John Smith",
      contactEmail: "john.smith@fedex.com",
      contactPhone: "(555) 123-4567",
      status: "Active",
    },
    {
      id: "CAR-002",
      name: "UPS",
      accountNumber: "UPS-8273645",
      serviceLevel: "Ground",
      contactName: "Jane Doe",
      contactEmail: "jane.doe@ups.com",
      contactPhone: "(555) 234-5678",
      status: "Active",
    },
    {
      id: "CAR-003",
      name: "DHL",
      accountNumber: "DHL-7162534",
      serviceLevel: "International",
      contactName: "Robert Johnson",
      contactEmail: "robert.johnson@dhl.com",
      contactPhone: "(555) 345-6789",
      status: "Active",
    },
    {
      id: "CAR-004",
      name: "USPS",
      accountNumber: "USPS-6051423",
      serviceLevel: "Priority",
      contactName: "Sarah Williams",
      contactEmail: "sarah.williams@usps.com",
      contactPhone: "(555) 456-7890",
      status: "Active",
    },
    {
      id: "CAR-005",
      name: "OnTrac",
      accountNumber: "ONT-5940312",
      serviceLevel: "Standard",
      contactName: "Michael Brown",
      contactEmail: "michael.brown@ontrac.com",
      contactPhone: "(555) 567-8901",
      status: "Inactive",
    },
    {
      id: "CAR-006",
      name: "XPO Logistics",
      accountNumber: "XPO-4839201",
      serviceLevel: "Freight",
      contactName: "Emily Davis",
      contactEmail: "emily.davis@xpo.com",
      contactPhone: "(555) 678-9012",
      status: "Active",
    },
    {
      id: "CAR-007",
      name: "Amazon Logistics",
      accountNumber: "AMZL-3728190",
      serviceLevel: "Prime",
      contactName: "David Wilson",
      contactEmail: "david.wilson@amazon.com",
      contactPhone: "(555) 789-0123",
      status: "Pending",
    },
  ]

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Carriers</h1>
          <p className="text-muted-foreground">Manage shipping carriers and services.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Carrier
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
            <Link href="/shipping/carriers" className="text-sm font-medium border-b-2 border-black pb-1">
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
          <Input placeholder="Search carriers..." className="pl-10" />
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
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Carrier Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Account Number</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Service Level</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contact Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contact Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contact Phone</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody>
                {carriers.map((carrier) => (
                  <tr
                    key={carrier.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => (window.location.href = `/shipping/carriers/${carrier.id}`)}
                  >
                    <td className="px-4 py-3 text-sm font-medium">{carrier.id}</td>
                    <td className="px-4 py-3 text-sm">{carrier.name}</td>
                    <td className="px-4 py-3 text-sm">{carrier.accountNumber}</td>
                    <td className="px-4 py-3 text-sm">{carrier.serviceLevel}</td>
                    <td className="px-4 py-3 text-sm">{carrier.contactName}</td>
                    <td className="px-4 py-3 text-sm">{carrier.contactEmail}</td>
                    <td className="px-4 py-3 text-sm">{carrier.contactPhone}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge
                        variant={
                          carrier.status === "Active"
                            ? "success"
                            : carrier.status === "Inactive"
                              ? "destructive"
                              : "warning"
                        }
                      >
                        {carrier.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = `/shipping/carriers/${carrier.id}`
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
