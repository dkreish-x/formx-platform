import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function PurchasingPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Purchasing</h1>
        <Button asChild>
          <Link href="/purchasing/orders">View Purchase Orders</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchasing Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the purchasing dashboard. You can manage all purchasing activities here.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Link href="/purchasing/orders" className="block p-4 border rounded-md hover:bg-muted">
              Purchase Orders
            </Link>
            <Link href="/purchasing/suppliers" className="block p-4 border rounded-md hover:bg-muted">
              Suppliers
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
