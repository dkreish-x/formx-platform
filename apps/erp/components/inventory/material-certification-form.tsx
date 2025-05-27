import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Upload } from "lucide-react"

export function MaterialCertificationForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Material Certification</CardTitle>
        <CardDescription>Upload and verify material certification documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cert-type">Certification Type</Label>
              <Select>
                <SelectTrigger id="cert-type">
                  <SelectValue placeholder="Select certification type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtr">Mill Test Report (MTR)</SelectItem>
                  <SelectItem value="coc">Certificate of Conformance (CoC)</SelectItem>
                  <SelectItem value="dfars">DFARS Compliance Certificate</SelectItem>
                  <SelectItem value="sds">Safety Data Sheet (SDS)</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuer">Issuer</Label>
              <Input id="issuer" placeholder="Certification issuer" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issue-date">Issue Date</Label>
              <Input id="issue-date" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiration-date">Expiration Date</Label>
              <Input id="expiration-date" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="standards">Standards & Specifications</Label>
            <Input id="standards" placeholder="Enter applicable standards (e.g., AMS 4027, ASTM B209)" />
            <p className="text-xs text-muted-foreground mt-1">Separate multiple standards with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Additional notes about this certification" />
          </div>

          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="font-medium">Upload Certification File</p>
            <p className="text-sm text-muted-foreground mb-2">Drag and drop or click to browse</p>
            <Button variant="outline" size="sm">
              Select File
            </Button>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Upload & Verify
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
