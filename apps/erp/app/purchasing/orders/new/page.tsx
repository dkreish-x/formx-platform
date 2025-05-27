import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewPurchaseOrderPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/purchasing/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">New Purchase Order</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Purchase Order</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier</Label>
                  <Select>
                    <SelectTrigger id="supplier">
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acme">Acme Metal Supply</SelectItem>
                      <SelectItem value="precision">Precision Fasteners Inc.</SelectItem>
                      <SelectItem value="industrial">Industrial Electronics Ltd.</SelectItem>
                      <SelectItem value="global">Global Polymers Co.</SelectItem>
                      <SelectItem value="midwest">Midwest Tool Supply</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input id="contact" placeholder="Contact person" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Email address" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Phone number" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Line Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Input placeholder="Item name" />
                    </TableCell>
                    <TableCell>
                      <Input placeholder="Description" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" placeholder="Qty" min="1" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" placeholder="Price" min="0" step="0.01" />
                    </TableCell>
                    <TableCell>$0.00</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button variant="outline" size="sm" className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes & Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes for the supplier" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terms">Terms & Conditions</Label>
                <Textarea id="terms" placeholder="Terms and conditions" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="po-number">PO Number</Label>
                <Input id="po-number" placeholder="Auto-generated" disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-date">Order Date</Label>
                <DatePicker />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-date">Expected Delivery Date</Label>
                <DatePicker />
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
                    <SelectItem value="cod">COD</SelectItem>
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
                    <SelectItem value="pickup">Pickup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%):</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>$0.00</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
