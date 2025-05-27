import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewOrderPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-10 w-10 border shadow-sm">
          <Link href="/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Order</h1>
          <p className="text-muted-foreground">Create a new customer order</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Select a customer for this order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Select>
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Manufacturing</SelectItem>
                  <SelectItem value="techpro">TechPro Industries</SelectItem>
                  <SelectItem value="global">Global Dynamics</SelectItem>
                  <SelectItem value="precision">Precision Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Person</Label>
              <Select>
                <SelectTrigger id="contact">
                  <SelectValue placeholder="Select a contact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john">John Smith</SelectItem>
                  <SelectItem value="jane">Jane Doe</SelectItem>
                  <SelectItem value="bob">Bob Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shipping-address">Shipping Address</Label>
              <Textarea id="shipping-address" placeholder="Enter shipping address" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Specify order information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="order-date">Order Date</Label>
              <Input type="date" id="order-date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-terms">Payment Terms</Label>
              <Select>
                <SelectTrigger id="payment-terms">
                  <SelectValue placeholder="Select payment terms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="net15">Net 15</SelectItem>
                  <SelectItem value="net30">Net 30</SelectItem>
                  <SelectItem value="net45">Net 45</SelectItem>
                  <SelectItem value="net60">Net 60</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shipping-method">Shipping Method</Label>
              <Select>
                <SelectTrigger id="shipping-method">
                  <SelectValue placeholder="Select shipping method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ground">Ground</SelectItem>
                  <SelectItem value="express">Express</SelectItem>
                  <SelectItem value="overnight">Overnight</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Enter any special instructions or notes" />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>Add products to this order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">Product</th>
                    <th className="py-3 px-4 text-left font-medium">Quantity</th>
                    <th className="py-3 px-4 text-left font-medium">Unit Price</th>
                    <th className="py-3 px-4 text-left font-medium">Total</th>
                    <th className="py-3 px-4 text-left font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4" colSpan={5}>
                      <Button variant="outline" size="sm" className="w-full">
                        + Add Product
                      </Button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t">
                    <td className="py-3 px-4" colSpan={3}>
                      <span className="font-medium">Total</span>
                    </td>
                    <td className="py-3 px-4 font-bold">$0.00</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Create Order</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
