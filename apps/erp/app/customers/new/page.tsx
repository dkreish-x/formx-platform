import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewCustomerPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-10 w-10 border shadow-sm">
          <Link href="/customers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Customer</h1>
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
                <Input id="company-name" placeholder="Enter company name" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customer-type">Customer Type</Label>
                <select
                  id="customer-type"
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
                <Input id="contact-name" placeholder="Enter contact name" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-title">Contact Title</Label>
                <Input id="contact-title" placeholder="Enter contact title" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" className="h-10" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" placeholder="Enter full address" rows={3} className="min-h-[80px]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-id">Tax ID / EIN</Label>
                <Input id="tax-id" placeholder="Enter tax ID or EIN" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-terms">Payment Terms</Label>
                <select
                  id="payment-terms"
                  className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="net-30">Net 30</option>
                  <option value="net-45">Net 45</option>
                  <option value="net-60">Net 60</option>
                  <option value="prepaid">Prepaid</option>
                  <option value="cod">COD</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Enter any additional notes" rows={4} className="min-h-[100px]" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="h-10 border shadow-sm">
                <Link href="/customers">Cancel</Link>
              </Button>
              <Button type="submit" variant="default" className="h-10">
                Save Customer
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
