"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertCircle,
  CheckCircle2,
  Download,
  FileText,
  Globe,
  HelpCircle,
  Info,
  Link,
  Plus,
  Search,
  Shield,
  ShieldCheck,
  Upload,
  XCircle,
} from "lucide-react"

export function MaterialComplianceTab({ material }: { material: any }) {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="certifications">Certifications</TabsTrigger>
        <TabsTrigger value="dfars">DFARS Compliance</TabsTrigger>
        <TabsTrigger value="traceability">Traceability</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard" className="mt-6 space-y-6">
        <ComplianceDashboard material={material} />
      </TabsContent>

      <TabsContent value="certifications" className="mt-6 space-y-6">
        <CertificationManager material={material} />
      </TabsContent>

      <TabsContent value="dfars" className="mt-6 space-y-6">
        <DFARSCompliance material={material} />
      </TabsContent>

      <TabsContent value="traceability" className="mt-6 space-y-6">
        <MaterialTraceability material={material} />
      </TabsContent>
    </Tabs>
  )
}

function ComplianceDashboard({ material }: { material: any }) {
  // Mock compliance data
  const complianceData = {
    certifications: {
      status: "verified",
      lastVerified: "2023-04-30",
      verifiedBy: "Quality Manager",
      expirationDate: "2025-04-30",
      documents: 3,
    },
    dfars: {
      status: "compliant",
      lastVerified: "2023-04-30",
      verifiedBy: "Compliance Officer",
      countryOfOrigin: "USA",
      specialtyMetals: true,
      applicableClauses: ["252.225-7009", "252.225-7014"],
    },
    traceability: {
      status: "complete",
      lotNumber: material.lotNumber,
      heatNumber: "HT-78901",
      batchNumber: "B-45678",
      supplierTraceability: true,
      internalTraceability: true,
    },
    sds: {
      status: "available",
      lastUpdated: "2023-01-15",
      hazardClass: "None",
      documents: 1,
    },
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Overview</CardTitle>
          <CardDescription>Material compliance status and verification summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ComplianceStatusCard
              title="Certifications"
              status={complianceData.certifications.status}
              icon={<FileText className="h-5 w-5" />}
              details={[
                { label: "Last Verified", value: complianceData.certifications.lastVerified },
                { label: "Verified By", value: complianceData.certifications.verifiedBy },
                { label: "Expiration", value: complianceData.certifications.expirationDate },
                { label: "Documents", value: `${complianceData.certifications.documents} files` },
              ]}
            />

            <ComplianceStatusCard
              title="DFARS Compliance"
              status={complianceData.dfars.status}
              icon={<Shield className="h-5 w-5" />}
              details={[
                { label: "Last Verified", value: complianceData.dfars.lastVerified },
                { label: "Verified By", value: complianceData.dfars.verifiedBy },
                { label: "Country of Origin", value: complianceData.dfars.countryOfOrigin },
                { label: "Specialty Metals", value: complianceData.dfars.specialtyMetals ? "Yes" : "No" },
              ]}
            />

            <ComplianceStatusCard
              title="Traceability"
              status={complianceData.traceability.status}
              icon={<Link className="h-5 w-5" />}
              details={[
                { label: "Lot Number", value: complianceData.traceability.lotNumber },
                { label: "Heat Number", value: complianceData.traceability.heatNumber },
                { label: "Batch Number", value: complianceData.traceability.batchNumber },
                {
                  label: "Supplier Trace",
                  value: complianceData.traceability.supplierTraceability ? "Complete" : "Incomplete",
                },
              ]}
            />

            <ComplianceStatusCard
              title="SDS Management"
              status={complianceData.sds.status}
              icon={<AlertCircle className="h-5 w-5" />}
              details={[
                { label: "Last Updated", value: complianceData.sds.lastUpdated },
                { label: "Hazard Class", value: complianceData.sds.hazardClass },
                { label: "Documents", value: `${complianceData.sds.documents} files` },
                { label: "", value: "" },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Requirements</CardTitle>
          <CardDescription>Required compliance documentation and verification status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Mill Test Report (MTR)</p>
                  <p className="text-sm text-muted-foreground">Chemical composition and mechanical properties</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Verified
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Certificate of Conformance (CoC)</p>
                  <p className="text-sm text-muted-foreground">Material meets specified requirements</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Verified
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">DFARS Compliance</p>
                  <p className="text-sm text-muted-foreground">Specialty metals and country of origin</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Compliant
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Material Traceability</p>
                  <p className="text-sm text-muted-foreground">Lot, heat, and batch number tracking</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Complete
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Safety Data Sheet (SDS)</p>
                  <p className="text-sm text-muted-foreground">Material safety information</p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Available
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ComplianceStatusCard({
  title,
  status,
  icon,
  details,
}: {
  title: string
  status: string
  icon: React.ReactNode
  details: { label: string; value: string }[]
}) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
      case "compliant":
      case "complete":
      case "available":
        return "bg-green-50 text-green-700 border-green-200"
      case "pending":
      case "partial":
        return "bg-yellow-50 text-yellow-700 border-yellow-200"
      case "expired":
      case "non-compliant":
      case "incomplete":
      case "unavailable":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
      case "compliant":
      case "complete":
      case "available":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "pending":
      case "partial":
        return <HelpCircle className="h-4 w-4 text-yellow-500" />
      case "expired":
      case "non-compliant":
      case "incomplete":
      case "unavailable":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="border rounded-md p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-medium">{title}</h3>
        </div>
        <Badge variant="outline" className={getStatusColor(status)}>
          <span className="flex items-center gap-1">
            {getStatusIcon(status)}
            <span className="capitalize">{status}</span>
          </span>
        </Badge>
      </div>
      <div className="space-y-1 pt-2">
        {details.map((detail, index) =>
          detail.label ? (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{detail.label}</span>
              <span className="font-medium">{detail.value}</span>
            </div>
          ) : null,
        )}
      </div>
    </div>
  )
}

function CertificationManager({ material }: { material: any }) {
  // Mock certification data
  const certifications = [
    {
      id: "CERT-001",
      type: "Mill Test Report",
      issuer: "Metal Suppliers Inc.",
      issueDate: "2023-04-28",
      expirationDate: "2025-04-28",
      verificationStatus: "Verified",
      verifiedBy: "John Smith",
      verificationDate: "2023-04-30",
      fileName: "Material_Certification.pdf",
      properties: {
        chemicalComposition: {
          Si: "0.60%",
          Fe: "0.70%",
          Cu: "0.28%",
          Mn: "0.15%",
          Mg: "1.0%",
          Cr: "0.20%",
          Zn: "0.25%",
          Ti: "0.15%",
          Al: "Balance",
        },
        mechanicalProperties: {
          tensileStrength: "42,000 psi",
          yieldStrength: "35,000 psi",
          elongation: "8%",
          hardness: "Brinell 95",
        },
      },
    },
    {
      id: "CERT-002",
      type: "Certificate of Conformance",
      issuer: "Metal Suppliers Inc.",
      issueDate: "2023-04-28",
      expirationDate: "2025-04-28",
      verificationStatus: "Verified",
      verifiedBy: "Jane Doe",
      verificationDate: "2023-04-30",
      fileName: "Certificate_of_Conformance.pdf",
      standards: ["AMS 4027", "ASTM B209", "QQ-A-250/11"],
    },
    {
      id: "CERT-003",
      type: "Safety Data Sheet",
      issuer: "Metal Suppliers Inc.",
      issueDate: "2023-01-15",
      expirationDate: "2026-01-15",
      verificationStatus: "Verified",
      verifiedBy: "Safety Officer",
      verificationDate: "2023-01-20",
      fileName: "Safety_Data_Sheet.pdf",
      hazardInformation: {
        hazardClass: "None",
        signalWord: "None",
        precautionaryStatements: "None required for this material",
      },
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Material Certifications</CardTitle>
            <CardDescription>Manage and verify material certifications and test reports</CardDescription>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Certification
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div key={cert.id} className="border rounded-md overflow-hidden">
                <div className="flex items-center justify-between p-4 bg-muted/20">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{cert.type}</h3>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} • Issued: {cert.issueDate} • Expires: {cert.expirationDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {cert.verificationStatus}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                {cert.type === "Mill Test Report" && (
                  <div className="p-4 border-t">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Chemical Composition</h4>
                        <div className="space-y-1">
                          {Object.entries(cert.properties.chemicalComposition).map(([element, value]) => (
                            <div key={element} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{element}</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Mechanical Properties</h4>
                        <div className="space-y-1">
                          {Object.entries(cert.properties.mechanicalProperties).map(([property, value]) => (
                            <div key={property} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">
                                {property.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                              </span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {cert.type === "Certificate of Conformance" && (
                  <div className="p-4 border-t">
                    <h4 className="font-medium mb-2">Standards & Specifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.standards.map((standard) => (
                        <Badge key={standard} variant="secondary">
                          {standard}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {cert.type === "Safety Data Sheet" && (
                  <div className="p-4 border-t">
                    <h4 className="font-medium mb-2">Hazard Information</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Hazard Class</span>
                        <span className="font-medium">{cert.hazardInformation.hazardClass}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Signal Word</span>
                        <span className="font-medium">{cert.hazardInformation.signalWord}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Precautionary Statements</span>
                        <span className="font-medium">{cert.hazardInformation.precautionaryStatements}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-4 border-t bg-muted/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verification</span>
                    <span className="font-medium">
                      Verified by {cert.verifiedBy} on {cert.verificationDate}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New Certification</CardTitle>
          <CardDescription>Upload and verify a new material certification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cert-type">Certification Type</Label>
                <Select defaultValue="mtr">
                  <SelectTrigger id="cert-type">
                    <SelectValue placeholder="Select certification type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mtr">Mill Test Report (MTR)</SelectItem>
                    <SelectItem value="coc">Certificate of Conformance (CoC)</SelectItem>
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
              <Button>Upload & Verify</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DFARSCompliance({ material }: { material: any }) {
  // Mock DFARS data
  const dfarsData = {
    status: "Compliant",
    lastVerified: "2023-04-30",
    verifiedBy: "Compliance Officer",
    countryOfOrigin: "USA",
    specialtyMetals: true,
    applicableClauses: [
      {
        clause: "252.225-7009",
        title: "Restriction on Acquisition of Certain Articles Containing Specialty Metals",
        compliance: "Compliant",
        notes: "Material is domestically melted specialty metal",
      },
      {
        clause: "252.225-7014",
        title: "Preference for Domestic Specialty Metals",
        compliance: "Compliant",
        notes: "Material meets all requirements",
      },
    ],
    supplierCertifications: [
      {
        id: "DFARS-CERT-001",
        supplier: "Metal Suppliers Inc.",
        date: "2023-04-28",
        status: "Verified",
        fileName: "DFARS_Compliance_Certificate.pdf",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>DFARS Compliance Status</CardTitle>
              <CardDescription>
                Defense Federal Acquisition Regulation Supplement compliance information
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <ShieldCheck className="h-3 w-3 mr-1" />
              {dfarsData.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Material Origin</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Country of Origin</span>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="font-medium">{dfarsData.countryOfOrigin}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Specialty Metals</span>
                    <span className="font-medium">
                      {dfarsData.specialtyMetals ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Yes
                        </span>
                      ) : (
                        <span className="flex items-center text-red-600">
                          <XCircle className="h-4 w-4 mr-1" />
                          No
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Verified</span>
                    <span className="font-medium">{dfarsData.lastVerified}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Verified By</span>
                    <span className="font-medium">{dfarsData.verifiedBy}</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Supplier Certifications</h3>
                {dfarsData.supplierCertifications.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-center p-2 border rounded-md">
                    <div>
                      <p className="text-sm font-medium">{cert.supplier}</p>
                      <p className="text-xs text-muted-foreground">
                        {cert.date} • {cert.fileName}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {cert.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Supplier Certification
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Applicable DFARS Clauses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dfarsData.applicableClauses.map((clause) => (
                    <div key={clause.clause} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{clause.clause}</h4>
                          <p className="text-sm text-muted-foreground">{clause.title}</p>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {clause.compliance}
                        </Badge>
                      </div>
                      {clause.notes && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Notes: </span>
                          <span>{clause.notes}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button>
                <ShieldCheck className="h-4 w-4 mr-2" />
                Verify Compliance
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>DFARS Compliance Requirements</CardTitle>
          <CardDescription>Information about DFARS requirements for this material</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">
                252.225-7009 - Restriction on Acquisition of Certain Articles Containing Specialty Metals
              </h3>
              <p className="text-sm mb-2">
                This clause restricts the acquisition of certain items containing specialty metals not melted or
                produced in the United States or qualifying countries.
              </p>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Applies to: </span>End items and components containing specialty metals
                </p>
                <p>
                  <span className="font-medium">Requirements: </span>Specialty metals must be melted or produced in the
                  United States or a qualifying country
                </p>
                <p>
                  <span className="font-medium">Exceptions: </span>Commercial off-the-shelf (COTS) items, electronic
                  components, certain fasteners
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">252.225-7014 - Preference for Domestic Specialty Metals</h3>
              <p className="text-sm mb-2">
                This clause establishes a preference for domestic specialty metals in defense acquisitions.
              </p>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Applies to: </span>Items containing specialty metals
                </p>
                <p>
                  <span className="font-medium">Requirements: </span>Preference for specialty metals melted in the
                  United States
                </p>
                <p>
                  <span className="font-medium">Documentation: </span>Supplier certification of domestic melting
                  required
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MaterialTraceability({ material }: { material: any }) {
  // Mock traceability data
  const traceabilityData = {
    materialIdentifiers: {
      lotNumber: material.lotNumber,
      heatNumber: "HT-78901",
      batchNumber: "B-45678",
      serialNumber: "SN-123456",
      purchaseOrder: "PO-2023-0098",
      receivedDate: "2023-04-28",
    },
    supplier: {
      name: "Metal Suppliers Inc.",
      supplierLotNumber: "SUP-LOT-98765",
      supplierHeatNumber: "SUP-HT-54321",
      millSource: "US Steel Mill",
      countryOfOrigin: "USA",
    },
    allocations: [
      {
        id: "ALLOC-2023-0142",
        project: "Acme Robotics Automation",
        workOrder: "WO-2023-0542",
        part: "Bracket Assembly",
        quantity: "5 sheets",
        allocatedDate: "2023-05-01",
        allocatedBy: "John Doe",
        status: "In Production",
      },
      {
        id: "ALLOC-2023-0143",
        project: "TechCorp Medical Device",
        workOrder: "WO-2023-0543",
        part: "Mounting Plate",
        quantity: "3 sheets",
        allocatedDate: "2023-05-03",
        allocatedBy: "Sarah Williams",
        status: "Completed",
      },
    ],
    genealogy: {
      rawMaterial: {
        type: "Aluminum Ingot",
        supplier: "Aluminum Producer Inc.",
        lotNumber: "ING-LOT-12345",
        heatNumber: "ING-HT-67890",
      },
      processing: [
        {
          process: "Melting",
          date: "2023-03-15",
          facility: "US Steel Mill",
          lotNumber: "MELT-LOT-54321",
        },
        {
          process: "Rolling",
          date: "2023-03-20",
          facility: "US Steel Mill",
          lotNumber: "ROLL-LOT-98765",
        },
        {
          process: "Heat Treatment",
          date: "2023-03-25",
          facility: "US Steel Mill",
          lotNumber: "HT-LOT-24680",
        },
      ],
    },
    chainOfCustody: [
      {
        entity: "Aluminum Producer Inc.",
        role: "Raw Material Producer",
        date: "2023-03-10",
        documentation: "Raw Material Certificate",
      },
      {
        entity: "US Steel Mill",
        role: "Material Processor",
        date: "2023-03-25",
        documentation: "Mill Test Report",
      },
      {
        entity: "Metal Suppliers Inc.",
        role: "Distributor",
        date: "2023-04-15",
        documentation: "Certificate of Conformance",
      },
      {
        entity: "FormX Manufacturing",
        role: "End User",
        date: "2023-04-28",
        documentation: "Receiving Inspection Report",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Material Identification</CardTitle>
          <CardDescription>Unique identifiers for material traceability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Internal Identifiers</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Lot Number</span>
                  <span className="font-medium">{traceabilityData.materialIdentifiers.lotNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Heat Number</span>
                  <span className="font-medium">{traceabilityData.materialIdentifiers.heatNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Batch Number</span>
                  <span className="font-medium">{traceabilityData.materialIdentifiers.batchNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Serial Number</span>
                  <span className="font-medium">{traceabilityData.materialIdentifiers.serialNumber}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Supplier Information</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Supplier</span>
                  <span className="font-medium">{traceabilityData.supplier.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Supplier Lot #</span>
                  <span className="font-medium">{traceabilityData.supplier.supplierLotNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Supplier Heat #</span>
                  <span className="font-medium">{traceabilityData.supplier.supplierHeatNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mill Source</span>
                  <span className="font-medium">{traceabilityData.supplier.millSource}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Receiving Information</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Purchase Order</span>
                  <span className="font-medium">{traceabilityData.materialIdentifiers.purchaseOrder}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Received Date</span>
                  <span className="font-medium">{traceabilityData.materialIdentifiers.receivedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Country of Origin</span>
                  <span className="font-medium">{traceabilityData.supplier.countryOfOrigin}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Material Genealogy</CardTitle>
          <CardDescription>Complete history of material from raw material to current state</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Raw Material</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Material Type</span>
                    <span className="font-medium">{traceabilityData.genealogy.rawMaterial.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Supplier</span>
                    <span className="font-medium">{traceabilityData.genealogy.rawMaterial.supplier}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lot Number</span>
                    <span className="font-medium">{traceabilityData.genealogy.rawMaterial.lotNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Heat Number</span>
                    <span className="font-medium">{traceabilityData.genealogy.rawMaterial.heatNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Processing History</h3>
              <div className="space-y-3">
                {traceabilityData.genealogy.processing.map((process, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-grow border rounded-md p-2">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Process</p>
                          <p className="text-sm font-medium">{process.process}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="text-sm font-medium">{process.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Facility</p>
                          <p className="text-sm font-medium">{process.facility}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Lot Number</p>
                          <p className="text-sm font-medium">{process.lotNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Chain of Custody</h3>
              <div className="space-y-3">
                {traceabilityData.chainOfCustody.map((entity, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-grow border rounded-md p-2">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Entity</p>
                          <p className="text-sm font-medium">{entity.entity}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Role</p>
                          <p className="text-sm font-medium">{entity.role}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Date</p>
                          <p className="text-sm font-medium">{entity.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Documentation</p>
                          <p className="text-sm font-medium">{entity.documentation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Material Allocations</CardTitle>
          <CardDescription>Work orders and projects using this material</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {traceabilityData.allocations.map((allocation) => (
              <div key={allocation.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{allocation.project}</h3>
                    <p className="text-sm text-muted-foreground">
                      {allocation.workOrder} • {allocation.part}
                    </p>
                  </div>
                  <Badge variant={allocation.status === "Completed" ? "success" : "outline"}>{allocation.status}</Badge>
                </div>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Quantity: </span>
                    <span className="font-medium">{allocation.quantity}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Allocated Date: </span>
                    <span className="font-medium">{allocation.allocatedDate}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Allocated By: </span>
                    <span className="font-medium">{allocation.allocatedBy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Traceability Report
        </Button>
        <Button>
          <Search className="h-4 w-4 mr-2" />
          Trace Material
        </Button>
      </div>
    </div>
  )
}
