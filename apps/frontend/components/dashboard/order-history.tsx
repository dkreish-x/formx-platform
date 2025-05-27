"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Search, Filter, RefreshCw, RotateCw, ChevronLeft, ChevronRight } from "lucide-react"
import type { Order } from "@/types/dashboard"
import { toast } from "@/components/ui/use-toast"

interface OrderHistoryProps {
  orders: Order[]
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [reorderingId, setReorderingId] = useState<string | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleReorder = async (orderId: string) => {
    setReorderingId(orderId)

    try {
      // In a real app, this would call an API to create a new order based on the existing one
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Reorder initiated",
        description: "Your reorder has been added to your cart.",
      })

      // In a real app, you would redirect to the cart or show a confirmation
    } catch (error) {
      console.error("Error reordering:", error)
      toast({
        title: "Error reordering",
        description: "There was an error processing your reorder. Please try again.",
        variant: "destructive",
      })
    } finally {
      setReorderingId(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between p-4 bg-muted/10">
        <div className="flex w-full max-w-sm items-center space-x-2 relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 border-muted bg-white"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-muted bg-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="border-muted bg-white">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="border-muted bg-white">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-medium mb-1">No orders found</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            We couldn't find any orders matching your search criteria. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/20 border-b border-muted">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Order ID</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Name</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Total</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`border-b border-muted hover:bg-muted/5 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-muted/5"
                  }`}
                >
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{order.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                  <td className="py-3 px-4 font-medium">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-brand-dark-gold hover:text-brand-dark-gold/90 hover:bg-brand-dark-gold/10"
                      >
                        <Link href={`/order/${order.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      {order.status === "Completed" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder(order.id)}
                          disabled={reorderingId === order.id}
                          className="text-brand-dark-gold hover:text-brand-dark-gold/90 hover:bg-brand-dark-gold/10"
                        >
                          <RotateCw className={`h-4 w-4 mr-1 ${reorderingId === order.id ? "animate-spin" : ""}`} />
                          {reorderingId === order.id ? "Reordering..." : "Reorder"}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between p-4 bg-muted/10">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{filteredOrders.length}</strong> of <strong>{orders.length}</strong> orders
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled className="border-muted bg-white">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button variant="outline" size="sm" className="border-muted bg-white">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}
