"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PlusCircle, Search, Eye } from "lucide-react"

// Mock data for estimates
const estimates = [
  {
    id: "EST-2023-042",
    customer: "Acme Manufacturing",
    contact: "John Smith",
    date: "2023-05-10",
    expiryDate: "2023-06-10",
    status: "Sent",
    total: "$12,450.00",
  },
  {
    id: "EST-2023-041",
    customer: "TechPro Industries",
    contact: "Sarah Johnson",
    date: "2023-05-08",
    expiryDate: "2023-06-08",
    status: "Draft",
    total: "$8,975.00",
  },
  {
    id: "EST-2023-040",
    customer: "Global Fabrication",
    contact: "Michael Chen",
    date: "2023-05-05",
    expiryDate: "2023-06-05",
    status: "Accepted",
    total: "$15,320.00",
  },
  {
    id: "EST-2023-039",
    customer: "Precision Engineering",
    contact: "Lisa Rodriguez",
    date: "2023-05-03",
    expiryDate: "2023-06-03",
    status: "Rejected",
    total: "$9,840.00",
  },
  {
    id: "EST-2023-038",
    customer: "Innovative Metals",
    contact: "David Wilson",
    date: "2023-04-28",
    expiryDate: "2023-05-28",
    status: "Expired",
    total: "$7,650.00",
  },
]

export default function EstimatesPage() {
  const router = useRouter()

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estimates</h1>
          <p className="text-muted-foreground">Manage customer estimates and quotes</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search estimates..."
              className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Button size="default" variant="default" className="h-10">
            <Link href="/estimates/new" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Estimate
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
                  <th className="text-left font-medium p-4">Estimate #</th>
                  <th className="text-left font-medium p-4">Customer</th>
                  <th className="text-left font-medium p-4">Date</th>
                  <th className="text-left font-medium p-4">Expiry</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-left font-medium p-4">Total</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {estimates.map((estimate) => (
                  <tr
                    key={estimate.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => router.push(`/estimates/${estimate.id}`)}
                  >
                    <td className="p-4">{estimate.id}</td>
                    <td className="p-4">
                      <div className="font-medium">{estimate.customer}</div>
                      <div className="text-xs text-muted-foreground">{estimate.contact}</div>
                    </td>
                    <td className="p-4">{estimate.date}</td>
                    <td className="p-4">{estimate.expiryDate}</td>
                    <td className="p-4">
                      <StatusBadge
                        status={
                          estimate.status === "Accepted"
                            ? "success"
                            : estimate.status === "Rejected" || estimate.status === "Expired"
                              ? "error"
                              : estimate.status === "Sent"
                                ? "warning"
                                : "info"
                        }
                      >
                        {estimate.status}
                      </StatusBadge>
                    </td>
                    <td className="p-4">{estimate.total}</td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/estimates/${estimate.id}`)
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
