import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function InventoryPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <Button asChild>
          <Link href="/inventory/materials">View Materials</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the inventory dashboard. You can manage all inventory items here.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Link href="/inventory/materials" className="block p-4 border rounded-md hover:bg-muted">
              Materials
            </Link>
            <Link href="/inventory/bom" className="block p-4 border rounded-md hover:bg-muted">
              Bill of Materials
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
