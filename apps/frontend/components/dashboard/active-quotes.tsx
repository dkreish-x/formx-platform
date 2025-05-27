"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Search, Filter, RefreshCw, CreditCard, ChevronLeft, ChevronRight } from "lucide-react"
import type { Quote } from "@/types/dashboard"

interface ActiveQuotesProps {
  quotes: Quote[]
}

export default function ActiveQuotes({ quotes }: ActiveQuotesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || quote.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Approved
          </Badge>
        )
      case "In Production":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            In Production
          </Badge>
        )
      case "Shipped":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Shipped
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between p-4 bg-muted/10">
        <div className="flex w-full max-w-sm items-center space-x-2 relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quotes..."
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
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="in production">In Production</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
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

      {filteredQuotes.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <h3 className="text-lg font-medium mb-1">No quotes found</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            We couldn't find any quotes matching your search criteria. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/20 border-b border-muted">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Quote ID</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Name</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Total</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotes.map((quote, index) => (
                <tr
                  key={quote.id}
                  className={`border-b border-muted hover:bg-muted/5 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-muted/5"
                  }`}
                >
                  <td className="py-3 px-4 font-medium">{quote.id}</td>
                  <td className="py-3 px-4">{quote.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{quote.date}</td>
                  <td className="py-3 px-4 font-medium">${quote.total.toFixed(2)}</td>
                  <td className="py-3 px-4">{getStatusBadge(quote.status)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-brand-dark-gold hover:text-brand-dark-gold/90 hover:bg-brand-dark-gold/10"
                      >
                        <Link href={`/quote/${quote.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      {quote.status === "Approved" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Link href={`/quote/${quote.id}/payment`}>
                            <CreditCard className="h-4 w-4 mr-1" />
                            Pay
                          </Link>
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
          Showing <strong>{filteredQuotes.length}</strong> of <strong>{quotes.length}</strong> quotes
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
