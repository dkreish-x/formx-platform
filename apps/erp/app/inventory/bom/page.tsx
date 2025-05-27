import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BOMPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Bill of Materials</h1>
        <Button>Create New BOM</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bill of Materials</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the bill of materials page. You can manage all BOMs here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
