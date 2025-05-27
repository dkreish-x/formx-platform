import { ChangeOrderForm } from "@/components/orders/change-order-form"

export default function NewChangeOrderPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Change Order</h1>
        <p className="text-muted-foreground">Create a new change order for Order #{params.id}</p>
      </div>

      <ChangeOrderForm />
    </div>
  )
}
