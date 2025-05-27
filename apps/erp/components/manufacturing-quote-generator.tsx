"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, FileText, Download, Send, Plus, Trash2 } from "lucide-react"

interface QuoteItem {
  id: string
  description: string
  service: string
  material: string
  thickness: string
  quantity: number
  dimensions: string
  unitPrice: number
  totalPrice: number
}

interface QuoteData {
  customerName: string
  customerEmail: string
  projectName: string
  dueDate: string
  items: QuoteItem[]
  subtotal: number
  tax: number
  total: number
  notes: string
}

export function ManufacturingQuoteGenerator() {
  const [quote, setQuote] = useState<QuoteData>({
    customerName: "",
    customerEmail: "",
    projectName: "",
    dueDate: "",
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    notes: "",
  })

  const [currentItem, setCurrentItem] = useState<Partial<QuoteItem>>({
    description: "",
    service: "",
    material: "",
    thickness: "",
    quantity: 1,
    dimensions: "",
    unitPrice: 0,
  })

  const services = [
    "Laser Cutting",
    "CNC Machining",
    "Sheet Metal Fabrication",
    "Welding",
    "Powder Coating",
    "Assembly",
  ]

  const materials = [
    "Mild Steel",
    "Stainless Steel 304",
    "Stainless Steel 316",
    "Aluminum 6061",
    "Aluminum 5052",
    "Brass",
    "Copper",
  ]

  const addItem = () => {
    if (!currentItem.description || !currentItem.service) return

    const totalPrice = (currentItem.unitPrice || 0) * (currentItem.quantity || 1)
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      description: currentItem.description || "",
      service: currentItem.service || "",
      material: currentItem.material || "",
      thickness: currentItem.thickness || "",
      quantity: currentItem.quantity || 1,
      dimensions: currentItem.dimensions || "",
      unitPrice: currentItem.unitPrice || 0,
      totalPrice,
    }

    const updatedItems = [...quote.items, newItem]
    const subtotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0)
    const tax = subtotal * 0.08 // 8% tax rate
    const total = subtotal + tax

    setQuote({
      ...quote,
      items: updatedItems,
      subtotal,
      tax,
      total,
    })

    // Reset current item
    setCurrentItem({
      description: "",
      service: "",
      material: "",
      thickness: "",
      quantity: 1,
      dimensions: "",
      unitPrice: 0,
    })
  }

  const removeItem = (id: string) => {
    const updatedItems = quote.items.filter((item) => item.id !== id)
    const subtotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0)
    const tax = subtotal * 0.08
    const total = subtotal + tax

    setQuote({
      ...quote,
      items: updatedItems,
      subtotal,
      tax,
      total,
    })
  }

  const calculatePrice = () => {
    // Simple pricing logic - in real implementation, this would be more sophisticated
    let basePrice = 0

    switch (currentItem.service) {
      case "Laser Cutting":
        basePrice = 2.5 // per linear inch
        break
      case "CNC Machining":
        basePrice = 85 // per hour
        break
      case "Sheet Metal Fabrication":
        basePrice = 45 // per hour
        break
      case "Welding":
        basePrice = 65 // per hour
        break
      case "Powder Coating":
        basePrice = 15 // per square foot
        break
      case "Assembly":
        basePrice = 35 // per hour
        break
      default:
        basePrice = 25
    }

    // Material multiplier
    let materialMultiplier = 1
    if (currentItem.material?.includes("Stainless")) materialMultiplier = 1.5
    if (currentItem.material?.includes("Aluminum")) materialMultiplier = 1.2

    const estimatedPrice = basePrice * materialMultiplier
    setCurrentItem({ ...currentItem, unitPrice: estimatedPrice })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details">Quote Details</TabsTrigger>
          <TabsTrigger value="items">Line Items</TabsTrigger>
          <TabsTrigger value="preview">Preview & Send</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Enter customer and project details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={quote.customerName}
                    onChange={(e) => setQuote({ ...quote, customerName: e.target.value })}
                    placeholder="Enter customer name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Customer Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={quote.customerEmail}
                    onChange={(e) => setQuote({ ...quote, customerEmail: e.target.value })}
                    placeholder="customer@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    value={quote.projectName}
                    onChange={(e) => setQuote({ ...quote, projectName: e.target.value })}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={quote.dueDate}
                    onChange={(e) => setQuote({ ...quote, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Project Notes</Label>
                <Textarea
                  id="notes"
                  value={quote.notes}
                  onChange={(e) => setQuote({ ...quote, notes: e.target.value })}
                  placeholder="Additional project requirements or notes..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Line Item</CardTitle>
              <CardDescription>Add services and materials to the quote</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={currentItem.description}
                    onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                    placeholder="Part description"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service</Label>
                  <Select
                    value={currentItem.service}
                    onValueChange={(value) => setCurrentItem({ ...currentItem, service: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="material">Material</Label>
                  <Select
                    value={currentItem.material}
                    onValueChange={(value) => setCurrentItem({ ...currentItem, material: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      {materials.map((material) => (
                        <SelectItem key={material} value={material}>
                          {material}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thickness">Thickness</Label>
                  <Input
                    id="thickness"
                    value={currentItem.thickness}
                    onChange={(e) => setCurrentItem({ ...currentItem, thickness: e.target.value })}
                    placeholder="0.125"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem({ ...currentItem, quantity: Number.parseInt(e.target.value) || 1 })}
                    min="1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={currentItem.dimensions}
                    onChange={(e) => setCurrentItem({ ...currentItem, dimensions: e.target.value })}
                    placeholder="12 x 8 x 0.125"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unitPrice">Unit Price</Label>
                  <div className="flex gap-2">
                    <Input
                      id="unitPrice"
                      type="number"
                      step="0.01"
                      value={currentItem.unitPrice}
                      onChange={(e) =>
                        setCurrentItem({ ...currentItem, unitPrice: Number.parseFloat(e.target.value) || 0 })
                      }
                      placeholder="0.00"
                    />
                    <Button type="button" variant="outline" onClick={calculatePrice}>
                      <Calculator className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={addItem} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </CardContent>
          </Card>

          {quote.items.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Quote Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quote.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{item.description}</h4>
                          <Badge variant="secondary">{item.service}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {item.material} • {item.thickness}" • {item.dimensions} • Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${item.totalPrice.toFixed(2)}</div>
                        <div className="text-sm text-muted-foreground">${item.unitPrice.toFixed(2)} each</div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="ml-2">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quote Summary</CardTitle>
              <CardDescription>Review and send your quote</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer</h4>
                  <p>{quote.customerName}</p>
                  <p className="text-sm text-muted-foreground">{quote.customerEmail}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Project</h4>
                  <p>{quote.projectName}</p>
                  <p className="text-sm text-muted-foreground">Due: {quote.dueDate}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h4 className="font-medium">Items ({quote.items.length})</h4>
                {quote.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.description} (x{item.quantity})
                    </span>
                    <span>${item.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${quote.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (8%)</span>
                  <span>${quote.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${quote.total.toFixed(2)}</span>
                </div>
              </div>

              {quote.notes && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">{quote.notes}</p>
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Send Quote
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
