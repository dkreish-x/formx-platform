import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReportsPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <Button>Generate New Report</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reports Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the reports page. You can generate and view all reports here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
