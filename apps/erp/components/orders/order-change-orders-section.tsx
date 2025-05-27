"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChangeOrderStageBadge, ChangeOrderPriorityBadge } from "@/components/orders/change-order-status-badge"
import Link from "next/link"
import { FileText, Plus } from "lucide-react"

interface OrderChangeOrdersSectionProps {
  orderId: string
}

export function OrderChangeOrdersSection({ orderId }: OrderChangeOrdersSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Change Orders</CardTitle>
          <CardDescription>Manage change requests for this order</CardDescription>
        </div>
        <Button asChild>
          <Link href={`/orders/${orderId}/change-orders/new`}>
            <Plus className="mr-2 h-4 w-4" />
            New Change Order
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Production Stage</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Requested</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">CO-1001</TableCell>
              <TableCell>
                <ChangeOrderStageBadge stage="In Production" />
              </TableCell>
              <TableCell>
                <ChangeOrderPriorityBadge priority="High" />
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-warning text-warning-foreground">
                  Pending Approval
                </span>
              </TableCell>
              <TableCell>May 10, 2025</TableCell>
              <TableCell>
                <span className="text-destructive font-medium">High</span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/orders/${orderId}/change-orders/CO-1001`}>
                    <FileText className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">CO-1002</TableCell>
              <TableCell>
                <ChangeOrderStageBadge stage="Pre-Production" />
              </TableCell>
              <TableCell>
                <ChangeOrderPriorityBadge priority="Normal" />
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground">
                  Approved
                </span>
              </TableCell>
              <TableCell>May 8, 2025</TableCell>
              <TableCell>
                <span className="text-amber-500 font-medium">Medium</span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/orders/${orderId}/change-orders/CO-1002`}>
                    <FileText className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
