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
  Edit,
  Send,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Truck,
  Info,
  ShieldCheck,
} from "lucide-react"

interface RFQDetailPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: RFQDetailPageProps): Metadata {
  return {
    title: `RFQ ${params.id} | Form(X)`,
    description: "View and manage your request for quote",
  }
}

// This would be replaced with a real data fetching function in a production app
async function getRFQDetails(id: string) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  return {
    id,
    name: "Prototype Enclosure",
    date: "May 15, 2023",
    status: "In Review",
    parts: [
      {
        id: "PART-001",
        name: "Top Cover",
        process: "CNC Machining",
        material: "Aluminum 6061",
        quantity: 2,
        price: 120.5,
        image: "/images/aluminum-texture-detailed.png",
      },
      {
        id: "PART-002",
        name: "Bottom Panel",
        process: "CNC Machining",
        material: "Aluminum 6061",
        quantity: 2,
        price: 115.75,
        image: "/images/aluminum-texture-detailed.png",
      },
      {
        id: "PART-003",
        name: "Front Panel",
        process: "Laser Cutting",
        material: "Acrylic",
        quantity: 1,
        price: 45.25,
        image: "/images/polycarbonate-texture-detailed.png",
      },
    ],
    notes: "Need these parts for a prototype demonstration. Tight tolerance required for the mounting holes.",
    estimatedTotal: 281.5,
    timeline: [
      {
        status: "RFQ Created",
        date: "May 15, 2023",
        time: "10:30 AM",
        description: "Your RFQ has been created and is ready for submission.",
        completed: true,
      },
      {
        status: "RFQ Submitted",
        date: "May 15, 2023",
        time: "11:45 AM",
        description: "Your RFQ has been submitted for review.",
        completed: true,
      },
      {
        status: "Under Review",
        date: "May 16, 2023",
        time: "9:15 AM",
        description: "Your RFQ is currently being reviewed by our engineering team.",
        completed: true,
      },
      {
        status: "Quote Generation",
        date: "Pending",
        time: "",
        description: "We are preparing a detailed quote based on your requirements.",
        completed: false,
      },
    ],
    accountManager: {
      name: "Sarah Johnson",
      email: "sarah.johnson@formx.com",
      phone: "(555) 123-4567",
      image: "/professional-headshot.png",
    },
    leadTime: "7-10 business days",
    validUntil: "June 15, 2023",
  }
}

export default async function RFQDetailPage({ params }: RFQDetailPageProps) {
  const rfq = await getRFQDetails(params.id)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Draft":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200">
            <FileText className="h-3.5 w-3.5 mr-1.5" />
            Draft
          </Badge>
        )
      case "Submitted":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">
            <Send className="h-3.5 w-3.5 mr-1.5" />
            Submitted
          </Badge>
        )
      case "In Review":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            In Review
          </Badge>
        )
      case "Quoted":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">
            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
            Quoted
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
            <h1 className="text-2xl font-bold text-brand-dark-grey">RFQ {rfq.id}</h1>
            <p className="text-brand-light-grey text-sm">Created on {rfq.date}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Download RFQ
          </Button>
          {rfq.status === "Draft" && (
            <Button className="h-9 bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white">
              <Send className="mr-2 h-4 w-4" />
              Submit RFQ
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
                  <CardTitle className="text-xl text-brand-dark-grey">{rfq.name}</CardTitle>
                  <CardDescription>Project Overview</CardDescription>
                </div>
                {getStatusBadge(rfq.status)}
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
                          <th className="py-3 px-4 text-right font-medium text-brand-dark-grey">Est. Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rfq.parts.map((part, index) => (
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
                            <td className="py-4 px-4 text-right font-medium text-brand-dark-grey">
                              ${part.price.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                <TabsContent value="timeline" className="p-6 m-0 space-y-6">
                  <div className="relative">
                    {rfq.timeline.map((event, index) => (
                      <div key={index} className="mb-8 flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              event.completed ? "bg-brand-light-gold" : "bg-gray-200"
                            }`}
                          >
                            {index === 0 ? (
                              <FileText
                                className={`h-5 w-5 ${event.completed ? "text-brand-dark-gold" : "text-gray-400"}`}
                              />
                            ) : index === 1 ? (
                              <Send
                                className={`h-5 w-5 ${event.completed ? "text-brand-dark-gold" : "text-gray-400"}`}
                              />
                            ) : index === 2 ? (
                              <Clock
                                className={`h-5 w-5 ${event.completed ? "text-brand-dark-gold" : "text-gray-400"}`}
                              />
                            ) : (
                              <CheckCircle
                                className={`h-5 w-5 ${event.completed ? "text-brand-dark-gold" : "text-gray-400"}`}
                              />
                            )}
                          </div>
                          {index < rfq.timeline.length - 1 && (
                            <div
                              className={`h-full w-0.5 ${event.completed ? "bg-brand-light-gold/30" : "bg-gray-200"}`}
                            ></div>
                          )}
                        </div>
                        <div className="pb-8">
                          <div className="flex items-baseline gap-2">
                            <p className="text-sm font-medium text-brand-dark-grey">{event.status}</p>
                            <span className="text-xs text-brand-light-grey">
                              {event.date} {event.time && `at ${event.time}`}
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
                        <p className="text-sm text-amber-700">{rfq.notes}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-brand-dark-grey">Additional Notes</h4>
                    <p className="text-sm text-brand-light-grey">
                      All parts will be manufactured according to the specifications provided in your CAD files. Please
                      review all dimensions and tolerances before approving this RFQ.
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
                          <span className="text-brand-dark-grey font-medium">{rfq.leadTime}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Valid Until:</span>
                          <span className="text-brand-dark-grey font-medium">{rfq.validUntil}</span>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <CardTitle className="text-lg text-brand-dark-grey flex items-center">
                <Info className="h-4 w-4 mr-2 text-brand-dark-gold" />
                3D Model Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="aspect-[4/3] w-full border rounded-md overflow-hidden bg-white">
                <iframe
                  src="https://3dviewer.net/embed.html#model=https://storage.googleapis.com/ucloud-v3/ccab50f18aa14d91ccca300a.stl&camera.theta=0&camera.phi=0&camera.distance=3&backgroundColor=rgba(255,255,255,1)&defaultColor=rgba(212,194,115,1)"
                  className="w-full h-full"
                  title="3D Model Preview"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  frameBorder="0"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <CardTitle className="text-xl text-brand-dark-grey">Quote Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-brand-light-grey">Subtotal</span>
                  <span className="font-medium text-brand-dark-grey">${rfq.estimatedTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-light-grey">Parts</span>
                  <span className="text-brand-dark-grey">{rfq.parts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-light-grey">Estimated Lead Time</span>
                  <span className="text-brand-dark-grey">{rfq.leadTime}</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-brand-dark-grey">Estimated Total</span>
                <span className="text-xl font-bold text-brand-dark-gold">${rfq.estimatedTotal.toFixed(2)}</span>
              </div>

              <div className="text-xs text-brand-light-grey bg-muted/10 p-3 rounded-md border">
                <p className="flex items-start">
                  <AlertCircle className="h-4 w-4 mr-1.5 mt-0.5 text-brand-dark-gold" />
                  This is an estimated price. Final pricing will be provided in the official quote.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-xs text-brand-light-grey mb-2">
                  Quote valid until: <span className="font-medium text-brand-dark-grey">{rfq.validUntil}</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-brand-light-gold/20 to-brand-dark-gold/10 border-b pb-4">
              <CardTitle className="text-xl text-brand-dark-grey">Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              {rfq.status === "Draft" ? (
                <Button className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white h-11">
                  <Send className="mr-2 h-5 w-5" />
                  Submit RFQ
                </Button>
              ) : rfq.status === "Draft" ? (
                <Button className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white h-11">
                  <Edit className="mr-2 h-5 w-5" />
                  Edit RFQ
                </Button>
              ) : null}

              <Button
                variant="outline"
                className="w-full h-11 border-brand-light-grey/30 hover:bg-brand-light-gold/10 hover:text-brand-dark-gold hover:border-brand-light-gold"
              >
                <Download className="mr-2 h-5 w-5" />
                Download RFQ
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
                    {rfq.accountManager.name} is here to help with any questions about your RFQ.
                  </p>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={rfq.accountManager.image || "/placeholder.svg"}
                      alt="Account Manager"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-brand-dark-grey">{rfq.accountManager.name}</p>
                    <p className="text-xs text-brand-light-grey">Account Manager</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full text-sm h-9 justify-start border-brand-light-grey/30"
                    asChild
                  >
                    <Link href={`mailto:${rfq.accountManager.email}`}>
                      <span className="truncate">{rfq.accountManager.email}</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-sm h-9 justify-start border-brand-light-grey/30"
                    asChild
                  >
                    <Link href={`tel:${rfq.accountManager.phone}`}>
                      <span className="truncate">{rfq.accountManager.phone}</span>
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
