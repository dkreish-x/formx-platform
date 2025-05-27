import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function JobsPage() {
  // Sample data
  const jobs = [
    {
      id: "J-548260-3",
      partNumber: "SO-548260-3",
      partName: "MILLING .0061 RADIUS SLOT IN END OF FUNNEL, TOP AND BOTTOM",
      description: "Universal Steel Super Ring, 1 inch x 1/2 inch Diameter",
      makeQty: 108,
      customer: "ABC Machinery Inc.",
      dueDate: "08-22-2023",
      status: "Active",
      progress: 36,
      operator: "Frank Richardson",
      machine: "Machine ABCDE",
    },
    {
      id: "J-548260",
      partNumber: "SO-548260-1",
      partName: "Universal Steel Super Ring, 1 inch x 1/2 inch Diameter",
      description: "Universal Steel Super Ring, 1 inch x 1/2 inch Diameter",
      makeQty: 36,
      customer: "ABC Machinery Inc.",
      dueDate: "08-22-2023",
      status: "Ready",
      progress: 0,
      operator: "",
      machine: "",
    },
    {
      id: "J-548260",
      partNumber: "SO-548260-2",
      partName: "Universal Steel Super Ring, 1 inch x 1/2 inch Diameter",
      description: "Universal Steel Super Ring, 1 inch x 1/2 inch Diameter",
      makeQty: 108,
      customer: "ABC Machinery Inc.",
      dueDate: "08-22-2023",
      status: "Ready",
      progress: 0,
      operator: "",
      machine: "",
    },
    {
      id: "J-548260",
      partNumber: "SO-548260-3",
      partName: "MILLING .0061 RADIUS SLOT IN END OF FUNNEL, TOP AND BOTTOM",
      description: "Universal Steel Super Ring, 1 inch x 1/2 inch Diameter",
      makeQty: 108,
      customer: "Digital Fabrication",
      dueDate: "08-22-2023",
      status: "Active",
      progress: 72,
      operator: "Frank Richardson",
      machine: "Machine ABCDE",
    },
    {
      id: "SO-000003-2",
      partNumber: "SO-548260-1",
      partName: "Universal Steel Super Ring, 1 inch x 1/2 inch Diameter",
      description: "Universal Steel Super Ring, 1 inch x 1/2 inch Diameter",
      makeQty: 108,
      customer: "Router Plus",
      dueDate: "08-22-2023",
      status: "Ready",
      progress: 0,
      operator: "",
      machine: "",
    },
  ]

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <Button>Create New Job</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Jobs Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the jobs page. You can manage all production jobs here.</p>
        </CardContent>
      </Card>
    </div>
  )
}
