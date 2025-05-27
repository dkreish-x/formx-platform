"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Download, Filter, MoreHorizontal, Search } from "lucide-react"

// Sample data
const orders = [
  {
    id: "#ORD-2023-1234",
    customer: "John Smith",
    date: "May 15, 2023",
    service: "Laser Cutting",
    status: "In Production",
    total: "$245.00",
    dueDate: "May 20, 2023",
  },
  {
    id: "#ORD-2023-1233",
    customer: "Sarah Johnson",
    date: "May 14, 2023",
    service: "CNC Milling",
    status: "Pending",
    total: "$520.00",
    dueDate: "May 22, 2023",
  },
  {
    id: "#ORD-2023-1232",
    customer: "Michael Chen",
    date: "May 13, 2023",
    service: "3D Printing",
    status: "Completed",
    total: "$175.00",
    dueDate: "May 18, 2023",
  },
  {
    id: "#ORD-2023-1231",
    customer: "Emily Davis",
    date: "May 12, 2023",
    service: "Sheet Metal",
    status: "Shipped",
    total: "$320.00",
    dueDate: "May 17, 2023",
  },
  {
    id: "#ORD-2023-1230",
    customer: "Robert Wilson",
    date: "May 11, 2023",
    service: "Welding",
    status: "In Production",
    total: "$450.00",
    dueDate: "May 19, 2023",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "Pending":
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      )
    case "In Production":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          In Production
        </Badge>
      )
    case "Shipped":
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
          Shipped
        </Badge>
      )
    case "Completed":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function AdminOrdersTable() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="production">In Production</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="py-3 px-4 text-left font-medium">Order ID</th>
              <th className="py-3 px-4 text-left font-medium">Customer</th>
              <th className="py-3 px-4 text-left font-medium">Date</th>
              <th className="py-3 px-4 text-left font-medium">Service</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-left font-medium">Total</th>
              <th className="py-3 px-4 text-left font-medium">Due Date</th>
              <th className="py-3 px-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-4">{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">{order.date}</td>
                <td className="py-3 px-4">{order.service}</td>
                <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                <td className="py-3 px-4">{order.total}</td>
                <td className="py-3 px-4">{order.dueDate}</td>
                <td className="py-3 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Update Status</DropdownMenuItem>
                      <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                      <DropdownMenuItem>Print Invoice</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>5</strong> of <strong>25</strong> orders
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
