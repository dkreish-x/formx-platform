"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, ShoppingCart, RefreshCw } from "lucide-react"

interface Quote {
  id: string
  name: string
  date: string
  status: string
  total: number
  validUntil: string
  process: string
  material: string
  quantity: number
  leadTime: string
}

interface QuotesListProps {
  quotes: Quote[]
}

export default function QuotesList({ quotes }: QuotesListProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Approved
          </Badge>
        )
      case "Pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "Under Review":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Under Review
          </Badge>
        )
      case "Expired":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Expired
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (quotes.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
          <Eye className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-medium mb-1">No quotes found</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          No quotes match your current filters. Try adjusting your search criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/20 border-b border-muted">
            <th className="py-3 px-6 text-left font-medium text-muted-foreground">Quote ID</th>
            <th className="py-3 px-6 text-left font-medium text-muted-foreground">Part Name</th>
            <th className="py-3 px-6 text-left font-medium text-muted-foreground">Process</th>
            <th className="py-3 px-6 text-left font-medium text-muted-foreground">Material</th>
            <th className="py-3 px-6 text-left font-medium text-muted-foreground">Quantity</th>
            <th className="py-3 px-6 text-left font-medium text-muted-foreground">Total</th>
            <th className="py-3 px-6 text-left font-medium text-muted-foreground">Status</th>
            <th className="py-3 px-6 text-left font-medium text-muted-foreground">Valid Until</th>
            <th className="py-3 px-6 text-left font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote, index) => (
            <tr
              key={quote.id}
              className={`border-b border-muted hover:bg-muted/5 transition-colors ${
                index % 2 === 0 ? "bg-white" : "bg-muted/5"
              }`}
            >
              <td className="py-4 px-6 font-medium">{quote.id}</td>
              <td className="py-4 px-6">{quote.name}</td>
              <td className="py-4 px-6 text-muted-foreground">{quote.process}</td>
              <td className="py-4 px-6 text-muted-foreground">{quote.material}</td>
              <td className="py-4 px-6 text-muted-foreground">{quote.quantity}</td>
              <td className="py-4 px-6 font-medium">${quote.total.toLocaleString()}</td>
              <td className="py-4 px-6">{getStatusBadge(quote.status)}</td>
              <td className="py-4 px-6 text-muted-foreground">{new Date(quote.validUntil).toLocaleDateString()}</td>
              <td className="py-4 px-6">
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-brand-dark-gold hover:text-brand-dark-gold/90 hover:bg-brand-dark-gold/10"
                  >
                    <Link href={`/quotes/${quote.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                  {quote.status === "Approved" && (
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Order
                    </Button>
                  )}
                  {quote.status === "Expired" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-brand-dark-gold hover:text-brand-dark-gold/90 hover:bg-brand-dark-gold/10"
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Renew
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
