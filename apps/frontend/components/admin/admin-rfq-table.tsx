"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Search, Filter, MoreHorizontal, CheckCircle, AlertCircle, FileText } from "lucide-react"
import type { AdminRFQ } from "@/types/admin"
import { toast } from "@/components/ui/use-toast"

interface AdminRFQTableProps {
  rfqs: AdminRFQ[]
  showFilters?: boolean
}

export default function AdminRFQTable({ rfqs, showFilters = false }: AdminRFQTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [processFilter, setProcessFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")

  const handleStatusChange = async (rfqId: string, newStatus: string) => {
    try {
      // In a real app, this would call an API to update the status
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Status updated",
        description: `RFQ ${rfqId} status changed to ${newStatus}`,
      })
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error updating status",
        description: "There was an error updating the status. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Filter and sort the RFQs
  const filteredRFQs = rfqs
    .filter((rfq) => {
      const matchesSearch =
        rfq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rfq.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rfq.customerName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || rfq.status.toLowerCase() === statusFilter.toLowerCase()
      const matchesProcess = processFilter === "all" || rfq.process.toLowerCase() === processFilter.toLowerCase()

      return matchesSearch && matchesStatus && matchesProcess
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc"
          ? new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
          : new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime()
      } else if (sortBy === "cost") {
        return sortOrder === "desc" ? b.estimatedCost - a.estimatedCost : a.estimatedCost - b.estimatedCost
      } else if (sortBy === "name") {
        return sortOrder === "desc" ? b.partName.localeCompare(a.partName) : a.partName.localeCompare(b.partName)
      }
      return 0
    })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Draft":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            <FileText className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        )
      case "Needs Review":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            <AlertCircle className="h-3 w-3 mr-1" />
            Needs Review
          </Badge>
        )
      case "Approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search RFQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <Button type="submit" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="needs review">Needs Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>

            <Select value={processFilter} onValueChange={setProcessFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Process" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Processes</SelectItem>
                <SelectItem value="cnc">CNC Machining</SelectItem>
                <SelectItem value="laser cutting">Laser Cutting</SelectItem>
                <SelectItem value="3d printing">3D Printing</SelectItem>
                <SelectItem value="injection molding">Injection Molding</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {filteredRFQs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-brand-light-grey">No RFQs found matching your criteria.</p>
        </div>
      ) : (
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="py-3 px-4 text-left font-medium">RFQ ID</th>
                <th className="py-3 px-4 text-left font-medium">Part Name</th>
                <th className="py-3 px-4 text-left font-medium">Customer</th>
                <th className="py-3 px-4 text-left font-medium">Process</th>
                <th className="py-3 px-4 text-left font-medium">Submitted</th>
                <th className="py-3 px-4 text-right font-medium">Est. Cost</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRFQs.map((rfq) => (
                <tr key={rfq.id} className="border-t">
                  <td className="py-3 px-4">{rfq.id}</td>
                  <td className="py-3 px-4">{rfq.partName}</td>
                  <td className="py-3 px-4">{rfq.customerName}</td>
                  <td className="py-3 px-4">{rfq.process}</td>
                  <td className="py-3 px-4">{rfq.submittedDate}</td>
                  <td className="py-3 px-4 text-right">${rfq.estimatedCost.toFixed(2)}</td>
                  <td className="py-3 px-4">{getStatusBadge(rfq.status)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/rfq/${rfq.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/rfq/${rfq.id}`}>View Details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/rfq/${rfq.id}/edit`}>Edit Configuration</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(rfq.id, "Draft")}
                            disabled={rfq.status === "Draft"}
                          >
                            Mark as Draft
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(rfq.id, "Needs Review")}
                            disabled={rfq.status === "Needs Review"}
                          >
                            Mark as Needs Review
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(rfq.id, "Approved")}
                            disabled={rfq.status === "Approved"}
                          >
                            Mark as Approved
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{filteredRFQs.length}</strong> of <strong>{rfqs.length}</strong> RFQs
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
