"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  FileText,
  Download,
  Send,
  CheckCircle,
  XCircle,
  ShoppingCart,
  Clock,
  Calendar,
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  FileSpreadsheet,
  FileImage,
  FileIcon as File3d,
  LinkIcon,
} from "lucide-react"
import { FusionFilesSection } from "@/components/fusion360/fusion-files-section"

// Sample data for the estimate
const estimateData = {
  id: "EST-2023-0042",
  date: "2023-11-15",
  validUntil: "2023-12-15",
  status: "pending", // pending, approved, rejected
  customer: {
    id: "CUST-1234",
    name: "Aerospace Innovations Inc.",
    contact: "Sarah Johnson",
    email: "sjohnson@aerospaceinnovations.com",
    phone: "(555) 123-4567",
    address: "1250 Aviation Way, Seattle, WA 98108",
  },
  project: {
    name: "Satellite Component Manufacturing",
    description: "Production of precision aluminum housings for satellite communication systems",
    targetDate: "2024-02-15",
  },
  lineItems: [
    {
      id: "ITEM-001",
      partNumber: "SC-AL-7075-001",
      description: "Aluminum Housing - Main Enclosure (7075-T6)",
      quantity: 25,
      unit: "ea",
      unitPrice: 1250.0,
      totalPrice: 31250.0,
      leadTime: "3 weeks",
      notes: "Includes precision CNC machining, deburring, and anodizing",
    },
    {
      id: "ITEM-002",
      partNumber: "SC-AL-6061-002",
      description: "Aluminum Mounting Bracket (6061-T6)",
      quantity: 50,
      unit: "ea",
      unitPrice: 175.5,
      totalPrice: 8775.0,
      leadTime: "2 weeks",
      notes: "Includes CNC machining and black anodizing",
    },
    {
      id: "ITEM-003",
      partNumber: "SC-SS-304-003",
      description: "Stainless Steel Fastener Set (304)",
      quantity: 100,
      unit: "set",
      unitPrice: 45.75,
      totalPrice: 4575.0,
      leadTime: "1 week",
      notes: "Custom thread pitch per customer specification",
    },
    {
      id: "ITEM-004",
      partNumber: "SVC-ASSY-001",
      description: "Assembly Service - Level 1",
      quantity: 25,
      unit: "hr",
      unitPrice: 85.0,
      totalPrice: 2125.0,
      leadTime: "N/A",
      notes: "Clean room assembly of components",
    },
  ],
  pricing: {
    subtotal: 46725.0,
    tax: 4672.5,
    shipping: 850.0,
    total: 52247.5,
  },
  terms: {
    payment: "50% deposit upon approval, 50% upon completion",
    delivery: "FOB Origin",
    warranty: "1 year limited warranty on manufacturing defects",
  },
  attachments: [
    { name: "Technical_Specifications.pdf", type: "document", size: "2.4 MB" },
    { name: "Assembly_Drawing.pdf", type: "document", size: "1.8 MB" },
    { name: "Material_Certifications.xlsx", type: "spreadsheet", size: "540 KB" },
    { name: "3D_Model.step", type: "3d", size: "15.2 MB" },
    { name: "Prototype_Photo.jpg", type: "image", size: "3.1 MB" },
  ],
  notes:
    "This estimate includes all materials, labor, and finishing as specified in the RFQ. Material pricing is subject to change based on market conditions at time of order. Expedited production available for an additional fee.",
}

export default function EstimateDetailPage({ params }: { params: { id: string } }) {
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [selectedLineItem, setSelectedLineItem] = useState<string | null>(null)
  const [isFileModalOpen, setIsFileModalOpen] = useState(false)

  // In a real app, you would fetch the estimate data based on the ID
  const estimate = estimateData

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-600">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-600">Rejected</Badge>
      default:
        return <Badge className="bg-yellow-600">Pending</Badge>
    }
  }

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case "spreadsheet":
        return <FileSpreadsheet className="h-4 w-4 mr-2" />
      case "image":
        return <FileImage className="h-4 w-4 mr-2" />
      case "3d":
        return <File3d className="h-4 w-4 mr-2" />
      default:
        return <FileText className="h-4 w-4 mr-2" />
    }
  }

  const openFileModal = (lineItemId: string) => {
    setSelectedLineItem(lineItemId)
    setIsFileModalOpen(true)
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Estimate {estimate.id}</h1>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Created: {estimate.date}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>Valid until: {estimate.validUntil}</span>
            </div>
            {getStatusBadge(estimate.status)}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button variant="default" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Convert to Order
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex items-center">
                <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="font-medium">{estimate.customer.name}</span>
              </div>
              <div className="text-sm text-muted-foreground ml-6">ID: {estimate.customer.id}</div>
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{estimate.customer.contact}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{estimate.customer.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{estimate.customer.phone}</span>
            </div>
            <div className="flex items-start">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
              <span>{estimate.customer.address}</span>
            </div>
          </CardContent>
        </Card>

        {/* Project Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="font-medium">Project Name</div>
              <div>{estimate.project.name}</div>
            </div>
            <div>
              <div className="font-medium">Description</div>
              <div className="text-sm">{estimate.project.description}</div>
            </div>
            <div>
              <div className="font-medium">Target Completion</div>
              <div>{estimate.project.targetDate}</div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pricing Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>
                  $
                  {estimate.pricing.subtotal.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax:</span>
                <span>
                  $
                  {estimate.pricing.tax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping:</span>
                <span>
                  $
                  {estimate.pricing.shipping.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>
                  $
                  {estimate.pricing.total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-[48%]" variant="default">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Approve Estimate</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to approve this estimate? This will notify the vendor and begin the order
                    process.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="default" onClick={() => setIsApproveDialogOpen(false)}>
                    Confirm Approval
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-[48%]" variant="outline">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reject Estimate</DialogTitle>
                  <DialogDescription>Please provide a reason for rejecting this estimate.</DialogDescription>
                </DialogHeader>
                <textarea className="w-full mt-4 p-2 border rounded-md h-24" placeholder="Reason for rejection..." />
                <DialogFooter className="mt-4">
                  <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={() => setIsRejectDialogOpen(false)}>
                    Confirm Rejection
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="line-items" className="w-full">
        <TabsList>
          <TabsTrigger value="line-items">Line Items</TabsTrigger>
          <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="line-items" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part Number</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Lead Time</TableHead>
                    <TableHead className="text-center">CAD Files</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {estimate.lineItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.partNumber}</TableCell>
                      <TableCell>
                        <div>{item.description}</div>
                        <div className="text-xs text-muted-foreground mt-1">{item.notes}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell className="text-right">
                        $
                        {item.unitPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell className="text-right">
                        $
                        {item.totalPrice.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell>{item.leadTime}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openFileModal(item.id)}
                          className="inline-flex items-center"
                        >
                          <LinkIcon className="h-4 w-4 mr-1" />
                          Link CAD
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Payment Terms</h3>
                  <p>{estimate.terms.payment}</p>
                </div>
                <div>
                  <h3 className="font-medium">Delivery Terms</h3>
                  <p>{estimate.terms.delivery}</p>
                </div>
                <div>
                  <h3 className="font-medium">Warranty</h3>
                  <p>{estimate.terms.warranty}</p>
                </div>
                <div>
                  <h3 className="font-medium">Additional Terms</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>All prices are in USD unless otherwise specified</li>
                    <li>This estimate is valid for 30 days from the date of issue</li>
                    <li>Changes to specifications may result in price adjustments</li>
                    <li>Cancellation fees may apply after production has begun</li>
                    <li>All intellectual property rights remain with respective owners</li>
                    <li>Delivery dates are estimates and subject to material availability</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attachments" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {estimate.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      {getAttachmentIcon(attachment.type)}
                      <span>{attachment.name}</span>
                      <span className="ml-2 text-xs text-muted-foreground">({attachment.size})</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Estimate Notes</h3>
                  <p className="mt-2">{estimate.notes}</p>
                </div>
                <div>
                  <h3 className="font-medium">Internal Notes</h3>
                  <div className="p-3 bg-muted rounded-md mt-2">
                    <p className="text-sm">
                      Customer has requested expedited delivery if possible. Consider offering 10% rush fee option in
                      follow-up communication.
                    </p>
                    <p className="text-sm mt-2">
                      Previous orders with this customer have been high quality and paid on time. Potential for repeat
                      business is high.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Fusion 360 File Modal */}
      <Dialog open={isFileModalOpen} onOpenChange={setIsFileModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              Link CAD Files to {estimate.lineItems.find((item) => item.id === selectedLineItem)?.partNumber}
            </DialogTitle>
            <DialogDescription>
              Associate Fusion 360 design files with this specific line item to ensure version control
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <FusionFilesSection lineItemId={selectedLineItem || undefined} />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFileModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
