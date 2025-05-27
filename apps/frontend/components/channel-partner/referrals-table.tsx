"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface ReferralsTableProps {
  partnerCode?: string
}

// Mock referral data
const mockReferrals = [
  {
    id: "ref-001",
    customerName: "Acme Industries",
    status: "Quoting",
    dateSubmitted: "2023-05-15T10:30:00Z",
    jobTotal: null,
    commissionEarned: null,
    commissionPaid: false,
  },
  {
    id: "ref-002",
    customerName: "TechCorp Solutions",
    status: "Won",
    dateSubmitted: "2023-04-22T14:15:00Z",
    jobTotal: 12500,
    commissionEarned: 1500,
    commissionPaid: true,
  },
  {
    id: "ref-003",
    customerName: "Global Manufacturing",
    status: "Lost",
    dateSubmitted: "2023-03-10T09:45:00Z",
    jobTotal: null,
    commissionEarned: null,
    commissionPaid: false,
  },
  {
    id: "ref-004",
    customerName: "Precision Parts Inc",
    status: "Won",
    dateSubmitted: "2023-02-28T11:20:00Z",
    jobTotal: 8750,
    commissionEarned: 1050,
    commissionPaid: true,
  },
  {
    id: "ref-005",
    customerName: "Innovative Designs",
    status: "Submitted",
    dateSubmitted: "2023-06-01T15:45:00Z",
    jobTotal: null,
    commissionEarned: null,
    commissionPaid: false,
  },
]

export function ReferralsTable({ partnerCode }: ReferralsTableProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [referrals, setReferrals] = useState<any[]>([])
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    // In a real app, this would fetch from your API
    const fetchReferrals = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setReferrals(mockReferrals)
      } catch (error) {
        console.error("Error fetching referrals:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReferrals()
  }, [partnerCode])

  const filteredReferrals =
    statusFilter === "all"
      ? referrals
      : referrals.filter((referral) => referral.status.toLowerCase() === statusFilter.toLowerCase())

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "quoting":
        return "bg-purple-100 text-purple-800"
      case "won":
        return "bg-green-100 text-green-800"
      case "lost":
        return "bg-red-100 text-red-800"
      case "paid":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="status-filter" className="whitespace-nowrap">
          Filter by Status:
        </Label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger id="status-filter" className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="quoting">Quoting</SelectItem>
            <SelectItem value="won">Won</SelectItem>
            <SelectItem value="lost">Lost</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredReferrals.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-gray-50">
          <p className="text-muted-foreground">No referrals found with the selected status.</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Job Total</TableHead>
                <TableHead>Commission</TableHead>
                <TableHead>Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReferrals.map((referral) => (
                <TableRow key={referral.id}>
                  <TableCell className="font-medium">{referral.customerName}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(referral.status)}>{referral.status}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(referral.dateSubmitted)}</TableCell>
                  <TableCell>{referral.jobTotal ? formatCurrency(referral.jobTotal) : "—"}</TableCell>
                  <TableCell>{referral.commissionEarned ? formatCurrency(referral.commissionEarned) : "—"}</TableCell>
                  <TableCell>
                    {referral.commissionPaid ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                        No
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
