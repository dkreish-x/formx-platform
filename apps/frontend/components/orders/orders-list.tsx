"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, RotateCw, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Order {
  id: string
  name: string
  date: string
  status: string
  total: number
  dueDate: string
  process: string
  material: string
  quantity: number
  trackingNumber: string | null
}

interface OrdersListProps {
  orders: Order[]
}

export default function OrdersList({ orders }: OrdersListProps) {
  const [reorderingId, setReorderingId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const ordersPerPage = 5
  const totalPages = Math.ceil(orders.length / ordersPerPage)

  const currentOrders = orders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)

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

  const getMaterialImage = (material: string) => {
    const materialMap: Record<string, string> = {
      "Aluminum 6061": "/images/aluminum-texture-detailed.png",
      "Steel 1018": "/images/steel-texture.png",
      ABS: "/images/abs-texture-detailed.png",
      "Copper C110": "/images/copper-texture-detailed.png",
      "Titanium Grade 5": "/images/titanium-texture.png",
      Acrylic: "/acrylic-texture.png",
      "Brass C360": "/images/brass-texture-detailed.png",
      "Stainless Steel 304": "/images/stainless-steel-texture-detailed.png",
      Delrin: "/images/delrin-texture-detailed.png",
    }

    return materialMap[material] || "/material-texture.png"
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

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
          <Eye className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-medium mb-1">No orders found</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          We couldn't find any orders matching your search criteria. Try adjusting your filters.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/20 border-b border-muted">
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Order ID</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Material</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Name</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Process</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
              <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
              <th className="py-3 px-4 text-right font-medium text-muted-foreground">Total</th>
              <th className="py-3 px-4 text-center font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b border-muted hover:bg-muted/5 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-muted/5"
                }`}
              >
                <td className="py-3 px-4 font-medium">{order.id}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="relative w-8 h-8 rounded-md overflow-hidden border border-muted">
                      <Image
                        src={getMaterialImage(order.material) || "/placeholder.svg"}
                        alt={order.material}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs">{order.material}</span>
                  </div>
                </td>
                <td className="py-3 px-4">{order.name}</td>
                <td className="py-3 px-4 text-muted-foreground">{order.process}</td>
                <td className="py-3 px-4 text-muted-foreground">{order.date}</td>
                <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                <td className="py-3 px-4 text-right font-medium">${order.total.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-center space-x-2">
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
                    {order.trackingNumber && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-brand-dark-gold hover:text-brand-dark-gold/90 hover:bg-brand-dark-gold/10"
                      >
                        <a
                          href={`https://www.ups.com/track?tracknum=${order.trackingNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Track
                        </a>
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 bg-muted/10">
          <p className="text-sm text-muted-foreground">
            Showing <strong>{(currentPage - 1) * ordersPerPage + 1}</strong> to{" "}
            <strong>{Math.min(currentPage * ordersPerPage, orders.length)}</strong> of <strong>{orders.length}</strong>{" "}
            orders
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-muted bg-white"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-muted bg-white"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
