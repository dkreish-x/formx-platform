import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import {
  ArrowLeft,
  Building,
  Mail,
  Phone,
  User,
  Edit,
  FileText,
  Clock,
  DollarSign,
  Users,
  AlertCircle,
  Download,
  Printer,
  Package,
  Clipboard,
  Send,
  CheckSquare,
  XSquare,
} from "lucide-react"

// Mock data for a single RFQ
const rfq = {
  id: "RFQ-2023-052",
  customer: {
    id: "CUST-001",
    name: "Acme Manufacturing",
    contact: "John Smith",
    email: "john@acmemfg.com",
    phone: "(555) 123-4567",
  },
  status: "Pending",
  createdDate: "2023-05-10",
  expiryDate: "2023-06-10",
  totalAmount: "$18,750.00",
  items: [
    {
      id: "ITEM-001",
      name: "Custom Bracket Assembly",
      description: "Aluminum 6061-T6, Black Anodize Type II",
      quantity: 25,
      unitPrice: "$450.00",
      totalPrice: "$11,250.00",
    },
    {
      id: "ITEM-002",
      name: "Mounting Plate",
      description: "Stainless Steel 304, #4 Finish",
      quantity: 25,
      unitPrice: "$300.00",
      totalPrice: "$7,500.00",
    },
  ],
  notes: "Customer requires certification of material. Special packaging instructions included.",
  internalNotes: "This is a repeat customer with good payment history. Expedite if possible.",
  assignedTo: "Jane Doe",
  priority: "High",
  leadTime: "3-4 weeks",
  shippingMethod: "Ground",
  paymentTerms: "Net 30",
  documents: [
    { name: "RFQ_Requirements.pdf", type: "Document", date: "2023-05-10" },
    { name: "Technical_Specifications.pdf", type: "Document", date: "2023-05-10" },
    { name: "Previous_Quote.pdf", type: "Document", date: "2023-05-10" },
  ],
  history: [
    {
      date: "2023-05-10",
      user: "Mike Wilson",
      action: "Created RFQ",
      notes: "Initial RFQ created based on customer email",
    },
    {
      date: "2023-05-10",
      user: "Mike Wilson",
      action: "Assigned to Jane Doe",
      notes: "Assigned for review and pricing",
    },
    {
      date: "2023-05-11",
      user: "Jane Doe",
      action: "Updated pricing",
      notes: "Added pricing based on current material costs",
    },
  ],
}

export default function RfqDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 p-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border shadow-sm">
              <Link href="/rfq">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Quote {params.id}</h1>
                <StatusBadge
                  status={rfq.status === "Accepted" ? "success" : rfq.status === "Rejected" ? "error" : "warning"}
                  className="ml-2"
                >
                  {rfq.status}
                </StatusBadge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <span>Customer: {rfq.customer.name}</span>
                <span className="text-xs">•</span>
                <span>Created: {rfq.createdDate}</span>
                <span className="text-xs">•</span>
                <span>Expires: {rfq.expiryDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full shadow-sm gap-1">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full shadow-sm gap-1">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full shadow-sm gap-1" asChild>
              <Link href={`/rfq/${params.id}/edit`}>
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Link>
            </Button>
            <Button size="sm" className="rounded-full shadow-sm gap-1">
              <Send className="h-4 w-4" />
              <span>Send to Customer</span>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-2xl font-bold">{rfq.totalAmount}</div>
              </div>
            </div>
          </div>
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Items</div>
                <div className="text-2xl font-bold">{rfq.items.length}</div>
              </div>
            </div>
          </div>
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Lead Time</div>
                <div className="text-2xl font-bold">{rfq.leadTime}</div>
              </div>
            </div>
          </div>
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Priority</div>
                <div className="text-2xl font-bold">{rfq.priority}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Information Card */}
        <Card className="md:col-span-1 border shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="p-4 bg-background hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Company</div>
                    <div className="font-semibold">{rfq.customer.name}</div>
                    <Button variant="link" size="sm" className="px-0 h-6" asChild>
                      <Link href={`/customers/${rfq.customer.id}`}>View Customer</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Contact</div>
                    <div className="font-semibold">{rfq.customer.contact}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Email</div>
                    <div className="font-semibold">{rfq.customer.email}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Phone</div>
                    <div className="font-semibold">{rfq.customer.phone}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Assigned To</div>
                    <div className="font-semibold">{rfq.assignedTo}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Payment Terms</div>
                    <div className="font-semibold">{rfq.paymentTerms}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quote Details */}
        <Card className="md:col-span-2 border shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/50">
            <CardTitle className="flex items-center gap-2">
              <Clipboard className="h-5 w-5 text-muted-foreground" />
              Quote Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-4">Items</h3>
              <div className="overflow-x-auto rounded-lg border shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Item</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Description</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Quantity</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Unit Price</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rfq.items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b transition-colors hover:bg-primary/5 ${
                          index % 2 === 0 ? "bg-background" : "bg-muted/10"
                        }`}
                      >
                        <td className="py-3 px-4 font-medium">{item.name}</td>
                        <td className="py-3 px-4">{item.description}</td>
                        <td className="py-3 px-4">{item.quantity}</td>
                        <td className="py-3 px-4">{item.unitPrice}</td>
                        <td className="py-3 px-4 font-medium">{item.totalPrice}</td>
                      </tr>
                    ))}
                    <tr className="bg-muted/20">
                      <td colSpan={4} className="py-3 px-4 text-right font-medium">
                        Total:
                      </td>
                      <td className="py-3 px-4 font-bold">{rfq.totalAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Customer Notes</h4>
                  <div className="border rounded-lg p-3 bg-muted/10">
                    <p>{rfq.notes}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Internal Notes</h4>
                  <div className="border rounded-lg p-3 bg-muted/10">
                    <p>{rfq.internalNotes}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Documents</h4>
                <div className="space-y-2">
                  {rfq.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {doc.type} • {doc.date}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Quote History</h4>
                <div className="space-y-4">
                  {rfq.history.map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="font-medium">{event.action}</div>
                          <div className="text-sm text-muted-foreground">{event.date}</div>
                        </div>
                        <div className="text-sm">{event.notes}</div>
                        <div className="text-xs text-muted-foreground mt-1">By: {event.user}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-muted-foreground" />
            Quote Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <Button size="lg" className="w-full md:w-auto gap-2" disabled={rfq.status !== "Pending"}>
              <CheckSquare className="h-5 w-5" />
              Accept Quote
            </Button>
            <Button size="lg" variant="outline" className="w-full md:w-auto gap-2" disabled={rfq.status !== "Pending"}>
              <XSquare className="h-5 w-5" />
              Reject Quote
            </Button>
            <Button size="lg" variant="outline" className="w-full md:w-auto gap-2">
              <Edit className="h-5 w-5" />
              Request Changes
            </Button>
            <Button size="lg" variant="outline" className="w-full md:w-auto gap-2">
              <FileText className="h-5 w-5" />
              Convert to Order
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
