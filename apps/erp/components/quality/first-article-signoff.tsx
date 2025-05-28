"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, User, Calendar, PenTool, AlertTriangle, FileCheck } from "lucide-react"

interface FirstArticleSignoffProps {
  travelerId: string
  partNumber: string
  operation: string
}

interface SignoffRecord {
  id: string
  employeeName: string
  employeeId: string
  signature: string
  timestamp: string
  notes: string
  status: "approved" | "rejected"
}

export function FirstArticleSignoff({ travelerId, partNumber, operation }: FirstArticleSignoffProps) {
  const [isSigningOff, setIsSigningOff] = useState(false)
  const [employeeName, setEmployeeName] = useState("")
  const [employeeId, setEmployeeId] = useState("")
  const [notes, setNotes] = useState("")
  const [signature, setSignature] = useState("")

  // Mock existing signoffs - in real app, this would come from API
  const existingSignoffs: SignoffRecord[] = [
    {
      id: "1",
      employeeName: "Sarah Williams",
      employeeId: "EMP-001",
      signature: "Sarah Williams",
      timestamp: "2023-05-02 14:30:00",
      notes: "All dimensions within tolerance. Part meets specifications.",
      status: "approved",
    },
  ]

  const handleSignoff = () => {
    if (!employeeName || !employeeId) {
      alert("Please enter employee name and ID")
      return
    }

    // In real implementation, this would save to API
    console.log("Signing off first article inspection:", {
      travelerId,
      partNumber,
      operation,
      employeeName,
      employeeId,
      signature,
      notes,
      timestamp: new Date().toISOString(),
    })

    // Reset form
    setEmployeeName("")
    setEmployeeId("")
    setNotes("")
    setSignature("")
    setIsSigningOff(false)

    alert("First article inspection signed off successfully!")
  }

  const requiresSignoff = existingSignoffs.length === 0

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
        <div className="flex items-center gap-3">
          {requiresSignoff ? (
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-600" />
          )}
          <div>
            <h3 className="font-medium">First Article Inspection Status</h3>
            <p className="text-sm text-muted-foreground">
              {requiresSignoff ? "Awaiting machinist/technician sign-off" : "Inspection completed and approved"}
            </p>
          </div>
        </div>
        <Badge variant={requiresSignoff ? "warning" : "success"}>
          {requiresSignoff ? "Pending Sign-off" : "Approved"}
        </Badge>
      </div>

      {/* Inspection Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Inspection Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Part Information</Label>
              <div className="mt-1 space-y-1">
                <p className="text-sm">Part Number: {partNumber}</p>
                <p className="text-sm">Operation: {operation}</p>
                <p className="text-sm">Traveler: {travelerId}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">Required Checks</Label>
              <ul className="mt-1 text-sm space-y-1 list-disc pl-4">
                <li>Verify all critical dimensions per drawing</li>
                <li>Check surface finish requirements</li>
                <li>Inspect hole locations and diameters</li>
                <li>Confirm material specifications</li>
                <li>Document any deviations or issues</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing Signoffs */}
      {existingSignoffs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sign-off History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {existingSignoffs.map((signoff) => (
                <div key={signoff.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{signoff.employeeName}</h4>
                          <Badge variant="outline" className="text-xs">
                            {signoff.employeeId}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {new Date(signoff.timestamp).toLocaleString()}
                        </div>
                        {signoff.notes && <p className="mt-2 text-sm">{signoff.notes}</p>}
                      </div>
                    </div>
                    <Badge variant={signoff.status === "approved" ? "success" : "destructive"}>
                      {signoff.status === "approved" ? "Approved" : "Rejected"}
                    </Badge>
                  </div>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <PenTool className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Digital Signature:</span>
                      <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{signoff.signature}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sign-off Form */}
      {requiresSignoff && (
        <Card>
          <CardHeader>
            <CardTitle>Complete First Article Sign-off</CardTitle>
          </CardHeader>
          <CardContent>
            {!isSigningOff ? (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">First Article Inspection Required</h3>
                <p className="text-muted-foreground mb-6">
                  This operation requires a first article inspection sign-off before production can continue.
                </p>
                <Button onClick={() => setIsSigningOff(true)}>
                  <PenTool className="h-4 w-4 mr-2" />
                  Begin Sign-off Process
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employeeName">Employee Name *</Label>
                    <Input
                      id="employeeName"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeeId">Employee ID *</Label>
                    <Input
                      id="employeeId"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      placeholder="Enter your employee ID"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="notes">Inspection Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter any notes about the inspection (optional)"
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="signature">Digital Signature *</Label>
                  <div className="mt-2 border rounded-lg p-4 bg-muted/50">
                    <div className="text-center">
                      <PenTool className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Type your full name as your digital signature
                      </p>
                      <Input
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                        placeholder="Type your full name here"
                        className="max-w-md mx-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsSigningOff(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSignoff} disabled={!employeeName || !employeeId || !signature}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Sign-off
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Sign-off Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">1</span>
              </div>
              <p>Complete the first article inspection according to the drawing specifications</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">2</span>
              </div>
              <p>Verify all critical dimensions are within tolerance</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">3</span>
              </div>
              <p>Enter your employee information and any relevant notes</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">4</span>
              </div>
              <p>Provide your digital signature to complete the sign-off</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
