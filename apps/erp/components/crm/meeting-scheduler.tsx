"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Calendar, Clock, Video, MapPin, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

// Mock data for contacts
const contacts = [
  { id: "contact1", name: "John Smith", email: "john@acmeindustries.com", company: "Acme Industries" },
  { id: "contact2", name: "Sarah Johnson", email: "sarah@techpro.com", company: "TechPro Industries" },
  { id: "contact3", name: "Michael Brown", email: "michael@precisioneng.com", company: "Precision Engineering" },
  { id: "contact4", name: "Emily Davis", email: "emily@globalmanufacturing.com", company: "Global Manufacturing" },
  { id: "contact5", name: "David Wilson", email: "david@innovativesolutions.com", company: "Innovative Solutions" },
]

// Mock data for meeting types
const meetingTypes = [
  { id: "discovery", name: "Discovery Call", duration: 30 },
  { id: "demo", name: "Product Demo", duration: 45 },
  { id: "proposal", name: "Proposal Review", duration: 60 },
  { id: "negotiation", name: "Negotiation", duration: 60 },
  { id: "kickoff", name: "Project Kickoff", duration: 90 },
  { id: "custom", name: "Custom Meeting", duration: 60 },
]

export function MeetingScheduler() {
  const [date, setDate] = useState<Date | null>(null)
  const [time, setTime] = useState<string>("")
  const [meetingType, setMeetingType] = useState<string>("")
  const [duration, setDuration] = useState<number>(30)
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [location, setLocation] = useState<string>("video")
  const [videoLink, setVideoLink] = useState<string>("")
  const [physicalLocation, setPhysicalLocation] = useState<string>("")
  const [attendees, setAttendees] = useState<typeof contacts>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [createTask, setCreateTask] = useState<boolean>(true)
  const [sendInvites, setSendInvites] = useState<boolean>(true)
  const [addToGoogle, setAddToGoogle] = useState<boolean>(true)

  const handleMeetingTypeChange = (value: string) => {
    setMeetingType(value)
    const selectedType = meetingTypes.find((type) => type.id === value)
    if (selectedType) {
      setDuration(selectedType.duration)
      if (value !== "custom") {
        setTitle(selectedType.name)
      }
    }
  }

  const handleAddAttendee = (contact: (typeof contacts)[0]) => {
    if (!attendees.some((a) => a.id === contact.id)) {
      setAttendees([...attendees, contact])
    }
  }

  const handleRemoveAttendee = (contactId: string) => {
    setAttendees(attendees.filter((a) => a.id !== contactId))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // In a real implementation, this would create the meeting in your system
    // and sync with Google Calendar if addToGoogle is true
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form or redirect
    setIsSubmitting(false)

    // For demo purposes, we'll just log the meeting data
    console.log({
      title,
      date,
      time,
      duration,
      description,
      location: location === "video" ? videoLink : physicalLocation,
      attendees,
      createTask,
      sendInvites,
      addToGoogle,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Schedule a Meeting</CardTitle>
            {addToGoogle && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Google Calendar
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="meeting-type">Meeting Type</Label>
                <Select value={meetingType} onValueChange={handleMeetingTypeChange}>
                  <SelectTrigger id="meeting-type">
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    {meetingTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name} ({type.duration} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Meeting Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter meeting title"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <DatePicker selected={date} onSelect={setDate} disabled={(date) => date < new Date()} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }).map((_, hour) => (
                      <>
                        <SelectItem key={`${hour}:00`} value={`${hour}:00`}>
                          {hour === 0
                            ? "12:00 AM"
                            : hour < 12
                              ? `${hour}:00 AM`
                              : hour === 12
                                ? "12:00 PM"
                                : `${hour - 12}:00 PM`}
                        </SelectItem>
                        <SelectItem key={`${hour}:30`} value={`${hour}:30`}>
                          {hour === 0
                            ? "12:30 AM"
                            : hour < 12
                              ? `${hour}:30 AM`
                              : hour === 12
                                ? "12:30 PM"
                                : `${hour - 12}:30 PM`}
                        </SelectItem>
                      </>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={duration.toString()} onValueChange={(value) => setDuration(Number.parseInt(value))}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter meeting description and agenda"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                <Button
                  type="button"
                  variant={location === "video" ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => setLocation("video")}
                >
                  <Video className="h-4 w-4" />
                  Video Call
                </Button>
                <Button
                  type="button"
                  variant={location === "physical" ? "default" : "outline"}
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => setLocation("physical")}
                >
                  <MapPin className="h-4 w-4" />
                  Physical Location
                </Button>
              </div>

              {location === "video" ? (
                <div className="mt-2">
                  <Input
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    placeholder="Video conference link (optional)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave empty to automatically generate a Google Meet link
                  </p>
                </div>
              ) : (
                <div className="mt-2">
                  <Input
                    value={physicalLocation}
                    onChange={(e) => setPhysicalLocation(e.target.value)}
                    placeholder="Enter physical address"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Attendees</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {attendees.map((attendee) => (
                  <Badge key={attendee.id} variant="secondary" className="flex items-center gap-1">
                    {attendee.name}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 ml-1 hover:bg-transparent"
                      onClick={() => handleRemoveAttendee(attendee.id)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                ))}

                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="outline" size="sm" className="flex items-center gap-1">
                      <Plus className="h-4 w-4" />
                      Add Attendee
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search contacts..." />
                      <CommandList>
                        <CommandEmpty>No contacts found.</CommandEmpty>
                        <CommandGroup>
                          {contacts
                            .filter((contact) => !attendees.some((a) => a.id === contact.id))
                            .map((contact) => (
                              <CommandItem
                                key={contact.id}
                                onSelect={() => handleAddAttendee(contact)}
                                className="flex flex-col items-start"
                              >
                                <div>{contact.name}</div>
                                <div className="text-xs text-muted-foreground">{contact.email}</div>
                                <div className="text-xs text-muted-foreground">{contact.company}</div>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="create-task">Create follow-up task</Label>
                  <p className="text-xs text-muted-foreground">Automatically create a task after the meeting</p>
                </div>
                <Switch id="create-task" checked={createTask} onCheckedChange={setCreateTask} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="send-invites">Send email invitations</Label>
                  <p className="text-xs text-muted-foreground">Send calendar invites to all attendees</p>
                </div>
                <Switch id="send-invites" checked={sendInvites} onCheckedChange={setSendInvites} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="add-to-google">Add to Google Calendar</Label>
                  <p className="text-xs text-muted-foreground">Sync this meeting with Google Calendar</p>
                </div>
                <Switch id="add-to-google" checked={addToGoogle} onCheckedChange={setAddToGoogle} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Scheduling...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Meeting
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
