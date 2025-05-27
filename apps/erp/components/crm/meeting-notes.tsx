"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, FileText, Save, Plus, Check, X } from "lucide-react"
import { format } from "date-fns"

// Mock meeting data
const meetingData = {
  id: "meeting-001",
  title: "Discovery Call with Acme Industries",
  date: new Date(2023, 4, 15, 10, 0),
  duration: 60,
  attendees: [
    { id: "user-001", name: "Jane Doe", email: "jane@formx.com", role: "Sales Representative" },
    { id: "contact-001", name: "John Smith", email: "john@acmeindustries.com", role: "Procurement Manager" },
    { id: "contact-002", name: "Robert Johnson", email: "robert@acmeindustries.com", role: "Engineering Lead" },
  ],
  relatedTo: {
    type: "opportunity",
    id: "OPP-001",
    name: "Custom Machining Project",
  },
}

export function MeetingNotes({ meetingId = "meeting-001" }: { meetingId?: string }) {
  const meeting = meetingData // In a real app, you would fetch this based on meetingId
  const [notes, setNotes] = useState<string>("")
  const [actionItems, setActionItems] = useState<
    Array<{ id: string; text: string; assignee: string; completed: boolean }>
  >([
    { id: "action-1", text: "Send product specifications", assignee: "jane-doe", completed: false },
    { id: "action-2", text: "Schedule follow-up meeting", assignee: "jane-doe", completed: false },
  ])
  const [newActionItem, setNewActionItem] = useState<string>("")
  const [newActionAssignee, setNewActionAssignee] = useState<string>("jane-doe")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [outcome, setOutcome] = useState<string>("follow-up")

  const handleAddActionItem = () => {
    if (newActionItem.trim()) {
      setActionItems([
        ...actionItems,
        {
          id: `action-${Date.now()}`,
          text: newActionItem,
          assignee: newActionAssignee,
          completed: false,
        },
      ])
      setNewActionItem("")
    }
  }

  const handleToggleActionItem = (id: string) => {
    setActionItems(actionItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const handleRemoveActionItem = (id: string) => {
    setActionItems(actionItems.filter((item) => item.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real implementation, this would save the meeting notes to your CRM
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, we'll just log the data
    console.log({
      meetingId,
      notes,
      actionItems,
      outcome,
    })

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-1.5">
            <CardTitle>Meeting Notes</CardTitle>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(meeting.date, "MMM d, yyyy")}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {format(meeting.date, "h:mm a")} ({meeting.duration} min)
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                {meeting.relatedTo.type}: {meeting.relatedTo.name}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="notes">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="action-items">Action Items</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="meeting-notes">Meeting Notes</Label>
                <Textarea
                  id="meeting-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter detailed notes from the meeting..."
                  rows={10}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="meeting-outcome">Meeting Outcome</Label>
                <Select value={outcome} onValueChange={setOutcome}>
                  <SelectTrigger id="meeting-outcome">
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="follow-up">Follow-up Required</SelectItem>
                    <SelectItem value="proposal">Send Proposal</SelectItem>
                    <SelectItem value="demo">Schedule Demo</SelectItem>
                    <SelectItem value="closed-won">Closed Won</SelectItem>
                    <SelectItem value="closed-lost">Closed Lost</SelectItem>
                    <SelectItem value="no-opportunity">No Opportunity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="action-items" className="space-y-4 pt-4">
              <div className="space-y-4">
                <Label>Action Items</Label>

                <div className="space-y-2">
                  {actionItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 p-2 border rounded-md">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-6 w-6 rounded-full",
                          item.completed ? "bg-green-100 text-green-700" : "bg-muted",
                        )}
                        onClick={() => handleToggleActionItem(item.id)}
                      >
                        {item.completed && <Check className="h-3 w-3" />}
                      </Button>
                      <span className={cn("flex-1", item.completed && "line-through text-muted-foreground")}>
                        {item.text}
                      </span>
                      <Badge variant="outline" className="ml-auto mr-2">
                        {item.assignee === "jane-doe" ? "Jane Doe" : "Other"}
                      </Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveActionItem(item.id)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      value={newActionItem}
                      onChange={(e) => setNewActionItem(e.target.value)}
                      placeholder="Add a new action item..."
                      className="w-full"
                    />
                  </div>
                  <Select value={newActionAssignee} onValueChange={setNewActionAssignee}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jane-doe">Jane Doe</SelectItem>
                      <SelectItem value="john-smith">John Smith</SelectItem>
                      <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={handleAddActionItem} size="icon">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add</span>
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Meeting Details</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-muted-foreground">Title</span>
                      <span className="font-medium">{meeting.title}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-muted-foreground">Date & Time</span>
                      <span className="font-medium">
                        {format(meeting.date, "MMM d, yyyy")} at {format(meeting.date, "h:mm a")}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{meeting.duration} minutes</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-muted-foreground">Related To</span>
                      <span className="font-medium">
                        {meeting.relatedTo.type}: {meeting.relatedTo.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Attendees</h3>
                  <div className="mt-2 space-y-2">
                    {meeting.attendees.map((attendee) => (
                      <div key={attendee.id} className="flex justify-between py-1 border-b">
                        <span>{attendee.name}</span>
                        <span className="text-sm text-muted-foreground">{attendee.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">
                    Action Items ({actionItems.filter((item) => !item.completed).length} pending)
                  </h3>
                  <div className="mt-2 space-y-2">
                    {actionItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 py-1 border-b">
                        <div className={cn("h-2 w-2 rounded-full", item.completed ? "bg-green-500" : "bg-amber-500")} />
                        <span className={cn(item.completed && "line-through text-muted-foreground")}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Notes
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
