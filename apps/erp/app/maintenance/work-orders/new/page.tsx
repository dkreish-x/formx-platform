import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NewWorkOrderPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/maintenance/work-orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Work Orders
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Create Work Order</h1>
        <p className="text-muted-foreground">Create a new maintenance work order</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Work Order Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="equipment" className="text-sm font-medium">
                  Equipment
                </label>
                <select
                  id="equipment"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select Equipment</option>
                  <option value="cnc-mill-3">CNC Mill #3</option>
                  <option value="laser-cutter-1">Laser Cutter #1</option>
                  <option value="hydraulic-press-2">Hydraulic Press #2</option>
                  <option value="welding-robot">Welding Robot</option>
                  <option value="paint-booth">Paint Booth</option>
                  <option value="assembly-line-1">Assembly Line #1</option>
                  <option value="forklift-3">Forklift #3</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Work Order Type
                </label>
                <select
                  id="type"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select Type</option>
                  <option value="preventive">Preventive</option>
                  <option value="corrective">Corrective</option>
                  <option value="emergency">Emergency</option>
                  <option value="predictive">Predictive</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </label>
                <select
                  id="priority"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="assignedTo" className="text-sm font-medium">
                  Assigned To
                </label>
                <select
                  id="assignedTo"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select Technician</option>
                  <option value="john-smith">John Smith</option>
                  <option value="maria-rodriguez">Maria Rodriguez</option>
                  <option value="david-chen">David Chen</option>
                  <option value="sarah-johnson">Sarah Johnson</option>
                  <option value="michael-brown">Michael Brown</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="dueDate" className="text-sm font-medium">
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="estimatedHours" className="text-sm font-medium">
                  Estimated Hours
                </label>
                <input
                  type="number"
                  id="estimatedHours"
                  min="0"
                  step="0.5"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="Describe the maintenance work to be performed..."
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Work Instructions</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Add work instruction step..."
                  />
                  <Button type="button" variant="outline">
                    Add
                  </Button>
                </div>
                <div className="rounded-md border border-input bg-background p-4">
                  <p className="text-sm text-muted-foreground">No instructions added yet.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Required Parts</label>
              <div className="space-y-2">
                <div className="grid gap-2 md:grid-cols-4">
                  <input
                    type="text"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Part ID"
                  />
                  <input
                    type="text"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Part Name"
                  />
                  <input
                    type="number"
                    min="1"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Quantity"
                  />
                  <Button type="button" variant="outline">
                    Add Part
                  </Button>
                </div>
                <div className="rounded-md border border-input bg-background p-4">
                  <p className="text-sm text-muted-foreground">No parts added yet.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" asChild>
                <Link href="/maintenance/work-orders">Cancel</Link>
              </Button>
              <Button type="submit" className="bg-[#D4AF37] text-white hover:bg-[#B8971F]">
                Create Work Order
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
