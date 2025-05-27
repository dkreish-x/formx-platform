"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"

interface ReferralFormProps {
  partnerCode?: string
}

export function ReferralForm({ partnerCode }: ReferralFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would submit to your API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate a successful submission
      toast({
        title: "Referral submitted successfully",
        description: `Your referral for ${customerName} has been received.`,
      })

      // Reset form
      setCustomerName("")
      setCustomerEmail("")
      setCompanyName("")
      setDescription("")
      setFile(null)
    } catch (error) {
      toast({
        title: "Error submitting referral",
        description: "There was a problem submitting your referral. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customerName">Customer Name</Label>
        <Input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="customerEmail">Customer Email</Label>
        <Input
          id="customerEmail"
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="customer@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Acme Inc."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description of Job or Opportunity</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please describe the manufacturing needs and any specific requirements..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file">Upload File (Optional)</Label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("file")?.click()}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {file ? "Change File" : "Select File"}
          </Button>
          {file && <span className="text-sm text-muted-foreground truncate max-w-[200px]">{file.name}</span>}
        </div>
        <input id="file" type="file" onChange={handleFileChange} accept=".pdf,.step,.dxf" className="hidden" />
        <p className="text-xs text-muted-foreground">Accepted formats: PDF, STEP, DXF (Max 10MB)</p>
      </div>

      <input type="hidden" name="partnerCode" value={partnerCode} />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Referral"
        )}
      </Button>
    </form>
  )
}
