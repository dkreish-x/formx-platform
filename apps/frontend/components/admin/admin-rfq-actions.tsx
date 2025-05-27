"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle, AlertCircle, FileText, Send, Download, Trash2 } from "lucide-react"

interface AdminRFQActionsProps {
  rfqId: string
  currentStatus: string
}

export default function AdminRFQActions({ rfqId, currentStatus }: AdminRFQActionsProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to update the status
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Status updated",
        description: `RFQ ${rfqId} status changed to ${newStatus}`,
      })

      // In a real app, this would refresh the data or redirect
      // router.refresh()
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error updating status",
        description: "There was an error updating the status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendQuote = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to send the quote
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Quote sent",
        description: `Quote for RFQ ${rfqId} has been sent to the customer.`,
      })

      // Update status to Approved
      await handleStatusChange("Approved")
    } catch (error) {
      console.error("Error sending quote:", error)
      toast({
        title: "Error sending quote",
        description: "There was an error sending the quote. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteRFQ = async () => {
    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to delete the RFQ
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "RFQ deleted",
        description: `RFQ ${rfqId} has been deleted.`,
      })

      // Redirect to the RFQ dashboard
      router.push("/admin/rfq")
    } catch (error) {
      console.error("Error deleting RFQ:", error)
      toast({
        title: "Error deleting RFQ",
        description: "There was an error deleting the RFQ. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-brand-dark-grey">Change Status</h3>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                disabled={currentStatus === "Draft" || isSubmitting}
                onClick={() => handleStatusChange("Draft")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Mark as Draft
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                disabled={currentStatus === "Needs Review" || isSubmitting}
                onClick={() => handleStatusChange("Needs Review")}
              >
                <AlertCircle className="h-4 w-4 mr-2" />
                Mark as Needs Review
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="justify-start"
                disabled={currentStatus === "Approved" || isSubmitting}
                onClick={() => handleStatusChange("Approved")}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Approved
              </Button>
            </div>
          </div>

          <div className="pt-3 space-y-3">
            <Button
              className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey"
              disabled={isSubmitting}
              onClick={handleSendQuote}
            >
              <Send className="h-4 w-4 mr-1" />
              Send Quote to Customer
            </Button>

            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-1" />
              Download Quote PDF
            </Button>

            <Button
              variant="outline"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete RFQ
            </Button>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete RFQ {rfqId}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRFQ} className="bg-red-600 hover:bg-red-700 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
