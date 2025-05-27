"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, PlusCircle, Search } from "lucide-react"
import Link from "next/link"

export default function RFQPage() {
  // In a real implementation, these would be fetched from the API
  const rfqs = [
    {
      id: "RFQ-2023-0142",
      customer: "Acme Industries",
      contact: "John Smith",
      date: "2023-05-08",
      status: "New",
      type: "Machined Parts",
      dueDate: "2023-05-15",
    },
    {
      id: "RFQ-2023-0141",
      customer: "TechCorp Solutions",
      contact: "Jane Doe",
      date: "2023-05-07",
      status: "In Progress",
      type: "Additive Manufacturing",
      dueDate: "2023-05-14",
    },
    {
      id: "RFQ-2023-0140",
      customer: "Innovate Engineering",
      contact: "Robert Johnson",
      date: "2023-05-06",
      status: "Quoted",
      type: "Machined Parts",
      dueDate: "2023-05-13",
    },
    {
      id: "RFQ-2023-0139",
      customer: "Global Manufacturing",
      contact: "Sarah Williams",
      date: "2023-05-05",
      status: "Accepted",
      type: "Design Services",
      dueDate: "2023-05-12",
    },
    {
      id: "RFQ-2023-0138",
      customer: "Precision Parts Inc",
      contact: "Michael Brown",
      date: "2023-05-04",
      status: "Declined",
      type: "Machined Parts",
      dueDate: "2023-05-11",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request for Quotes</h1>
          <p className="text-muted-foreground">Manage and track customer RFQs through the quoting process.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search RFQs..."
              className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          <Button size="default" variant="default" className="h-10">
            <Link href="/rfq/new" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              New RFQ
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="p-4">
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search RFQs..." className="flex-1" />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="quoted">Quoted</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="machined">Machined Parts</SelectItem>
                  <SelectItem value="additive">Additive Manufacturing</SelectItem>
                  <SelectItem value="design">Design Services</SelectItem>
                  <SelectItem value="finishing">Finishing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left font-medium p-4">RFQ</th>
                  <th className="text-left font-medium p-4">Customer</th>
                  <th className="text-left font-medium p-4">Type</th>
                  <th className="text-left font-medium p-4">Due Date</th>
                  <th className="text-left font-medium p-4">Status</th>
                  <th className="text-right font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rfqs.map((rfq) => (
                  <tr
                    key={rfq.id}
                    className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                    onClick={() => (window.location.href = `/rfq/${rfq.id}`)}
                  >
                    <td className="p-4">
                      <div className="font-medium">{rfq.id}</div>
                      <div className="text-xs text-muted-foreground">Created: {rfq.date}</div>
                    </td>
                    <td className="p-4">
                      <div>{rfq.customer}</div>
                      <div className="text-xs text-muted-foreground">{rfq.contact}</div>
                    </td>
                    <td className="p-4">{rfq.type}</td>
                    <td className="p-4">{rfq.dueDate}</td>
                    <td className="p-4">
                      <Badge
                        variant={
                          rfq.status === "New"
                            ? "secondary"
                            : rfq.status === "In Progress"
                              ? "warning"
                              : rfq.status === "Quoted"
                                ? "info"
                                : rfq.status === "Accepted"
                                  ? "success"
                                  : "destructive"
                        }
                      >
                        {rfq.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
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
