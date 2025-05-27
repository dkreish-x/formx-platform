import { ChangeOrderDetail } from "@/components/orders/change-order-detail"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ChangeOrderDetailPage({
  params,
}: {
  params: { id: string; changeOrderId: string }
}) {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/orders/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Order</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Change Order {params.changeOrderId}</h1>
            <p className="text-muted-foreground">Order #{params.id} - Acme Industries</p>
          </div>
        </div>
      </div>

      <ChangeOrderDetail />
    </div>
  )
}
