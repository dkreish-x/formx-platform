"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Camera, CheckCircle, XCircle } from "lucide-react"

interface QualityCheckFormProps {
  operation: string
}

export function QualityCheckForm({ operation }: QualityCheckFormProps) {
  const [measurements, setMeasurements] = useState([
    { dimension: "Length", nominal: "100.0 mm", tolerance: "±0.1 mm", actual: "", result: "" },
    { dimension: "Width", nominal: "50.0 mm", tolerance: "±0.1 mm", actual: "", result: "" },
    { dimension: "Height", nominal: "25.0 mm", tolerance: "±0.1 mm", actual: "", result: "" },
    { dimension: "Hole Dia", nominal: "10.0 mm", tolerance: "±0.05 mm", actual: "", result: "" },
  ])
  const [notes, setNotes] = useState("")
  const [overallResult, setOverallResult] = useState<"pass" | "fail" | "">("")

  const updateMeasurement = (index: number, actual: string) => {
    const newMeasurements = [...measurements]
    newMeasurements[index].actual = actual

    // Automatically determine if the measurement passes or fails based on tolerance
    const measurement = newMeasurements[index]
    const nominalValue = Number.parseFloat(measurement.nominal.split(" ")[0])
    const toleranceValue = Number.parseFloat(measurement.tolerance.replace("±", "").split(" ")[0])
    const actualValue = Number.parseFloat(actual)

    if (!isNaN(actualValue)) {
      if (actualValue >= nominalValue - toleranceValue && actualValue <= nominalValue + toleranceValue) {
        newMeasurements[index].result = "Pass"
      } else {
        newMeasurements[index].result = "Fail"
      }
    } else {
      newMeasurements[index].result = ""
    }

    setMeasurements(newMeasurements)
  }

  const handleSubmit = () => {
    // In a real implementation, this would submit the quality check to the server
    alert(`Quality check submitted for ${operation}`)
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">{operation} - Quality Check</h3>
            <p className="text-sm text-muted-foreground">Record measurements and quality check results</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Measurements</h4>
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Add Photo
              </Button>
            </div>
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left font-medium p-2">Dimension</th>
                    <th className="text-left font-medium p-2">Nominal</th>
                    <th className="text-left font-medium p-2">Tolerance</th>
                    <th className="text-left font-medium p-2">Actual</th>
                    <th className="text-left font-medium p-2">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {measurements.map((measurement, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2">{measurement.dimension}</td>
                      <td className="p-2">{measurement.nominal}</td>
                      <td className="p-2">{measurement.tolerance}</td>
                      <td className="p-2">
                        <Input
                          value={measurement.actual}
                          onChange={(e) => updateMeasurement(index, e.target.value)}
                          placeholder="0.00"
                          className="h-8"
                        />
                      </td>
                      <td className="p-2">
                        {measurement.result && (
                          <div
                            className={`flex items-center ${
                              measurement.result === "Pass" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {measurement.result === "Pass" ? (
                              <CheckCircle className="h-4 w-4 mr-1" />
                            ) : (
                              <XCircle className="h-4 w-4 mr-1" />
                            )}
                            {measurement.result}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Overall Result</h4>
            <RadioGroup value={overallResult} onValueChange={(value) => setOverallResult(value as any)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pass" id="pass" />
                <Label htmlFor="pass" className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                  Pass
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fail" id="fail" />
                <Label htmlFor="fail" className="flex items-center">
                  <XCircle className="h-4 w-4 mr-1 text-red-600" />
                  Fail
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Notes</h4>
            <Textarea
              placeholder="Add notes about this quality check..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit} className="flex-1">
              Submit Quality Check
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
