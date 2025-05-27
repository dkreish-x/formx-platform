import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, ZoomIn, ZoomOut } from "lucide-react"

export function MaterialGenealogyGraph() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Material Genealogy Graph</CardTitle>
            <CardDescription>Visual representation of material flow and traceability</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <ZoomIn className="h-4 w-4 mr-2" />
              Zoom In
            </Button>
            <Button variant="outline" size="sm">
              <ZoomOut className="h-4 w-4 mr-2" />
              Zoom Out
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-4 h-96 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Material Genealogy Graph</p>
            <p className="text-sm text-muted-foreground">
              Visualization of material flow from raw material to finished product
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
