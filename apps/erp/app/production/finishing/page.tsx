import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinishingPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Finishing</h1>
        <Button>Add Finishing Process</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Finishing Processes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the finishing page. You can manage all finishing processes here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
