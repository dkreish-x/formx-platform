"use client"

import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Truck,
  FileText,
  User,
  Building,
  MapPin,
  CheckCircle,
  Clock,
  Package,
  AlertTriangle,
  BarChart4,
  Download,
  Printer,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { OrderFusionFilesSection } from "@/components/fusion360/order-fusion-files-section"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderChangeOrdersSection } from "@/components/orders/order-change-orders-section"

// Mock data for a single order
const orderData = {
  id: "ORD-2023-042",
  customer: {
    id: "CUST-001",
    name: "Acme Manufacturing",
    address: "123 Industrial Blvd, Tech City, CA 94043",
    contact: "John Smith",
    email: "john.smith@acme.com",
    phone: "(555) 123-4567",
  },
  date: "April 15, 2023",
  status: "Completed",
  statusHistory: [
    { status: "Created", date: "April 10, 2023", completed: true },
    { status: "Processing", date: "April 12, 2023", completed: true },
    { status: "Manufacturing", date: "April 13, 2023", completed: true },
    { status: "Quality Check", date: "April 14, 2023", completed: true },
    { status: "Shipped", date: "April 15, 2023", completed: true },
    { status: "Delivered", date: "April 20, 2023", completed: true },
  ],
  total: "$12,450.00",
  items: [
    {
      id: "ITEM-001",
      name: "Precision Machined Part A-1",
      quantity: 3,
      price: "$1,250.00",
      total: "$3,750.00",
      status: "Completed",
    },
    {
      id: "ITEM-002",
      name: "Custom Bracket Assembly B-2",
      quantity: 5,
      price: "$890.00",
      total: "$4,450.00",
      status: "Completed",
    },
    {
      id: "ITEM-003",
      name: "Specialized Connector C-3",
      quantity: 10,
      price: "$425.00",
      total: "$4,250.00",
      status: "Completed",
    },
  ],
  shipping: {
    method: "Express Freight",
    trackingNumber: "EF-9876543210",
    estimatedDelivery: "April 20, 2023",
    address: "456 Manufacturing Way, Tech City, CA 94043",
    progress: 100,
  },
  payment: {
    method: "Net 30",
    status: "Paid",
    date: "May 15, 2023",
    reference: "INV-2023-042",
  },
  notes:
    "Customer requested special packaging for international shipping. The package contains sensitive electronic components that require anti-static packaging materials. Please ensure all items are properly labeled for customs clearance.",
  priority: "High",
  qualityScore: 98,
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the order data based on params.id
  const order = orderData

  return (
    <div className="space-y-6 p-6 animate-fade-in">
      {/* Header with gradient background */}
      <div className="rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-background p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="rounded-full shadow-sm" asChild>
              <Link href="/orders">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">{order.id}</h1>
                <Badge
                  variant={
                    order.priority === "High" ? "destructive" : order.priority === "Medium" ? "warning" : "secondary"
                  }
                  className="uppercase text-xs"
                >
                  {order.priority}
                </Badge>
              </div>
              <p className="text-muted-foreground">Ordered on {order.date}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="rounded-full shadow-sm gap-1">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full shadow-sm gap-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full shadow-sm gap-1">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full shadow-sm gap-1" asChild>
              <Link href={`/orders/${params.id}/change-orders`} className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Change Orders</span>
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full shadow-sm gap-1">
              <Link href={`/orders/${params.id}/edit`} className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Edit</span>
              </Link>
            </Button>
            <StatusBadge
              status={order.status === "Completed" ? "success" : order.status === "Cancelled" ? "error" : "warning"}
              className="h-9 px-4 shadow-sm"
            >
              {order.status}
            </StatusBadge>
          </div>
        </div>
      </div>

      {/* Progress and Notes - Side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Progress Timeline */}
        <Card className="overflow-hidden border-none shadow-md lg:col-span-2">
          <CardHeader className="bg-primary/5 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-primary" />
              Order Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative">
              {/* Progress line that spans the entire width */}
              <div className="absolute top-4 left-0 right-0 h-1 bg-muted" />

              {/* Completed progress line */}
              <div
                className="absolute top-4 left-0 h-1 bg-primary transition-all duration-300 ease-in-out"
                style={{
                  width: `${
                    (order.statusHistory.filter((step) => step.completed).length / order.statusHistory.length) * 100
                  }%`,
                }}
              />

              {/* Status steps */}
              <div className="grid" style={{ gridTemplateColumns: `repeat(${order.statusHistory.length}, 1fr)` }}>
                {order.statusHistory.map((step, index) => (
                  <div key={index} className="flex flex-col items-center pt-0 px-1">
                    <div
                      className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 z-10 ${
                        step.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.completed ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                    </div>
                    <p className="text-xs font-medium mt-3 text-center">{step.status}</p>
                    <p className="text-xs text-muted-foreground text-center">{step.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes Card */}
        <Card className="overflow-hidden border-none shadow-md lg:col-span-1">
          <CardHeader className="bg-primary/5 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Order Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-muted/20 p-3 rounded-md border border-muted h-[calc(100%-1.5rem)]">
              <p className="text-muted-foreground italic">{order.notes}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer and Shipping - Side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Card */}
        <Card className="overflow-hidden border-none shadow-md">
          <CardHeader className="bg-primary/5 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                  <Building className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Company</p>
                  <Link href={`/customers/${order.customer.id}`} className="text-primary hover:underline">
                    {order.customer.name}
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-muted-foreground">{order.customer.contact}</p>
                  <p className="text-xs text-primary hover:underline cursor-pointer">{order.customer.email}</p>
                  <p className="text-xs text-muted-foreground">{order.customer.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">{order.customer.address}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full rounded-full shadow-sm" asChild>
                <Link href={`/customers/${order.customer.id}`}>View Customer</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Card */}
        <Card className="overflow-hidden border-none shadow-md">
          <CardHeader className="bg-primary/5 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              Shipping Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Shipping Method</p>
                  <p className="text-muted-foreground">{order.shipping.method}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Tracking Number</p>
                  <p className="text-primary hover:underline cursor-pointer">{order.shipping.trackingNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-muted-foreground">{order.shipping.estimatedDelivery}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-2 mt-0.5">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Shipping Address</p>
                  <p className="text-muted-foreground">{order.shipping.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Card - Full width */}
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-primary/5 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="font-medium text-sm">Payment Method</p>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1.5">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <p className="text-muted-foreground">{order.payment.method}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-sm">Status</p>
              <StatusBadge status={order.payment.status === "Paid" ? "success" : "warning"} className="h-7">
                {order.payment.status}
              </StatusBadge>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-sm">Payment Date</p>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1.5">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <p className="text-muted-foreground">{order.payment.date}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium text-sm">Invoice Reference</p>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-1.5">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <p className="text-primary hover:underline cursor-pointer">{order.payment.reference}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items - Full width */}
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-primary/5 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Order Items
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="py-3 px-4 text-left font-medium text-xs uppercase tracking-wider">Item</th>
                  <th className="py-3 px-4 text-center font-medium text-xs uppercase tracking-wider">Quantity</th>
                  <th className="py-3 px-4 text-right font-medium text-xs uppercase tracking-wider">Price</th>
                  <th className="py-3 px-4 text-right font-medium text-xs uppercase tracking-wider">Total</th>
                  <th className="py-3 px-4 text-center font-medium text-xs uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-center font-medium text-xs uppercase tracking-wider">CAD Files</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b transition-colors hover:bg-muted/20 ${
                      index % 2 === 0 ? "bg-background" : "bg-muted/10"
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {item.id}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">{item.quantity}</td>
                    <td className="py-3 px-4 text-right">{item.price}</td>
                    <td className="py-3 px-4 text-right font-medium">{item.total}</td>
                    <td className="py-3 px-4 text-center">
                      <StatusBadge
                        status={item.status === "Completed" ? "success" : "warning"}
                        className="inline-flex h-6 text-xs"
                      >
                        {item.status}
                      </StatusBadge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`#cad-files-${item.id}`}
                          onClick={() =>
                            document.getElementById(`cad-files-${item.id}`)?.scrollIntoView({ behavior: "smooth" })
                          }
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          View Files
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-muted/5">
                  <td colSpan={3} className="py-4 px-4 text-right font-medium">
                    Total
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-lg">{order.total}</td>
                  <td colSpan={2}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <OrderChangeOrdersSection orderId={params.id} />

      {/* Quality Score Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden border-none shadow-md">
          <CardHeader className="bg-primary/5 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              Quality Score
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-primary stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - order.qualityScore / 100)}`}
                    transform="rotate(-90 50 50)"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{order.qualityScore}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg">
                  {order.qualityScore >= 95 ? "Excellent" : order.qualityScore >= 80 ? "Good" : "Needs Improvement"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  This order meets or exceeds all quality requirements and specifications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardHeader className="bg-primary/5 pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              Shipping Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Shipping Status</span>
                <span className="text-sm font-medium">{order.shipping.progress}%</span>
              </div>
              <Progress value={order.shipping.progress} className="h-3" />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">Order Placed</span>
                <span className="text-xs text-muted-foreground">In Transit</span>
                <span className="text-xs text-muted-foreground">Delivered</span>
              </div>
              <div className="flex items-center justify-center mt-4">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  Estimated Delivery: {order.shipping.estimatedDelivery}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CAD Files Section - Full width at bottom */}
      <Card className="overflow-hidden border-none shadow-md">
        <CardHeader className="bg-primary/5 pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            CAD Files
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all-files" className="w-full">
            <TabsList className="w-full grid grid-cols-3 rounded-none border-b">
              <TabsTrigger value="all-files">All Files</TabsTrigger>
              <TabsTrigger value="item-001">Part A-1</TabsTrigger>
              <TabsTrigger value="item-002">Part B-2</TabsTrigger>
            </TabsList>
            <div className="p-4">
              <TabsContent value="all-files" className="mt-0">
                <OrderFusionFilesSection />
              </TabsContent>
              <TabsContent value="item-001" className="mt-0">
                <div id="cad-files-ITEM-001">
                  <OrderFusionFilesSection lineItemId="lineItem1" />
                </div>
              </TabsContent>
              <TabsContent value="item-002" className="mt-0">
                <div id="cad-files-ITEM-002">
                  <OrderFusionFilesSection lineItemId="lineItem2" />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
