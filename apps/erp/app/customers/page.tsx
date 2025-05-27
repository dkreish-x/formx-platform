"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { PlusCircle, Search, Eye } from "lucide-react"

// Mock data for customers
const customers = [
  {
    id: "CUST-001",
    name: "Acme Manufacturing",
    contact: "John Smith",
    email: "john@acmemfg.com",
    phone: "(555) 123-4567",
    status: "Active",
    lastOrder: "2023-04-15",
    totalOrders: 24,
    totalValue: "$156,789.00",
  },
  {
    id: "CUST-002",
    name: "TechPro Industries",
    contact: "Sarah Johnson",
    email: "sarah@techpro.com",
    phone: "(555) 234-5678",
    status: "Active",
    lastOrder: "2023-05-02",
    totalOrders: 18,
    totalValue: "$98,432.00",
  },
  {
    id: "CUST-003",
    name: "Global Fabrication",
    contact: "Michael Chen",
    email: "michael@globalfab.com",
    phone: "(555) 345-6789",
    status: "Inactive",
    lastOrder: "2022-11-20",
    totalOrders: 7,
    totalValue: "$45,210.00",
  },
  {
    id: "CUST-004",
    name: "Precision Engineering",
    contact: "Lisa Rodriguez",
    email: "lisa@precision-eng.com",
    phone: "(555) 456-7890",
    status: "Active",
    lastOrder: "2023-04-28",
    totalOrders: 31,
    totalValue: "$203,567.00",
  },
  {
    id: "CUST-005",
    name: "Innovative Metals",
    contact: "David Wilson",
    email: "david@innovativemetals.com",
    phone: "(555) 567-8901",
    status: "Active",
    lastOrder: "2023-05-10",
    totalOrders: 12,
    totalValue: "$78,950.00",
  },
]

export default function CustomersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search customers..."
              className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Button size="default" variant="default" className="h-10">
            <Link href="/customers/new" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Customer
            </Link>
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
                  <th className="text-left font-medium p-4">Customer</th>
                  <th className="text-left font-medium p-4">Contact</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-left font-medium p-4">Last Order</th>
                  <th className="text-left font-medium p-4">Total Orders</th>
                  <th className="text-left font-medium p-4">Total Value</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => (window.location.href = `/customers/${customer.id}`)}
                  >
                    <td className="p-4">{customer.id}</td>
                    <td className="p-4">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-muted-foreground">{customer.email}</div>
                    </td>
                    <td className="p-4">
                      <div>{customer.contact}</div>
                      <div className="text-xs text-muted-foreground">{customer.phone}</div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={customer.status === "Active" ? "success" : "warning"}>
                        {customer.status}
                      </StatusBadge>
                    </td>
                    <td className="p-4">{customer.lastOrder}</td>
                    <td className="p-4">{customer.totalOrders}</td>
                    <td className="p-4">{customer.totalValue}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
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
                      </div>
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
