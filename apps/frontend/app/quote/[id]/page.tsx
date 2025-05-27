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
  CreditCard,
  CheckCircle,
  Clock,
  Truck,
  FileText,
  ShieldCheck,
  Info,
  AlertCircle,
} from "lucide-react"

interface QuoteDetailPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: QuoteDetailPageProps): Metadata {
  return {
    title: `Quote ${params.id} | Form(X)`,
    description: "View and manage your manufacturing quote",
  }
}

// This would be replaced with a real data fetching function in a production app
async function getQuoteDetails(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    id,
    name: "Aluminum Brackets",
    date: "May 10, 2023",
    status: "Approved",
    parts: [
      {
        id: "PART-001",
        name: "L-Bracket",
        process: "CNC Machining",
        material: "Aluminum 6061",
        quantity: 10,
        unitPrice: 25.5,
        totalPrice: 255.0,
        image: "/images/aluminum-texture-detailed.png",
      },
      {
        id: "PART-002",
        name: "Mounting Plate",
        process: "CNC Machining",
        material: "Aluminum 6061",
        quantity: 5,
        unitPrice: 35.75,
        totalPrice: 178.75,
        image: "/images/aluminum-texture-detailed.png",
      },
      {
        id: "PART-003",
        name: "Spacer",
        process: "CNC Machining",
        material: "Aluminum 6061",
        quantity: 20,
        unitPrice: 0.85,
        totalPrice: 17.0,
        image: "/images/aluminum-texture-detailed.png",
      },
    ],
    subtotal: 450.75,
    tax: 36.06,
    shipping: 25.0,
    total: 511.81,
    leadTime: "7-10 business days",
    validUntil: "June 10, 2023",
    paymentTerms: "Net 30",
    notes: "Quote includes standard packaging. Expedited production available for an additional fee.",
    timeline: [
      { date: "May 10, 2023", event: "Quote Created", description: "Quote #Q-12345 was created and sent for review." },
      { date: "May 11, 2023", event: "Quote Approved", description: "Quote was approved by the customer." },
      { date: "May 12, 2023", event: "Payment Received", description: "Payment of $511.81 was received." },
      { date: "May 13, 2023", event: "Production Started", description: "Manufacturing of parts has begun." },
    ],
  }
}

export default async function QuoteDetailPage({ params }: QuoteDetailPageProps) {
  const quote = await getQuoteDetails(params.id)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50">
            <CheckCircle className="mr-1 h-3 w-3" /> Approved
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
            <h1 className="text-2xl font-bold text-brand-dark-grey">Quote {quote.id}</h1>
            <p className="text-brand-light-grey text-sm">Created on {quote.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          {quote.status === "Approved" && (
            <Button className="h-9 bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white" asChild>
              <Link href={`/quote/${quote.id}/payment`}>
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Payment
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl text-brand-dark-grey">{quote.name}</CardTitle>
                  <CardDescription>Project Overview</CardDescription>
                </div>
                {getStatusBadge(quote.status)}
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
                        {quote.parts.map((part, index) => (
                          <tr key={part.id} className={index % 2 === 0 ? "bg-white" : "bg-muted/10"}>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
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
                    {quote.timeline.map((event, index) => (
                      <div key={index} className="mb-8 flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light-gold">
                            {index === 0 ? (
                              <FileText className="h-5 w-5 text-brand-dark-gold" />
                            ) : index === 1 ? (
                              <CheckCircle className="h-5 w-5 text-brand-dark-gold" />
                            ) : index === 2 ? (
                              <CreditCard className="h-5 w-5 text-brand-dark-gold" />
                            ) : (
                              <Clock className="h-5 w-5 text-brand-dark-gold" />
                            )}
                          </div>
                          {index < quote.timeline.length - 1 && (
                            <div className="h-full w-0.5 bg-brand-light-gold/30"></div>
                          )}
                        </div>
                        <div className="pb-8">
                          <div className="flex items-baseline gap-2">
                            <p className="text-sm font-medium text-brand-dark-grey">{event.event}</p>
                            <span className="text-xs text-brand-light-grey">{event.date}</span>
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
                        <p className="text-sm text-amber-700">{quote.notes}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-brand-dark-grey">Additional Notes</h4>
                    <p className="text-sm text-brand-light-grey">
                      All parts will be manufactured according to the specifications provided in your CAD files. Please
                      review all dimensions and tolerances before approving this quote.
                    </p>
                    <p className="text-sm text-brand-light-grey">
                      Material certifications are available upon request. Additional fees may apply for expedited
                      production or special packaging requirements.
                    </p>
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
                          <span className="text-brand-light-grey">Lead Time:</span>
                          <span className="text-brand-dark-grey font-medium">{quote.leadTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Valid Until:</span>
                          <span className="text-brand-dark-grey font-medium">{quote.validUntil}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Payment Terms:</span>
                          <span className="text-brand-dark-grey font-medium">{quote.paymentTerms}</span>
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
                          <span className="text-brand-light-grey">Estimated Delivery:</span>
                          <span className="text-brand-dark-grey font-medium">7-10 days after production</span>
                        </div>
                        <div className="flex justify-between items-start">
                          <span className="text-brand-light-grey">Shipping Address:</span>
                          <span className="text-brand-dark-grey font-medium text-right">
                            123 Main St, San Francisco, CA
                          </span>
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
              <CardTitle className="text-xl text-brand-dark-grey">Quote Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-light-grey">Subtotal</span>
                  <span className="font-medium text-brand-dark-grey">${quote.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-light-grey">Tax</span>
                  <span className="text-brand-dark-grey">${quote.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-light-grey">Shipping</span>
                  <span className="text-brand-dark-grey">${quote.shipping.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-brand-dark-grey">Total</span>
                <span className="text-xl font-bold text-brand-dark-gold">${quote.total.toFixed(2)}</span>
              </div>

              <div className="bg-muted/20 rounded-lg p-4 text-xs text-brand-light-grey">
                <p>
                  This quote is valid until <span className="font-medium text-brand-dark-grey">{quote.validUntil}</span>
                  . Prices are subject to change after this date.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <CardTitle className="text-xl text-brand-dark-grey">Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              {quote.status === "Approved" ? (
                <Button className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white h-11" asChild>
                  <Link href={`/quote/${quote.id}/payment`}>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Payment
                  </Link>
                </Button>
              ) : quote.status === "In Production" ? (
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white h-11" disabled>
                  <Clock className="mr-2 h-5 w-5" />
                  In Production
                </Button>
              ) : null}

              <Button
                variant="outline"
                className="w-full h-11 border-brand-light-grey/30 hover:bg-brand-light-gold/10 hover:text-brand-dark-gold hover:border-brand-light-gold"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Quote
              </Button>

              <Button
                variant="outline"
                className="w-full h-11 border-brand-light-grey/30 hover:bg-brand-light-gold/10 hover:text-brand-dark-gold hover:border-brand-light-gold"
                asChild
              >
                <Link href="/contact">
                  <Info className="mr-2 h-5 w-5" />
                  Request Changes
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
                    Sarah Johnson is here to help with any questions about your quote.
                  </p>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                    <Image
                      src="/professional-headshot.png"
                      alt="Account Manager"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-brand-dark-grey">Sarah Johnson</p>
                    <p className="text-xs text-brand-light-grey">Account Manager</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full text-sm h-9 justify-start border-brand-light-grey/30"
                    asChild
                  >
                    <Link href="mailto:sarah@formx.com">
                      <span className="truncate">sarah@formx.com</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-sm h-9 justify-start border-brand-light-grey/30"
                    asChild
                  >
                    <Link href="tel:+14155550123">
                      <span className="truncate">(415) 555-0123</span>
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
