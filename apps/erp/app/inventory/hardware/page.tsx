import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function HardwarePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hardware Inventory</h1>
          <p className="text-muted-foreground">Manage and track hardware components inventory.</p>
        </div>
        <Button asChild>
          <Link href="/inventory/hardware/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Hardware
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hardware Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page is under development. Hardware inventory management will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
