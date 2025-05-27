import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Edit, Download, CheckCircle, AlertCircle, FileText } from "lucide-react"
import AdminRFQNotes from "@/components/admin/admin-rfq-notes"
import AdminRFQPricing from "@/components/admin/admin-rfq-pricing"
import AdminRFQActions from "@/components/admin/admin-rfq-actions"
import { getAdminRFQDetails } from "@/lib/admin"

interface AdminRFQDetailPageProps {
  params: {
    id: string
  }
}

export function generateMetadata({ params }: AdminRFQDetailPageProps): Metadata {
  return {
    title: `RFQ ${params.id} | Admin Dashboard | Form(X)`,
    description: "Review and manage quote request details",
  }
}

export default async function AdminRFQDetailPage({ params }: AdminRFQDetailPageProps) {
  // In a real app, this would fetch data from a database
  const rfq = await getAdminRFQDetails(params.id)

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
    <main className="container py-8">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/admin/rfq">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to RFQ Dashboard
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-brand-dark-grey">RFQ Details: {rfq.id}</h1>
        <div className="ml-4">{getStatusBadge(rfq.status)}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{rfq.partName}</CardTitle>
                  <CardDescription>
                    Submitted by {rfq.customerName} on {rfq.submittedDate}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/rfq/${rfq.id}/edit`}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Configuration
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Part Details</TabsTrigger>
                  <TabsTrigger value="customer">Customer Info</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-brand-dark-grey mb-3">Manufacturing Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Process:</span>
                          <span className="text-brand-dark-grey">{rfq.process}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Material:</span>
                          <span className="text-brand-dark-grey">{rfq.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Finish:</span>
                          <span className="text-brand-dark-grey">{rfq.finish}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Quantity:</span>
                          <span className="text-brand-dark-grey">{rfq.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Tolerance:</span>
                          <span className="text-brand-dark-grey">{rfq.tolerance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Lead Time:</span>
                          <span className="text-brand-dark-grey">{rfq.leadTime}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-brand-dark-grey mb-3">Part Dimensions</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Length:</span>
                          <span className="text-brand-dark-grey">{rfq.dimensions.length} mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Width:</span>
                          <span className="text-brand-dark-grey">{rfq.dimensions.width} mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Height:</span>
                          <span className="text-brand-dark-grey">{rfq.dimensions.height} mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Volume:</span>
                          <span className="text-brand-dark-grey">{rfq.dimensions.volume} cm³</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Weight:</span>
                          <span className="text-brand-dark-grey">{rfq.dimensions.weight} g</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-brand-dark-grey mb-2">Customer Notes</h3>
                    <p className="text-brand-light-grey text-sm p-3 bg-gray-50 rounded-md border">
                      {rfq.customerNotes || "No notes provided by customer."}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="customer">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-brand-dark-grey mb-3">Customer Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Name:</span>
                          <span className="text-brand-dark-grey">{rfq.customerInfo.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Email:</span>
                          <span className="text-brand-dark-grey">{rfq.customerInfo.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Phone:</span>
                          <span className="text-brand-dark-grey">{rfq.customerInfo.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Company:</span>
                          <span className="text-brand-dark-grey">{rfq.customerInfo.company}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Customer Since:</span>
                          <span className="text-brand-dark-grey">{rfq.customerInfo.customerSince}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-brand-dark-grey mb-3">Customer History</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Total Orders:</span>
                          <span className="text-brand-dark-grey">{rfq.customerInfo.totalOrders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Lifetime Value:</span>
                          <span className="text-brand-dark-grey">${rfq.customerInfo.lifetimeValue.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Last Order:</span>
                          <span className="text-brand-dark-grey">{rfq.customerInfo.lastOrderDate || "N/A"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-light-grey">Payment Status:</span>
                          <span className="text-brand-dark-grey">{rfq.customerInfo.paymentStatus}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="files">
                  <div className="space-y-4">
                    <h3 className="font-medium text-brand-dark-grey mb-3">Uploaded Files</h3>

                    {rfq.files.length > 0 ? (
                      <div className="space-y-3">
                        {rfq.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                                <FileText className="h-5 w-5 text-brand-dark-gold" />
                              </div>
                              <div>
                                <p className="font-medium text-brand-dark-grey">{file.name}</p>
                                <p className="text-xs text-brand-light-grey">
                                  {file.size} • Uploaded on {file.uploadDate}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-brand-light-grey text-sm">No files have been uploaded for this RFQ.</p>
                    )}

                    <div className="mt-4">
                      <h3 className="font-medium text-brand-dark-grey mb-3">3D Preview</h3>
                      <div className="aspect-[4/3] w-full border rounded-md overflow-hidden bg-white">
                        <iframe
                          src="https://3dviewer.net/embed.html#model=https://storage.googleapis.com/ucloud-v3/ccab50f18aa14d91ccca300a.stl&camera.theta=0&camera.phi=0&camera.distance=3&backgroundColor=rgba(255,255,255,1)&defaultColor=rgba(212,194,115,1)"
                          className="w-full h-full"
                          title="3D Model Preview"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          frameBorder="0"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <AdminRFQNotes rfqId={rfq.id} initialNotes={rfq.internalNotes} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <AdminRFQPricing
            rfqId={rfq.id}
            initialPricing={{
              materialCost: rfq.pricing.materialCost,
              laborCost: rfq.pricing.laborCost,
              setupCost: rfq.pricing.setupCost,
              finishingCost: rfq.pricing.finishingCost,
              overheadCost: rfq.pricing.overheadCost,
              margin: rfq.pricing.margin,
              discount: rfq.pricing.discount,
              totalCost: rfq.pricing.totalCost,
              suggestedPrice: rfq.pricing.suggestedPrice,
              finalPrice: rfq.pricing.finalPrice,
              isPriceOverridden: rfq.pricing.isPriceOverridden,
            }}
          />

          <AdminRFQActions rfqId={rfq.id} currentStatus={rfq.status} />
        </div>
      </div>
    </main>
  )
}
