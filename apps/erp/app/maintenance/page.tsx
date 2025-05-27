import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function MaintenancePage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Maintenance</h1>
        <Button asChild>
          <Link href="/maintenance/equipment">View Equipment</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the maintenance dashboard. You can manage all maintenance activities here.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Link href="/maintenance/equipment" className="block p-4 border rounded-md hover:bg-muted">
              Equipment
            </Link>
            <Link href="/maintenance/schedules" className="block p-4 border rounded-md hover:bg-muted">
              Schedules
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
