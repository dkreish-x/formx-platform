"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { DatePicker } from "@/components/ui/date-picker"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Camera, Plus, Trash } from "lucide-react"
import Link from "next/link"

export default function NewSafetyInspectionPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // In a real implementation, these would be fetched from the API
  const checkpoints = [
    { id: 1, name: "Emergency exits are clearly marked and unobstructed", category: "Fire Safety" },
    { id: 2, name: "Fire extinguishers are accessible and properly maintained", category: "Fire Safety" },
    { id: 3, name: "First aid kits are fully stocked and accessible", category: "First Aid" },
    { id: 4, name: "PPE is available and being used correctly", category: "Personal Protection" },
    { id: 5, name: "Machine guards are in place and functioning", category: "Machine Safety" },
    { id: 6, name: "Aisles and walkways are clear of obstructions", category: "Housekeeping" },
    { id: 7, name: "Electrical panels are accessible and properly labeled", category: "Electrical Safety" },
    { id: 8, name: "Chemical containers are properly labeled and stored", category: "Chemical Safety" },
    { id: 9, name: "Ventilation systems are functioning properly", category: "Environmental" },
    { id: 10, name: "Emergency procedures are posted and visible", category: "Emergency Preparedness" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    toast({
      title: "Inspection Submitted",
      description: "The safety inspection has been successfully submitted.",
    })
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-4">
          <Link href="/safety/inspections">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">New Safety Inspection</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Inspection Details</CardTitle>
                <CardDescription>Enter the basic information for this safety inspection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="inspection-area">Inspection Area</Label>
                    <Select defaultValue="cnc">
                      <SelectTrigger id="inspection-area">
                        <SelectValue placeholder="Select area" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cnc">CNC Department</SelectItem>
                        <SelectItem value="additive">Additive Manufacturing</SelectItem>
                        <SelectItem value="finishing">Finishing & Powdercoating</SelectItem>
                        <SelectItem value="assembly">Assembly Area</SelectItem>
                        <SelectItem value="warehouse">Warehouse & Storage</SelectItem>
                        <SelectItem value="office">Office Area</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inspection-type">Inspection Type</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger id="inspection-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily Safety Check</SelectItem>
                        <SelectItem value="weekly">Weekly Inspection</SelectItem>
                        <SelectItem value="monthly">Monthly Safety Audit</SelectItem>
                        <SelectItem value="quarterly">Quarterly Compliance</SelectItem>
                        <SelectItem value="incident">Post-Incident</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="inspector">Inspector</Label>
                    <Select defaultValue="sarah">
                      <SelectTrigger id="inspector">
                        <SelectValue placeholder="Select inspector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sarah">Sarah Williams</SelectItem>
                        <SelectItem value="mike">Mike Johnson</SelectItem>
                        <SelectItem value="david">David Chen</SelectItem>
                        <SelectItem value="jessica">Jessica Brown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inspection-date">Inspection Date</Label>
                    <DatePicker />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inspection Checklist</CardTitle>
                <CardDescription>Complete the safety inspection checklist</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {checkpoints.map((checkpoint) => (
                  <div key={checkpoint.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{checkpoint.name}</h3>
                        <p className="text-sm text-muted-foreground">{checkpoint.category}</p>
                      </div>
                      <Button variant="outline" size="sm" type="button">
                        <Camera className="h-4 w-4 mr-2" />
                        Add Photo
                      </Button>
                    </div>

                    <RadioGroup defaultValue="pass" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pass" id={`pass-${checkpoint.id}`} />
                        <Label htmlFor={`pass-${checkpoint.id}`} className="font-normal">
                          Pass
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fail" id={`fail-${checkpoint.id}`} />
                        <Label htmlFor={`fail-${checkpoint.id}`} className="font-normal">
                          Fail
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="na" id={`na-${checkpoint.id}`} />
                        <Label htmlFor={`na-${checkpoint.id}`} className="font-normal">
                          N/A
                        </Label>
                      </div>
                    </RadioGroup>

                    <div className="mt-2">
                      <Textarea placeholder="Add notes or observations..." rows={2} />
                    </div>
                  </div>
                ))}

                <div className="flex justify-end">
                  <Button variant="outline" type="button">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Custom Checkpoint
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
                <CardDescription>Provide an overall assessment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="overall-rating">Overall Rating</Label>
                  <Select defaultValue="satisfactory">
                    <SelectTrigger id="overall-rating">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="satisfactory">Satisfactory</SelectItem>
                      <SelectItem value="needs-improvement">Needs Improvement</SelectItem>
                      <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                      <SelectItem value="critical">Critical Issues</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Summary Comments</Label>
                  <Textarea id="summary" placeholder="Enter overall summary and observations" rows={4} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="follow-up-required">Follow-up Required</Label>
                  <Select defaultValue="yes">
                    <SelectTrigger id="follow-up-required">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="follow-up-date">Follow-up Date</Label>
                  <DatePicker />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
                <CardDescription>Add photos or documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                  <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Drag and drop files here or click to browse</p>
                  <Input id="file-upload" type="file" multiple className="hidden" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    Select Files
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded-md">
                    <div className="flex items-center">
                      <Camera className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">machine_guard_issue.jpg</span>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-4">
          <Button variant="outline" asChild>
            <Link href="/safety/inspections">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Inspection"}
          </Button>
        </div>
      </form>
    </div>
  )
}
