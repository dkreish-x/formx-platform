import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  ArrowLeft,
  Building,
  Mail,
  MapPin,
  Phone,
  User,
  Edit,
  FileText,
  Clock,
  DollarSign,
  ChevronRight,
  BarChart3,
  Users,
  Calendar,
  FileCheck,
  Share2,
  Printer,
  Star,
  StarHalf,
  Plus,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data for a single customer
const customer = {
  id: "CUST-001",
  name: "Acme Manufacturing",
  contact: "John Smith",
  title: "Purchasing Manager",
  email: "john@acmemfg.com",
  phone: "(555) 123-4567",
  address: "123 Industrial Way, Manufacturing City, MC 12345",
  status: "Active",
  lastOrder: "2023-04-15",
  totalOrders: 24,
  totalValue: "$156,789.00",
  notes: "Prefers email communication. Usually orders in bulk quarterly.",
  createdAt: "2020-06-12",
  rating: 4.5,
  paymentTerms: "Net 30",
  creditLimit: "$50,000.00",
  accountManager: "Jane Doe",
  tags: ["VIP", "Manufacturing", "Quarterly Buyer"],
  customerSince: "June 2020",
  lastActivity: "2023-05-10",
  nextFollowUp: "2023-06-01",
}

// Mock data for customer orders
const orders = [
  {
    id: "ORD-2023-042",
    date: "2023-04-15",
    status: "Completed",
    total: "$12,450.00",
    items: 8,
    priority: "Standard",
  },
  {
    id: "ORD-2023-031",
    date: "2023-03-22",
    status: "Completed",
    total: "$8,975.00",
    items: 5,
    priority: "High",
  },
  {
    id: "ORD-2023-018",
    date: "2023-02-10",
    status: "Completed",
    total: "$15,320.00",
    items: 12,
    priority: "Standard",
  },
  {
    id: "ORD-2022-156",
    date: "2022-12-05",
    status: "Completed",
    total: "$9,840.00",
    items: 7,
    priority: "Low",
  },
]

// Mock data for customer quotes
const quotes = [
  {
    id: "RFQ-2023-052",
    date: "2023-05-10",
    status: "Pending",
    total: "$18,750.00",
    items: 10,
    expiryDate: "2023-06-10",
  },
  {
    id: "RFQ-2023-045",
    date: "2023-04-28",
    status: "Accepted",
    total: "$12,450.00",
    items: 8,
    expiryDate: "2023-05-28",
  },
  {
    id: "RFQ-2023-030",
    date: "2023-03-15",
    status: "Rejected",
    total: "$7,890.00",
    items: 4,
    expiryDate: "2023-04-15",
  },
]

// Mock data for customer contacts
const contacts = [
  {
    id: "CON-001",
    name: "John Smith",
    title: "Purchasing Manager",
    email: "john@acmemfg.com",
    phone: "(555) 123-4567",
    primary: true,
    lastContacted: "2023-05-08",
  },
  {
    id: "CON-002",
    name: "Emily Johnson",
    title: "Operations Director",
    email: "emily@acmemfg.com",
    phone: "(555) 123-4568",
    primary: false,
    lastContacted: "2023-04-22",
  },
  {
    id: "CON-003",
    name: "Robert Davis",
    title: "CEO",
    email: "robert@acmemfg.com",
    phone: "(555) 123-4569",
    primary: false,
    lastContacted: "2023-03-15",
  },
]

// Mock data for customer activities
const activities = [
  {
    id: "ACT-001",
    type: "Call",
    date: "2023-05-12",
    user: "Jane Doe",
    description: "Discussed upcoming project requirements",
    outcome: "Positive",
    duration: "25 minutes",
  },
  {
    id: "ACT-002",
    type: "Email",
    date: "2023-05-10",
    user: "Jane Doe",
    description: "Sent quote for new project",
    outcome: "Pending",
    duration: "N/A",
  },
  {
    id: "ACT-003",
    type: "Meeting",
    date: "2023-04-28",
    user: "Mike Wilson",
    description: "On-site visit to discuss manufacturing capabilities",
    outcome: "Positive",
    duration: "2 hours",
  },
  {
    id: "ACT-004",
    type: "Note",
    date: "2023-04-15",
    user: "Jane Doe",
    description: "Customer requested faster delivery times for future orders",
    outcome: "Action Required",
    duration: "N/A",
  },
]

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 p-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background rounded-xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border shadow-sm">
              <Link href="/customers">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
                <StatusBadge status="success" className="ml-2">
                  Active
                </StatusBadge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <span>Customer ID: {customer.id}</span>
                <span className="text-xs">•</span>
                <span>Customer Since: {customer.customerSince}</span>
                <span className="text-xs">•</span>
                <div className="flex items-center">
                  {Array.from({ length: Math.floor(customer.rating) }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                  {customer.rating % 1 !== 0 && <StarHalf className="h-4 w-4 fill-primary text-primary" />}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full shadow-sm gap-1">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full shadow-sm gap-1">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button variant="outline" size="sm" className="rounded-full shadow-sm gap-1" asChild>
              <Link href={`/customers/${params.id}/edit`}>
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Link>
            </Button>
            <Button size="sm" className="rounded-full shadow-sm gap-1" asChild>
              <Link href={`/rfq/new?customer=${params.id}`}>
                <FileText className="h-4 w-4" />
                <span>New Quote</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Orders</div>
                <div className="text-2xl font-bold">{customer.totalOrders}</div>
              </div>
            </div>
          </div>
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Value</div>
                <div className="text-2xl font-bold">{customer.totalValue}</div>
              </div>
            </div>
          </div>
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Last Order</div>
                <div className="text-2xl font-bold">{customer.lastOrder}</div>
              </div>
            </div>
          </div>
          <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Next Follow-up</div>
                <div className="text-2xl font-bold">{customer.nextFollowUp}</div>
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
                    <div className="font-semibold">{customer.name}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Primary Contact</div>
                    <div className="font-semibold">{customer.contact}</div>
                    <div className="text-sm text-muted-foreground">{customer.title}</div>
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
                    <div className="font-semibold">{customer.email}</div>
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
                    <div className="font-semibold">{customer.phone}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Address</div>
                    <div className="font-semibold whitespace-pre-line">{customer.address}</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground">Account Manager</div>
                    <div className="font-semibold">{customer.accountManager}</div>
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
                    <div className="font-semibold">{customer.paymentTerms}</div>
                    <div className="text-sm text-muted-foreground">Credit Limit: {customer.creditLimit}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Card */}
        <Card className="md:col-span-2 border shadow-sm overflow-hidden">
          <CardContent className="p-0">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                <TabsTrigger
                  value="orders"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="quotes"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Quotes
                </TabsTrigger>
                <TabsTrigger
                  value="contacts"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Contacts
                </TabsTrigger>
                <TabsTrigger
                  value="activities"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Activities
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  Notes
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders" className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-muted-foreground" />
                    Recent Orders
                  </h3>
                  <Button variant="outline" size="sm" className="rounded-full h-8 px-3 py-0 border shadow-sm">
                    <Link href={`/orders?customer=${params.id}`} className="flex items-center gap-1">
                      View All
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="overflow-x-auto rounded-lg border shadow-sm">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Order ID</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Priority</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Items</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Total</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr
                          key={order.id}
                          className={`border-b transition-colors hover:bg-primary/5 cursor-pointer ${
                            index % 2 === 0 ? "bg-background" : "bg-muted/10"
                          }`}
                        >
                          <td className="py-3 px-4 font-medium">{order.id}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">
                            <StatusBadge status={order.status === "Completed" ? "success" : "warning"}>
                              {order.status}
                            </StatusBadge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={
                                order.priority === "High"
                                  ? "bg-red-100 text-red-800 border-red-200"
                                  : order.priority === "Low"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : "bg-gray-100 text-gray-800 border-gray-200"
                              }
                            >
                              {order.priority}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{order.items}</td>
                          <td className="py-3 px-4 font-medium">{order.total}</td>
                          <td className="py-3 px-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 py-0 rounded-full border shadow-sm"
                              asChild
                            >
                              <Link href={`/orders/${order.id}`} className="flex items-center gap-1">
                                View
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Quotes Tab */}
              <TabsContent value="quotes" className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    Recent Quotes
                  </h3>
                  <Button variant="outline" size="sm" className="rounded-full h-8 px-3 py-0 border shadow-sm">
                    <Link href={`/rfq?customer=${params.id}`} className="flex items-center gap-1">
                      View All
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="overflow-x-auto rounded-lg border shadow-sm">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Quote ID</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Date</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Status</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Expiry</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Items</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Total</th>
                        <th className="py-3 px-4 text-left font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotes.map((quote, index) => (
                        <tr
                          key={quote.id}
                          className={`border-b transition-colors hover:bg-primary/5 cursor-pointer ${
                            index % 2 === 0 ? "bg-background" : "bg-muted/10"
                          }`}
                        >
                          <td className="py-3 px-4 font-medium">{quote.id}</td>
                          <td className="py-3 px-4">{quote.date}</td>
                          <td className="py-3 px-4">
                            <StatusBadge
                              status={
                                quote.status === "Accepted"
                                  ? "success"
                                  : quote.status === "Rejected"
                                    ? "error"
                                    : "warning"
                              }
                            >
                              {quote.status}
                            </StatusBadge>
                          </td>
                          <td className="py-3 px-4">{quote.expiryDate}</td>
                          <td className="py-3 px-4">{quote.items}</td>
                          <td className="py-3 px-4 font-medium">{quote.total}</td>
                          <td className="py-3 px-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 py-0 rounded-full border shadow-sm"
                              asChild
                            >
                              <Link href={`/rfq/${quote.id}`} className="flex items-center gap-1">
                                View
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Contacts Tab */}
              <TabsContent value="contacts" className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    Contacts
                  </h3>
                  <Button size="sm" className="rounded-full h-8 px-3 py-0 shadow-sm gap-1">
                    <Link href={`/customers/${params.id}/contacts/new`} className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      Add Contact
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="border rounded-lg shadow-sm overflow-hidden">
                      <div className="bg-muted/30 p-3 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{contact.name}</div>
                            <div className="text-sm text-muted-foreground">{contact.title}</div>
                          </div>
                        </div>
                        {contact.primary && (
                          <Badge className="bg-primary/20 text-primary border-primary/30">Primary</Badge>
                        )}
                      </div>
                      <div className="p-3 space-y-2 bg-background">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Last contacted: {contact.lastContacted}</span>
                        </div>
                      </div>
                      <div className="border-t p-3 bg-muted/10 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-3 py-0 rounded-full border shadow-sm gap-1"
                          asChild
                        >
                          <Link
                            href={`/customers/${params.id}/contacts/${contact.id}/edit`}
                            className="flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Activities Tab */}
              <TabsContent value="activities" className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    Recent Activities
                  </h3>
                  <Button size="sm" className="rounded-full h-8 px-3 py-0 shadow-sm gap-1">
                    <Link href={`/customers/${params.id}/activities/new`} className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      Add Activity
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="border rounded-lg shadow-sm overflow-hidden">
                      <div className="bg-muted/30 p-3 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {activity.type === "Call" ? (
                              <Phone className="h-5 w-5 text-primary" />
                            ) : activity.type === "Email" ? (
                              <Mail className="h-5 w-5 text-primary" />
                            ) : activity.type === "Meeting" ? (
                              <Users className="h-5 w-5 text-primary" />
                            ) : (
                              <FileText className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{activity.type}</div>
                            <div className="text-sm text-muted-foreground">{activity.date}</div>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            activity.outcome === "Positive"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : activity.outcome === "Action Required"
                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                : "bg-blue-100 text-blue-800 border-blue-200"
                          }
                        >
                          {activity.outcome}
                        </Badge>
                      </div>
                      <div className="p-3 bg-background">
                        <p>{activity.description}</p>
                        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                          <span>By: {activity.user}</span>
                          {activity.duration !== "N/A" && <span>Duration: {activity.duration}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes" className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    Notes
                  </h3>
                  <Button size="sm" className="rounded-full h-8 px-3 py-0 shadow-sm gap-1">
                    <Plus className="h-4 w-4" />
                    Add Note
                  </Button>
                </div>
                <div className="border rounded-lg p-4 shadow-sm bg-muted/10">
                  <p>{customer.notes}</p>
                </div>

                {/* Customer Tags */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Customer Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {customer.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="h-6 px-2 py-0 rounded-full">
                      <Plus className="h-3 w-3 mr-1" />
                      Add Tag
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Customer Analytics Section */}
      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
            Customer Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2 h-64 border rounded-lg flex items-center justify-center bg-muted/10">
              <BarChart3 className="h-8 w-8 text-muted-foreground" />
              <p className="ml-2 text-muted-foreground">Order history chart will appear here</p>
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg p-3 bg-muted/10">
                <div className="text-sm text-muted-foreground">Order Frequency</div>
                <div className="text-2xl font-bold">Quarterly</div>
                <div className="mt-1 text-xs text-muted-foreground">Based on historical data</div>
              </div>

              <div className="border rounded-lg p-3 bg-muted/10">
                <div className="text-sm text-muted-foreground">Average Order Value</div>
                <div className="text-2xl font-bold">$6,532.88</div>
                <div className="mt-1 text-xs text-muted-foreground">Across 24 orders</div>
              </div>

              <div className="border rounded-lg p-3 bg-muted/10">
                <div className="text-sm text-muted-foreground">Customer Lifetime Value</div>
                <div className="text-2xl font-bold">$156,789.00</div>
                <div className="mt-1 text-xs text-muted-foreground">Since June 2020</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
