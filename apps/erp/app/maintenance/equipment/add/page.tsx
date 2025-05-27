"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { CalendarIcon, Save, ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"

export default function AddEquipmentPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    serialNumber: "",
    manufacturer: "",
    purchaseDate: new Date(),
    installDate: new Date(),
    department: "Production",
    location: "",
    status: "Operational",
    description: "",
    specifications: "",
    maintenanceInterval: "90",
    maintenanceIntervalUnit: "days",
    equipmentType: "CNC Machine",
    powerRequirements: "",
    dimensions: "",
    weight: "",
    images: [],
    documents: [],
    notes: "",
  })

  const [activeTab, setActiveTab] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real application, you would send the data to your API
    console.log("Submitting equipment data:", formData)

    setIsSubmitting(false)
    router.push("/maintenance/equipment")
  }

  const equipmentTypes = [
    "CNC Machine",
    "3D Printer",
    "Laser Cutter",
    "Milling Machine",
    "Lathe",
    "Inspection Equipment",
    "Assembly Equipment",
    "Finishing Equipment",
    "Material Handling",
    "Other",
  ]

  const departments = [
    "Production",
    "Quality",
    "Engineering",
    "Maintenance",
    "Finishing",
    "Shipping",
    "Receiving",
    "Other",
  ]

  const statuses = ["Operational", "Needs Maintenance", "Down", "In Storage", "Being Installed", "Decommissioned"]

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/maintenance/equipment">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Add New Equipment</h1>
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Equipment
            </>
          )}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="attachments">Attachments</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Basic details about the equipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Equipment Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="e.g., CNC Mill #4"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="equipmentType">Equipment Type *</Label>
                    <Select
                      value={formData.equipmentType}
                      onValueChange={(value) => handleChange("equipmentType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select equipment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {equipmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      value={formData.model}
                      onChange={(e) => handleChange("model", e.target.value)}
                      placeholder="e.g., Haas VF-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serialNumber">Serial Number</Label>
                    <Input
                      id="serialNumber"
                      value={formData.serialNumber}
                      onChange={(e) => handleChange("serialNumber", e.target.value)}
                      placeholder="e.g., SN12345678"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input
                      id="manufacturer"
                      value={formData.manufacturer}
                      onChange={(e) => handleChange("manufacturer", e.target.value)}
                      placeholder="e.g., Haas Automation"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Brief description of the equipment"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location Information</CardTitle>
                <CardDescription>Where the equipment is located</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      placeholder="e.g., Building A, Room 101"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dates</CardTitle>
                <CardDescription>Important dates for this equipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Purchase Date</Label>
                    <div className="flex items-center">
                      <Button variant="outline" className="w-full justify-start text-left font-normal" type="button">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.purchaseDate ? format(formData.purchaseDate, "PPP") : "Pick a date"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Installation Date</Label>
                    <div className="flex items-center">
                      <Button variant="outline" className="w-full justify-start text-left font-normal" type="button">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.installDate ? format(formData.installDate, "PPP") : "Pick a date"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
                <CardDescription>Detailed technical information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specifications">Specifications</Label>
                  <Textarea
                    id="specifications"
                    value={formData.specifications}
                    onChange={(e) => handleChange("specifications", e.target.value)}
                    placeholder="Detailed technical specifications"
                    rows={5}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="powerRequirements">Power Requirements</Label>
                    <Input
                      id="powerRequirements"
                      value={formData.powerRequirements}
                      onChange={(e) => handleChange("powerRequirements", e.target.value)}
                      placeholder="e.g., 220V, 3-phase"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => handleChange("dimensions", e.target.value)}
                      placeholder="e.g., 2m x 1.5m x 2m"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight</Label>
                    <Input
                      id="weight"
                      value={formData.weight}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      placeholder="e.g., 1500 kg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {formData.equipmentType === "3D Printer" && (
              <Card>
                <CardHeader>
                  <CardTitle>3D Printer Specific Details</CardTitle>
                  <CardDescription>Information specific to 3D printers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="printVolume">Print Volume</Label>
                      <Input id="printVolume" placeholder="e.g., 250mm x 250mm x 300mm" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="printerType">Printer Type</Label>
                      <Select defaultValue="FDM">
                        <SelectTrigger>
                          <SelectValue placeholder="Select printer type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FDM">FDM (Fused Deposition Modeling)</SelectItem>
                          <SelectItem value="SLA">SLA (Stereolithography)</SelectItem>
                          <SelectItem value="SLS">SLS (Selective Laser Sintering)</SelectItem>
                          <SelectItem value="DMLS">DMLS (Direct Metal Laser Sintering)</SelectItem>
                          <SelectItem value="MJF">MJF (Multi Jet Fusion)</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="materialType">Material Type</Label>
                      <Select defaultValue="PLA">
                        <SelectTrigger>
                          <SelectValue placeholder="Select material type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PLA">PLA</SelectItem>
                          <SelectItem value="ABS">ABS</SelectItem>
                          <SelectItem value="PETG">PETG</SelectItem>
                          <SelectItem value="TPU">TPU</SelectItem>
                          <SelectItem value="Nylon">Nylon</SelectItem>
                          <SelectItem value="Resin">Resin</SelectItem>
                          <SelectItem value="Metal">Metal</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nozzleDiameter">Nozzle Diameter</Label>
                      <Input id="nozzleDiameter" placeholder="e.g., 0.4mm" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {formData.equipmentType === "CNC Machine" && (
              <Card>
                <CardHeader>
                  <CardTitle>CNC Machine Specific Details</CardTitle>
                  <CardDescription>Information specific to CNC machines</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="workingArea">Working Area</Label>
                      <Input id="workingArea" placeholder="e.g., 1000mm x 500mm x 500mm" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cncType">CNC Type</Label>
                      <Select defaultValue="Mill">
                        <SelectTrigger>
                          <SelectValue placeholder="Select CNC type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Mill">Mill</SelectItem>
                          <SelectItem value="Lathe">Lathe</SelectItem>
                          <SelectItem value="Router">Router</SelectItem>
                          <SelectItem value="EDM">EDM</SelectItem>
                          <SelectItem value="Grinder">Grinder</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="numAxes">Number of Axes</Label>
                      <Select defaultValue="3">
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of axes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2-Axis</SelectItem>
                          <SelectItem value="3">3-Axis</SelectItem>
                          <SelectItem value="4">4-Axis</SelectItem>
                          <SelectItem value="5">5-Axis</SelectItem>
                          <SelectItem value="6+">6+ Axis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="controlSystem">Control System</Label>
                      <Input id="controlSystem" placeholder="e.g., Fanuc, Siemens, Haas" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {formData.equipmentType === "Laser Cutter" && (
              <Card>
                <CardHeader>
                  <CardTitle>Laser Cutter Specific Details</CardTitle>
                  <CardDescription>Information specific to laser cutters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="workingArea">Working Area</Label>
                      <Input id="workingArea" placeholder="e.g., 1200mm x 900mm" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="laserType">Laser Type</Label>
                      <Select defaultValue="CO2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select laser type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CO2">CO2</SelectItem>
                          <SelectItem value="Fiber">Fiber</SelectItem>
                          <SelectItem value="YAG">YAG</SelectItem>
                          <SelectItem value="Diode">Diode</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="laserPower">Laser Power</Label>
                      <Input id="laserPower" placeholder="e.g., 100W" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ventilation">Ventilation System</Label>
                      <Input id="ventilation" placeholder="e.g., External exhaust with filter" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Schedule</CardTitle>
                <CardDescription>Maintenance requirements and schedule</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maintenanceInterval">Maintenance Interval</Label>
                    <div className="flex gap-2">
                      <Input
                        id="maintenanceInterval"
                        type="number"
                        value={formData.maintenanceInterval}
                        onChange={(e) => handleChange("maintenanceInterval", e.target.value)}
                        placeholder="e.g., 90"
                      />
                      <Select
                        value={formData.maintenanceIntervalUnit}
                        onValueChange={(value) => handleChange("maintenanceIntervalUnit", value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">Days</SelectItem>
                          <SelectItem value="weeks">Weeks</SelectItem>
                          <SelectItem value="months">Months</SelectItem>
                          <SelectItem value="years">Years</SelectItem>
                          <SelectItem value="hours">Operating Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maintenanceInstructions">Maintenance Instructions</Label>
                  <Textarea
                    id="maintenanceInstructions"
                    placeholder="Detailed maintenance instructions and requirements"
                    rows={5}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="warrantyInfo">Warranty Information</Label>
                  <Textarea id="warrantyInfo" placeholder="Warranty details, expiration date, and coverage" rows={3} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Contacts</CardTitle>
                <CardDescription>Contact information for service and support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceCompany">Service Company</Label>
                    <Input id="serviceCompany" placeholder="e.g., ABC Maintenance Services" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceContact">Contact Person</Label>
                    <Input id="serviceContact" placeholder="e.g., John Smith" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="servicePhone">Phone Number</Label>
                    <Input id="servicePhone" placeholder="e.g., (555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceEmail">Email</Label>
                    <Input id="serviceEmail" placeholder="e.g., service@example.com" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attachments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Images</CardTitle>
                <CardDescription>Upload images of the equipment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-40">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Drag & drop or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP up to 5MB</p>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Upload manuals, specifications, and other documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center text-center h-40">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Drag & drop or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC, XLS up to 10MB</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
                <CardDescription>Any other relevant information</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Additional notes or comments about this equipment"
                  rows={4}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </form>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline" asChild>
          <Link href="/maintenance/equipment">Cancel</Link>
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>Processing...</>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Equipment
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
