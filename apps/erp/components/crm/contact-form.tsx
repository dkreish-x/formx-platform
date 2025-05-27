"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"

export interface ContactFormProps {
  customerId?: string
  leadId?: string
  contact?: {
    id?: string
    firstName: string
    lastName: string
    email: string
    phone: string
    mobile?: string
    title: string
    department?: string
    isPrimary: boolean
    notes?: string
    contactMethod?: string
  }
  isEditing?: boolean
}

const defaultContact = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  mobile: "",
  title: "",
  department: "",
  isPrimary: false,
  notes: "",
  contactMethod: "email",
}

export function ContactForm({ customerId, leadId, contact = defaultContact, isEditing = false }: ContactFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState(contact)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, you would save the contact here
    console.log("Saving contact:", formData)

    // Redirect back to the appropriate entity page
    if (customerId) {
      router.push(`/customers/${customerId}`)
    } else if (leadId) {
      router.push(`/leads/${leadId}`)
    } else {
      router.push("/crm")
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Contact" : "Add New Contact"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter last name"
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
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter job title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Enter department"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactMethod">Preferred Contact Method</Label>
              <Select
                value={formData.contactMethod}
                onValueChange={(value) => handleSelectChange("contactMethod", value)}
              >
                <SelectTrigger id="contactMethod">
                  <SelectValue placeholder="Select contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="mobile">Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="isPrimary"
                checked={formData.isPrimary}
                onCheckedChange={(checked) => handleSwitchChange("isPrimary", checked)}
              />
              <Label htmlFor="isPrimary">Primary Contact</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Mark this contact as the primary contact for this {customerId ? "customer" : "lead"}.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any additional notes about this contact"
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (customerId) {
                router.push(`/customers/${customerId}`)
              } else if (leadId) {
                router.push(`/leads/${leadId}`)
              } else {
                router.push("/crm")
              }
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Contact" : "Add Contact"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
