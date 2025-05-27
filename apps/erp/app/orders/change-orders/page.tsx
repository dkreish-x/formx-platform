import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChangeOrderStageBadge, ChangeOrderPriorityBadge } from "@/components/orders/change-order-status-badge"
import Link from "next/link"
import { FileText, Filter, Plus, Search } from "lucide-react"

export default function ChangeOrdersPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Change Orders</h1>
          <p className="text-muted-foreground">Manage customer change requests across all orders</p>
        </div>
        <Button asChild>
          <Link href="/orders/change-orders/new">
            <Plus className="mr-2 h-4 w-4" />
            New Change Order
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search change orders..." className="w-full bg-background pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>All Change Orders</CardTitle>
              <CardDescription>Showing all change orders across all production stages</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
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
                    <TableCell>ORD-5782</TableCell>
                    <TableCell>Acme Industries</TableCell>
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
                        <Link href="/orders/1234/change-orders/CO-1001">
                          <FileText className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CO-1002</TableCell>
                    <TableCell>ORD-5790</TableCell>
                    <TableCell>TechCorp Solutions</TableCell>
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
                        <Link href="/orders/1235/change-orders/CO-1002">
                          <FileText className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">CO-1003</TableCell>
                    <TableCell>ORD-5801</TableCell>
                    <TableCell>Precision Manufacturing</TableCell>
                    <TableCell>
                      <ChangeOrderStageBadge stage="Post-Production" />
                    </TableCell>
                    <TableCell>
                      <ChangeOrderPriorityBadge priority="Expedited" />
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-destructive text-destructive-foreground">
                        Rejected
                      </span>
                    </TableCell>
                    <TableCell>May 11, 2025</TableCell>
                    <TableCell>
                      <span className="text-destructive font-medium">Critical</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/orders/1236/change-orders/CO-1003">
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
        </TabsContent>
        <TabsContent value="pending" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Change Orders</CardTitle>
              <CardDescription>Change orders awaiting review and approval</CardDescription>
            </CardHeader>
            <CardContent>{/* Similar table structure with filtered data */}</CardContent>
          </Card>
        </TabsContent>
        {/* Other tab contents would follow the same pattern */}
      </Tabs>
    </div>
  )
}
