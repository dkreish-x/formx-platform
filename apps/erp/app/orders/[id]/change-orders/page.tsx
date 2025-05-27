"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ChangeOrdersPage({ params }: { params: { id: string } }) {
  // Mock data for change orders
  const changeOrders = [
    {
      id: "CO-2023-001",
      orderId: params.id,
      requestDate: "2023-06-10",
      requestedBy: "John Smith",
      status: "Approved",
      productionStage: "Pre-Production",
      description: "Change material from Aluminum 6061 to Aluminum 7075",
      impact: "Material cost increase, no production delay",
      additionalCost: "$1,250.00",
      timeImpact: "None",
      approvedBy: "Michael Johnson",
      approvedDate: "2023-06-12",
      priority: "Normal",
    },
    {
      id: "CO-2023-002",
      orderId: params.id,
      requestDate: "2023-06-15",
      requestedBy: "John Smith",
      status: "In Review",
      productionStage: "In Production",
      description: "Modify dimensions on Part A-1042 per updated drawing",
      impact: "Requires re-programming and new material",
      additionalCost: "$3,750.00 (estimated)",
      timeImpact: "3 days",
      approvedBy: "",
      approvedDate: "",
      priority: "High",
    },
    {
      id: "CO-2023-003",
      orderId: params.id,
      requestDate: "2023-06-18",
      requestedBy: "Sarah Johnson",
      status: "Rejected",
      productionStage: "Post-Production",
      description: "Add additional finishing to all parts",
      impact: "Would require complete reprocessing",
      additionalCost: "$5,200.00 (estimated)",
      timeImpact: "7 days",
      approvedBy: "Michael Johnson",
      approvedDate: "2023-06-19",
      priority: "Normal",
      rejectionReason: "Too costly to implement at post-production stage. Recommended as new order.",
    },
    {
      id: "CO-2023-004",
      orderId: params.id,
      requestDate: "2023-06-20",
      requestedBy: "John Smith",
      status: "Pending",
      productionStage: "Pre-Production",
      description: "Increase quantity from 25 to 40 units",
      impact: "Additional material needed, longer production time",
      additionalCost: "$2,800.00 (estimated)",
      timeImpact: "2 days",
      approvedBy: "",
      approvedDate: "",
      priority: "Expedited",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="h-10 w-10 border shadow-sm" asChild>
            <Link href={`/orders/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Change Orders</h1>
            <p className="text-muted-foreground">Manage change requests for Order {params.id}</p>
          </div>
        </div>
        <Button size="default" className="h-10" asChild>
          <Link href={`/orders/${params.id}/change-orders/new`}>
            <Plus className="mr-2 h-4 w-4" />
            New Change Order
          </Link>
        </Button>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Change Order Summary</CardTitle>
          <CardDescription>Overview of all change orders for this order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Change Orders</span>
                  <Badge variant="outline" className="text-base">
                    {changeOrders.length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Approved</span>
                  <Badge variant="success" className="text-base">
                    {changeOrders.filter((co) => co.status === "Approved").length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Pending/In Review</span>
                  <Badge variant="warning" className="text-base">
                    {changeOrders.filter((co) => co.status === "Pending" || co.status === "In Review").length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Additional Cost</span>
                  <Badge variant="outline" className="text-base">
                    $7,800.00
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-review">In Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <Card className="border shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left font-medium p-4">ID</th>
                      <th className="text-left font-medium p-4">Date</th>
                      <th className="text-left font-medium p-4">Description</th>
                      <th className="text-left font-medium p-4">Stage</th>
                      <th className="text-left font-medium p-4">Cost Impact</th>
                      <th className="text-left font-medium p-4">Priority</th>
                      <th className="text-left font-medium p-4">Status</th>
                      <th className="text-right font-medium p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {changeOrders.map((changeOrder) => (
                      <tr
                        key={changeOrder.id}
                        className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                        onClick={() => (window.location.href = `/orders/${params.id}/change-orders/${changeOrder.id}`)}
                      >
                        <td className="p-4 font-medium">{changeOrder.id}</td>
                        <td className="p-4">{changeOrder.requestDate}</td>
                        <td className="p-4 max-w-xs truncate">{changeOrder.description}</td>
                        <td className="p-4">
                          <Badge
                            variant={
                              changeOrder.productionStage === "In Production"
                                ? "destructive"
                                : changeOrder.productionStage === "Pre-Production"
                                  ? "outline"
                                  : "secondary"
                            }
                            className="font-normal"
                          >
                            {changeOrder.productionStage}
                          </Badge>
                        </td>
                        <td className="p-4">{changeOrder.additionalCost}</td>
                        <td className="p-4">
                          <Badge
                            variant={changeOrder.priority === "Expedited" ? "destructive" : "outline"}
                            className="font-normal"
                          >
                            {changeOrder.priority}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <StatusBadge
                            status={
                              changeOrder.status === "Approved"
                                ? "success"
                                : changeOrder.status === "Rejected"
                                  ? "error"
                                  : changeOrder.status === "In Review"
                                    ? "warning"
                                    : "info"
                            }
                          >
                            {changeOrder.status}
                          </StatusBadge>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/orders/${params.id}/change-orders/${changeOrder.id}`}>View</Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="mt-4">
          <Card className="border shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left font-medium p-4">ID</th>
                      <th className="text-left font-medium p-4">Date</th>
                      <th className="text-left font-medium p-4">Description</th>
                      <th className="text-left font-medium p-4">Stage</th>
                      <th className="text-left font-medium p-4">Cost Impact</th>
                      <th className="text-left font-medium p-4">Priority</th>
                      <th className="text-right font-medium p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {changeOrders
                      .filter((co) => co.status === "Pending")
                      .map((changeOrder) => (
                        <tr
                          key={changeOrder.id}
                          className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                          onClick={() =>
                            (window.location.href = `/orders/${params.id}/change-orders/${changeOrder.id}`)
                          }
                        >
                          <td className="p-4 font-medium">{changeOrder.id}</td>
                          <td className="p-4">{changeOrder.requestDate}</td>
                          <td className="p-4 max-w-xs truncate">{changeOrder.description}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                changeOrder.productionStage === "In Production"
                                  ? "destructive"
                                  : changeOrder.productionStage === "Pre-Production"
                                    ? "outline"
                                    : "secondary"
                              }
                              className="font-normal"
                            >
                              {changeOrder.productionStage}
                            </Badge>
                          </td>
                          <td className="p-4">{changeOrder.additionalCost}</td>
                          <td className="p-4">
                            <Badge
                              variant={changeOrder.priority === "Expedited" ? "destructive" : "outline"}
                              className="font-normal"
                            >
                              {changeOrder.priority}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/orders/${params.id}/change-orders/${changeOrder.id}`}>View</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar TabsContent for in-review, approved, and rejected statuses */}
        <TabsContent value="in-review" className="mt-4">
          <Card className="border shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left font-medium p-4">ID</th>
                      <th className="text-left font-medium p-4">Date</th>
                      <th className="text-left font-medium p-4">Description</th>
                      <th className="text-left font-medium p-4">Stage</th>
                      <th className="text-left font-medium p-4">Cost Impact</th>
                      <th className="text-left font-medium p-4">Priority</th>
                      <th className="text-right font-medium p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {changeOrders
                      .filter((co) => co.status === "In Review")
                      .map((changeOrder) => (
                        <tr
                          key={changeOrder.id}
                          className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                          onClick={() =>
                            (window.location.href = `/orders/${params.id}/change-orders/${changeOrder.id}`)
                          }
                        >
                          <td className="p-4 font-medium">{changeOrder.id}</td>
                          <td className="p-4">{changeOrder.requestDate}</td>
                          <td className="p-4 max-w-xs truncate">{changeOrder.description}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                changeOrder.productionStage === "In Production"
                                  ? "destructive"
                                  : changeOrder.productionStage === "Pre-Production"
                                    ? "outline"
                                    : "secondary"
                              }
                              className="font-normal"
                            >
                              {changeOrder.productionStage}
                            </Badge>
                          </td>
                          <td className="p-4">{changeOrder.additionalCost}</td>
                          <td className="p-4">
                            <Badge
                              variant={changeOrder.priority === "Expedited" ? "destructive" : "outline"}
                              className="font-normal"
                            >
                              {changeOrder.priority}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/orders/${params.id}/change-orders/${changeOrder.id}`}>View</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="mt-4">
          <Card className="border shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left font-medium p-4">ID</th>
                      <th className="text-left font-medium p-4">Date</th>
                      <th className="text-left font-medium p-4">Description</th>
                      <th className="text-left font-medium p-4">Stage</th>
                      <th className="text-left font-medium p-4">Cost Impact</th>
                      <th className="text-left font-medium p-4">Priority</th>
                      <th className="text-right font-medium p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {changeOrders
                      .filter((co) => co.status === "Approved")
                      .map((changeOrder) => (
                        <tr
                          key={changeOrder.id}
                          className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                          onClick={() =>
                            (window.location.href = `/orders/${params.id}/change-orders/${changeOrder.id}`)
                          }
                        >
                          <td className="p-4 font-medium">{changeOrder.id}</td>
                          <td className="p-4">{changeOrder.requestDate}</td>
                          <td className="p-4 max-w-xs truncate">{changeOrder.description}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                changeOrder.productionStage === "In Production"
                                  ? "destructive"
                                  : changeOrder.productionStage === "Pre-Production"
                                    ? "outline"
                                    : "secondary"
                              }
                              className="font-normal"
                            >
                              {changeOrder.productionStage}
                            </Badge>
                          </td>
                          <td className="p-4">{changeOrder.additionalCost}</td>
                          <td className="p-4">
                            <Badge
                              variant={changeOrder.priority === "Expedited" ? "destructive" : "outline"}
                              className="font-normal"
                            >
                              {changeOrder.priority}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/orders/${params.id}/change-orders/${changeOrder.id}`}>View</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected" className="mt-4">
          <Card className="border shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left font-medium p-4">ID</th>
                      <th className="text-left font-medium p-4">Date</th>
                      <th className="text-left font-medium p-4">Description</th>
                      <th className="text-left font-medium p-4">Stage</th>
                      <th className="text-left font-medium p-4">Cost Impact</th>
                      <th className="text-left font-medium p-4">Priority</th>
                      <th className="text-right font-medium p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {changeOrders
                      .filter((co) => co.status === "Rejected")
                      .map((changeOrder) => (
                        <tr
                          key={changeOrder.id}
                          className="border-b transition-colors hover:bg-primary/5 cursor-pointer"
                          onClick={() =>
                            (window.location.href = `/orders/${params.id}/change-orders/${changeOrder.id}`)
                          }
                        >
                          <td className="p-4 font-medium">{changeOrder.id}</td>
                          <td className="p-4">{changeOrder.requestDate}</td>
                          <td className="p-4 max-w-xs truncate">{changeOrder.description}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                changeOrder.productionStage === "In Production"
                                  ? "destructive"
                                  : changeOrder.productionStage === "Pre-Production"
                                    ? "outline"
                                    : "secondary"
                              }
                              className="font-normal"
                            >
                              {changeOrder.productionStage}
                            </Badge>
                          </td>
                          <td className="p-4">{changeOrder.additionalCost}</td>
                          <td className="p-4">
                            <Badge
                              variant={changeOrder.priority === "Expedited" ? "destructive" : "outline"}
                              className="font-normal"
                            >
                              {changeOrder.priority}
                            </Badge>
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/orders/${params.id}/change-orders/${changeOrder.id}`}>View</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
