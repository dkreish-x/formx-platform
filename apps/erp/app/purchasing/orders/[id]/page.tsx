import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { ArrowLeft, Printer, Edit, Download, Clock, Package, CreditCard } from "lucide-react"
import Link from "next/link"

export default function PurchaseOrderDetailsPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the PO details based on the ID
  const purchaseOrder = {
    id: params.id,
    vendor: "AlloyWorks Supply Co.",
    status: "Draft",
    orderDate: "11-11-2024",
    receiveByDate: "12-09-2024",
    receiving: "None Received",
    billed: "Not Billed",
    total: "$2,957.00",
    items: [
      {
        id: "ITEM-001",
        description: 'Aluminum Sheet 6061-T6 0.125" x 48" x 96"',
        quantity: 5,
        unitPrice: "$125.00",
        total: "$625.00",
      },
      {
        id: "ITEM-002",
        description: 'Stainless Steel Round Bar 304 1.5" x 72"',
        quantity: 10,
        unitPrice: "$87.50",
        total: "$875.00",
      },
      {
        id: "ITEM-003",
        description: 'Titanium Plate Grade 5 0.25" x 24" x 48"',
        quantity: 2,
        unitPrice: "$728.50",
        total: "$1,457.00",
      },
    ],
    notes: "Please deliver all items by the receive-by date. Contact purchasing department for any questions.",
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/purchasing/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Purchase Orders
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Purchase Order {purchaseOrder.id}</CardTitle>
              <CardDescription>Created on {purchaseOrder.orderDate}</CardDescription>
            </div>
            <StatusBadge status={purchaseOrder.status} className="text-base px-4 py-1" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Vendor</h3>
              <p className="font-medium">{purchaseOrder.vendor}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Order Date</h3>
              <p className="font-medium">{purchaseOrder.orderDate}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Receive By Date</h3>
              <p className="font-medium">{purchaseOrder.receiveByDate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Receiving Status</h3>
              <StatusBadge status={purchaseOrder.receiving} />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Billing Status</h3>
              <StatusBadge status={purchaseOrder.billed} />
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
              <p className="font-medium">{purchaseOrder.total}</p>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium mb-4">Items</h3>
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Unit Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchaseOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.unitPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-right text-sm font-medium">
                      Total:
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{purchaseOrder.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-medium mb-2">Notes</h3>
            <p className="text-sm text-gray-600">{purchaseOrder.notes}</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button className="flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Receive Items
            </Button>
            <Button variant="outline" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Track Delivery
            </Button>
            <Button variant="outline" className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
