import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Download,
  RotateCw,
  Truck,
  Package,
  FileText,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Building2,
  ExternalLink,
  Clock,
  Info,
  ShieldCheck,
} from "lucide-react"
import OrderStatusTracker from "@/components/orders/order-status-tracker"
import { generateMockPartStatus } from "@/lib/manufacturing-stages"

interface OrderDetailPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: OrderDetailPageProps): Metadata {
  return {
    title: `Order ${params.id} | Form(X)`,
    description: "View and manage your manufacturing order",
  }
}

// This would be replaced with a real data fetching function in a production app
async function getOrderDetails(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    id,
    name: "Stainless Steel Brackets",
    date: "April 5, 2023",
    status: "In Production",
    parts: [
      {
        id: "PART-001",
        name: "Corner Bracket",
        process: "Laser Cutting",
        material: "Stainless Steel 304",
        quantity: 8,
        unitPrice: 18.75,
        totalPrice: 150.0,
        image: "/images/stainless-steel-texture-detailed.png",
      },
      {
        id: "PART-002",
        name: "Mounting Bracket",
        process: "Laser Cutting",
        material: "Stainless Steel 304",
        quantity: 4,
        unitPrice: 25.0,
        totalPrice: 100.0,
        image: "/images/stainless-steel-texture-detailed.png",
      },
      {
        id: "PART-003",
        name: "Support Bracket",
        process: "Laser Cutting",
        material: "Stainless Steel 304",
        quantity: 4,
        unitPrice: 25.0,
        totalPrice: 100.0,
        image: "/images/stainless-steel-texture-detailed.png",
      },
    ],
    subtotal: 350.0,
    tax: 28.0,
    shipping: 15.0,
    total: 393.0,
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    shippingAddress: {
      name: "John Smith",
      company: "Acme Inc.",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "USA",
      phone: "(415) 555-1234",
      email: "john@acmeinc.com",
    },
    billingAddress: {
      name: "John Smith",
      company: "Acme Inc.",
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zip: "94103",
      country: "USA",
      phone: "(415) 555-1234",
      email: "john@acmeinc.com",
    },
    paymentMethod: "Credit Card (ending in 4242)",
    deliveryDate: "April 15, 2023",
    accountManager: {
      name: "Sarah Johnson",
      email: "sarah.johnson@formx.com",
      phone: "(415) 555-9876",
      avatar: "/professional-headshot.png",
    },
    timeline: [
      {
        status: "Order Placed",
        date: "April 5, 2023",
        time: "10:30 AM",
        description: "Your order has been received and is being processed.",
      },
      {
        status: "Payment Confirmed",
        date: "April 5, 2023",
        time: "10:35 AM",
        description: "Payment has been successfully processed.",
      },
      {
        status: "Production Started",
        date: "April 6, 2023",
        time: "9:15 AM",
        description: "Your parts are now being manufactured.",
      },
      {
        status: "Quality Control",
        date: "April 9, 2023",
        time: "3:45 PM",
        description: "Your parts have passed our quality control inspection.",
      },
      {
        status: "Order Shipped",
        date: "April 10, 2023",
        time: "2:45 PM",
        description: "Your order has been shipped via UPS.",
      },
      {
        status: "Order Delivered",
        date: "April 15, 2023",
        time: "11:20 AM",
        description: "Your order has been delivered.",
      },
    ],
    notes: "Please handle with care. These brackets are for a critical application.",
  }
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order = await getOrderDetails(params.id)

  // Generate mock part status data for our new status tracker
  const partStatuses = [
    generateMockPartStatus("PART-001", "Corner Bracket", "production_in_progress"),
    generateMockPartStatus("PART-002", "Mounting Bracket", "material_procurement"),
    generateMockPartStatus("PART-003", "Support Bracket", "engineering_review"),
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Processing":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-50">
            <AlertCircle className="mr-1 h-3 w-3" /> Processing
          </Badge>
        )
      case "In Production":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-50">
            <Clock className="mr-1 h-3 w-3" /> In Production
          </Badge>
        )
      case "Shipped":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
            <Truck className="mr-1 h-3 w-3" /> Shipped
          </Badge>
        )
      case "Completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
          </Badge>
        )
      case "Cancelled":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 hover:bg-red-50">
            <AlertCircle className="mr-1 h-3 w-3" /> Cancelled
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <Info className="mr-1 h-3 w-3" /> {status}
          </Badge>
        )
    }
  }

  return (
    <main className="container py-8 px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" asChild className="mr-4 p-0 h-auto">
            <Link
              href="/dashboard"
              className="flex items-center text-brand-dark-grey hover:text-brand-dark-gold transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-brand-dark-grey">Order {order.id}</h1>
            <p className="text-brand-light-grey text-sm">Placed on {order.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
          {order.status === "Shipped" && (
            <Button className="h-9 bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white" asChild>
              <a
                href={`https://www.ups.com/track?tracknum=${order.trackingNumber}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Truck className="mr-2 h-4 w-4" />
                Track Shipment
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Add the new Order Status Tracker component */}
      <div className="mb-6">
        <OrderStatusTracker
          orderId={order.id}
          orderStatus={order.status}
          overallProgress={45}
          parts={partStatuses}
          lastUpdated="May 15, 2023 at 3:45 PM"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-brand-dark-grey">{order.name}</CardTitle>
                  <CardDescription>Order Overview</CardDescription>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="parts" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-12 p-0">
                  <TabsTrigger
                    value="parts"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-dark-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none h-12 px-4"
                  >
                    Parts List
                  </TabsTrigger>
                  <TabsTrigger
                    value="timeline"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-dark-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none h-12 px-4"
                  >
                    Timeline
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-brand-dark-gold data-[state=active]:bg-transparent data-[state=active]:shadow-none h-12 px-4"
                  >
                    Notes
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="parts" className="p-0 m-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/30 border-b">
                          <th className="py-3 px-4 text-left font-medium text-brand-dark-grey">Part</th>
                          <th className="py-3 px-4 text-left font-medium text-brand-dark-grey">Process</th>
                          <th className="py-3 px-4 text-left font-medium text-brand-dark-grey">Material</th>
                          <th className="py-3 px-4 text-center font-medium text-brand-dark-grey">Qty</th>
                          <th className="py-3 px-4 text-right font-medium text-brand-dark-grey">Unit Price</th>
                          <th className="py-3 px-4 text-right font-medium text-brand-dark-grey">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.parts.map((part, index) => (
                          <tr key={part.id} className={index % 2 === 0 ? "bg-white" : "bg-muted/10"}>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0 border">
                                  <Image
                                    src={part.image || "/placeholder.svg"}
                                    alt={part.material}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium text-brand-dark-grey">{part.name}</div>
                                  <div className="text-xs text-brand-light-grey">{part.id}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-brand-dark-grey">{part.process}</td>
                            <td className="py-4 px-4 text-brand-dark-grey">{part.material}</td>
                            <td className="py-4 px-4 text-center text-brand-dark-grey">{part.quantity}</td>
                            <td className="py-4 px-4 text-right text-brand-dark-grey">${part.unitPrice.toFixed(2)}</td>
                            <td className="py-4 px-4 text-right font-medium text-brand-dark-grey">
                              ${part.totalPrice.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent value="timeline" className="p-6 m-0 space-y-6">
                  <div className="relative">
                    {order.timeline.map((event, index) => (
                      <div key={index} className="mb-8 flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light-gold">
                            {index === 0 ? (
                              <FileText className="h-5 w-5 text-brand-dark-gold" />
                            ) : index === 1 ? (
                              <CreditCard className="h-5 w-5 text-brand-dark-gold" />
                            ) : index === 2 ? (
                              <Package className="h-5 w-5 text-brand-dark-gold" />
                            ) : index === 3 ? (
                              <CheckCircle2 className="h-5 w-5 text-brand-dark-gold" />
                            ) : index === 4 ? (
                              <Truck className="h-5 w-5 text-brand-dark-gold" />
                            ) : (
                              <CheckCircle2 className="h-5 w-5 text-brand-dark-gold" />
                            )}
                          </div>
                          {index < order.timeline.length - 1 && (
                            <div className="h-full w-0.5 bg-brand-light-gold/30"></div>
                          )}
                        </div>
                        <div className="pb-8">
                          <div className="flex items-baseline gap-2">
                            <p className="text-sm font-medium text-brand-dark-grey">{event.status}</p>
                            <span className="text-xs text-brand-light-grey">
                              {event.date} at {event.time}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-brand-light-grey">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="notes" className="p-6 m-0">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800 mb-1">Important Information</h4>
                        <p className="text-sm text-amber-700">{order.notes}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-brand-dark-grey">Shipping Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-brand-dark-grey mb-3 flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-brand-dark-gold" />
                          Shipping Address
                        </h3>
                        <div className="rounded-lg border p-4">
                          <div className="space-y-2 text-sm">
                            <p className="font-medium">{order.shippingAddress.name}</p>
                            {order.shippingAddress.company && (
                              <p className="flex items-center text-brand-light-grey">
                                <Building2 className="h-3 w-3 mr-1" />
                                {order.shippingAddress.company}
                              </p>
                            )}
                            <p>{order.shippingAddress.street}</p>
                            <p>
                              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                            </p>
                            <p>{order.shippingAddress.country}</p>
                            {order.trackingNumber && (
                              <div className="pt-2 mt-2 border-t">
                                <p className="font-medium">Tracking Number:</p>
                                <p className="text-brand-dark-gold flex items-center">
                                  {order.trackingNumber}
                                  <ExternalLink className="h-3 w-3 ml-1 inline-block" />
                                </p>
                                <p className="text-xs text-brand-light-grey">Carrier: {order.carrier}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium text-brand-dark-grey mb-3 flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-brand-dark-gold" />
                          Billing Information
                        </h3>
                        <div className="rounded-lg border p-4">
                          <div className="space-y-2 text-sm">
                            <p className="font-medium">{order.billingAddress.name}</p>
                            {order.billingAddress.company && (
                              <p className="flex items-center text-brand-light-grey">
                                <Building2 className="h-3 w-3 mr-1" />
                                {order.billingAddress.company}
                              </p>
                            )}
                            <p>{order.billingAddress.street}</p>
                            <p>
                              {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}
                            </p>
                            <p>{order.billingAddress.country}</p>
                            <div className="pt-2 mt-2 border-t">
                              <p className="font-medium">Payment Method:</p>
                              <p className="flex items-center">
                                <CreditCard className="h-3 w-3 mr-1 text-brand-light-grey" />
                                {order.paymentMethod}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <CardTitle className="text-xl text-brand-dark-grey">Production Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-8 w-8 rounded-full bg-brand-light-gold/20 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-brand-dark-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-brand-dark-grey">Production Timeline</h3>
                      <div className="mt-1 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Order Date:</span>
                          <span className="text-brand-dark-grey font-medium">{order.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Delivery Date:</span>
                          <span className="text-brand-dark-grey font-medium">{order.deliveryDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Status:</span>
                          <span className="text-brand-dark-grey font-medium">{order.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-8 w-8 rounded-full bg-brand-light-gold/20 flex items-center justify-center">
                      <Truck className="h-4 w-4 text-brand-dark-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium text-brand-dark-grey">Shipping Information</h3>
                      <div className="mt-1 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Shipping Method:</span>
                          <span className="text-brand-dark-grey font-medium">Standard Ground</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Carrier:</span>
                          <span className="text-brand-dark-grey font-medium">{order.carrier}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Tracking Number:</span>
                          <span className="text-brand-dark-grey font-medium">{order.trackingNumber}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <CardTitle className="text-xl text-brand-dark-grey">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-light-grey">Subtotal</span>
                  <span className="font-medium text-brand-dark-grey">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-light-grey">Tax</span>
                  <span className="text-brand-dark-grey">${order.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-light-grey">Shipping</span>
                  <span className="text-brand-dark-grey">${order.shipping.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-brand-dark-grey">Total</span>
                <span className="text-xl font-bold text-brand-dark-gold">${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <CardTitle className="text-xl text-brand-dark-grey">Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              {order.status === "Shipped" ? (
                <Button className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white h-11" asChild>
                  <a
                    href={`https://www.ups.com/track?tracknum=${order.trackingNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Truck className="mr-2 h-5 w-5" />
                    Track Shipment
                  </a>
                </Button>
              ) : order.status === "Completed" ? (
                <Button className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white h-11">
                  <RotateCw className="mr-2 h-5 w-5" />
                  Reorder
                </Button>
              ) : null}

              <Button
                variant="outline"
                className="w-full h-11 border-brand-light-grey/30 hover:bg-brand-light-gold/10 hover:text-brand-dark-gold hover:border-brand-light-gold"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Invoice
              </Button>

              <Button
                variant="outline"
                className="w-full h-11 border-brand-light-grey/30 hover:bg-brand-light-gold/10 hover:text-brand-dark-gold hover:border-brand-light-gold"
                asChild
              >
                <Link href="/contact">
                  <Info className="mr-2 h-5 w-5" />
                  Request Support
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <CardTitle className="text-xl text-brand-dark-grey">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="mt-0.5 h-8 w-8 rounded-full bg-brand-light-gold/20 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-brand-dark-gold" />
                </div>
                <div>
                  <h3 className="font-medium text-brand-dark-grey">Your Dedicated Account Manager</h3>
                  <p className="text-sm text-brand-light-grey mt-1">
                    {order.accountManager.name} is here to help with any questions about your order.
                  </p>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={order.accountManager.avatar || "/placeholder.svg"}
                      alt="Account Manager"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-brand-dark-grey">{order.accountManager.name}</p>
                    <p className="text-xs text-brand-light-grey">Account Manager</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full text-sm h-9 justify-start border-brand-light-grey/30"
                    asChild
                  >
                    <Link href={`mailto:${order.accountManager.email}`}>
                      <span className="truncate">{order.accountManager.email}</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-sm h-9 justify-start border-brand-light-grey/30"
                    asChild
                  >
                    <Link href={`tel:${order.accountManager.phone}`}>
                      <span className="truncate">{order.accountManager.phone}</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
