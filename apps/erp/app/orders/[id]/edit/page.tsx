import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Mock data for a single order
const order = {
  id: "ORD-2023-042",
  customer: "Acme Manufacturing",
  contact: "John Smith",
  shippingAddress: "123 Industrial Way, Manufacturing City, MC 12345",
  orderDate: "2023-04-15",
  paymentTerms: "Net 30",
  shippingMethod: "Ground",
  notes: "Customer requested expedited production. Quality inspection passed on all items.",
  items: [
    {
      id: "ITEM-001",
      name: "Custom Machined Bracket",
      quantity: 25,
      unitPrice: 125.0,
      total: 3125.0,
    },
    {
      id: "ITEM-002",
      name: "Precision Shaft Assembly",
      quantity: 10,
      unitPrice: 345.0,
      total: 3450.0,
    },
    {
      id: "ITEM-003",
      name: "Aluminum Housing",
      quantity: 15,
      unitPrice: 198.0,
      total: 2970.0,
    },
    {
      id: "ITEM-004",
      name: "Stainless Steel Fasteners",
      quantity: 200,
      unitPrice: 4.5,
      total: 900.0,
    },
    {
      id: "ITEM-005",
      name: "Technical Documentation",
      quantity: 1,
      unitPrice: 2005.0,
      total: 2005.0,
    },
  ],
}

export default function EditOrderPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-10 w-10 border shadow-sm">
          <Link href={`/orders/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Order {order.id}</h1>
          <p className="text-muted-foreground">Modify order details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Update customer details for this order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Select defaultValue="acme">
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
              <Select defaultValue="john">
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
              <Textarea id="shipping-address" defaultValue={order.shippingAddress} />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Update order information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="order-date">Order Date</Label>
              <Input type="date" id="order-date" defaultValue="2023-04-15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-terms">Payment Terms</Label>
              <Select defaultValue="net30">
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
              <Select defaultValue="ground">
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
              <Textarea id="notes" defaultValue={order.notes} />
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
            <CardDescription>Update products in this order</CardDescription>
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
                  {order.items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-4">{item.name}</td>
                      <td className="py-3 px-4">
                        <Input type="number" defaultValue={item.quantity} className="w-20 h-8" />
                      </td>
                      <td className="py-3 px-4">${item.unitPrice.toFixed(2)}</td>
                      <td className="py-3 px-4 font-medium">${item.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          ×
                        </Button>
                      </td>
                    </tr>
                  ))}
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
                    <td className="py-3 px-4 font-bold">
                      ${order.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">
              <Link href={`/orders/${params.id}`}>Cancel</Link>
            </Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
