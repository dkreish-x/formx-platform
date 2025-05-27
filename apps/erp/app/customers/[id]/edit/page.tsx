import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

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
  taxId: "12-3456789",
  paymentTerms: "net-30",
  notes: "Prefers email communication. Usually orders in bulk quarterly.",
}

export default function EditCustomerPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-10 w-10 border shadow-sm">
          <Link href={`/customers/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Customer</h1>
      </div>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue={customer.name} className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-type">Customer Type</Label>
                <select
                  id="customer-type"
                  defaultValue="manufacturing"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="manufacturing">Manufacturing</option>
                  <option value="distribution">Distribution</option>
                  <option value="retail">Retail</option>
                  <option value="service">Service</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-name">Primary Contact Name</Label>
                <Input id="contact-name" defaultValue={customer.contact} className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-title">Contact Title</Label>
                <Input id="contact-title" defaultValue={customer.title} className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={customer.email} className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={customer.phone} className="h-10" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" defaultValue={customer.address} rows={3} className="min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-id">Tax ID / EIN</Label>
                <Input id="tax-id" defaultValue={customer.taxId} className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-terms">Payment Terms</Label>
                <select
                  id="payment-terms"
                  defaultValue={customer.paymentTerms}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="net-30">Net 30</option>
                  <option value="net-45">Net 45</option>
                  <option value="net-60">Net 60</option>
                  <option value="prepaid">Prepaid</option>
                  <option value="cod">COD</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  defaultValue={customer.status}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" defaultValue={customer.notes} rows={4} className="min-h-[100px]" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="h-10 border shadow-sm">
                <Link href={`/customers/${params.id}`}>Cancel</Link>
              </Button>
              <Button type="submit" variant="default" className="h-10">
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
