import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function ProductionPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Production</h1>
        <Button asChild>
          <Link href="/work-orders">View Work Orders</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the production dashboard. You can manage all production activities here.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <Link href="/work-orders" className="block p-4 border rounded-md hover:bg-muted">
              Work Orders
            </Link>
            <Link href="/production/scheduling" className="block p-4 border rounded-md hover:bg-muted">
              Scheduling
            </Link>
            <Link href="/production/finishing" className="block p-4 border rounded-md hover:bg-muted">
              Finishing
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
