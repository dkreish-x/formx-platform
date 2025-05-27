"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createLead, updateLead } from "@/app/actions/lead-actions"

// Define the Lead type
export interface Lead {
  id?: string
  company: string
  contact: string
  title: string
  email: string
  phone: string
  source: string
  status: string
  assignedTo: string
  notes: string
  nextFollowUp?: string
}

interface LeadFormProps {
  lead?: Lead
  isEditing?: boolean
}

const defaultLead: Lead = {
  company: "",
  contact: "",
  title: "",
  email: "",
  phone: "",
  source: "Website",
  status: "New",
  assignedTo: "",
  notes: "",
  nextFollowUp: new Date().toISOString().split("T")[0],
}

export function LeadForm({ lead = defaultLead, isEditing = false }: LeadFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Lead>(lead)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create a FormData object from the form data
      const formDataObj = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined) {
          formDataObj.append(key, value.toString())
        }
      })

      // Call the appropriate server action
      const result = isEditing && lead.id ? await updateLead(lead.id, formDataObj) : await createLead(formDataObj)

      if (result.success) {
        toast({
          title: isEditing ? "Lead updated" : "Lead created",
          description: result.message,
        })

        // Redirect to the leads list or the lead detail page
        router.push(isEditing && lead.id ? `/leads/${lead.id}` : "/leads")
        router.refresh() // Refresh the page to show the updated data
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting lead:", error)
      toast({
        title: "Error",
        description: "There was a problem saving the lead. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={isEditing && lead.id ? `/leads/${lead.id}` : "/leads"}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <CardTitle>{isEditing ? "Edit Lead" : "Create New Lead"}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Person *</Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Enter contact name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter job title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="source">Lead Source *</Label>
              <Select value={formData.source} onValueChange={(value) => handleSelectChange("source", value)}>
                <SelectTrigger id="source">
                  <SelectValue placeholder="Select lead source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Website">Website</SelectItem>
                  <SelectItem value="Referral">Referral</SelectItem>
                  <SelectItem value="Trade Show">Trade Show</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Cold Call">Cold Call</SelectItem>
                  <SelectItem value="Email Campaign">Email Campaign</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New">New</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Qualified">Qualified</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                  <SelectItem value="Won">Won</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To *</Label>
              <Select value={formData.assignedTo} onValueChange={(value) => handleSelectChange("assignedTo", value)}>
                <SelectTrigger id="assignedTo">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jane Doe">Jane Doe</SelectItem>
                  <SelectItem value="John Smith">John Smith</SelectItem>
                  <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                  <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="David Chen">David Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nextFollowUp">Next Follow-up Date</Label>
              <Input
                id="nextFollowUp"
                name="nextFollowUp"
                type="date"
                value={formData.nextFollowUp}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Enter any additional notes about this lead"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(isEditing && lead.id ? `/leads/${lead.id}` : "/leads")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Lead" : "Create Lead"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
