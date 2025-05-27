import type { Metadata } from "next"
import { Calendar, Clock, FileText, Users, Plus } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Meetings | CRM",
  description: "Manage and schedule meetings with customers and prospects",
}

export default function MeetingsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Meetings</h1>
          <p className="text-muted-foreground">
            Schedule, manage, and take notes for meetings with customers and prospects
          </p>
        </div>
        <Button asChild>
          <Link href="/crm/meetings/new">
            <Plus className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="notes">Meeting Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingMeetings.map((meeting, index) => (
              <MeetingCard key={index} meeting={meeting} isPast={false} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastMeetings.map((meeting, index) => (
              <MeetingCard key={index} meeting={meeting} isPast={true} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="notes" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {meetingNotes.map((note, index) => (
              <NoteCard key={index} note={note} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface Meeting {
  id: string
  title: string
  date: string
  time: string
  duration: string
  attendees: string[]
  type: string
  related: string
}

function MeetingCard({ meeting, isPast }: { meeting: Meeting; isPast: boolean }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{meeting.title}</CardTitle>
          <Badge variant={isPast ? "outline" : "default"}>{meeting.type}</Badge>
        </div>
        <CardDescription>
          {meeting.date} • {meeting.time} ({meeting.duration})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{meeting.attendees.join(", ")}</span>
          </div>
          <div className="flex items-center text-sm">
            <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Related to: {meeting.related}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isPast ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={`/crm/meetings/${meeting.id}/notes`}>
              <FileText className="mr-2 h-4 w-4" />
              View Notes
            </Link>
          </Button>
        ) : (
          <>
            <Button variant="outline" size="sm">
              Reschedule
            </Button>
            <Button size="sm">Join Meeting</Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

interface Note {
  id: string
  title: string
  date: string
  meeting: string
  summary: string
  actionItems: number
}

function NoteCard({ note }: { note: Note }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{note.title}</CardTitle>
        <CardDescription>{note.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Meeting: {note.meeting}</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{note.summary}</p>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{note.actionItems} action items</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/crm/meetings/notes/${note.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Sample data
const upcomingMeetings: Meeting[] = [
  {
    id: "meeting-001",
    title: "Product Demo with Acme Corp",
    date: "May 12, 2025",
    time: "10:00 AM",
    duration: "45 min",
    attendees: ["John Smith", "Sarah Johnson"],
    type: "Video Call",
    related: "Acme Corp - Manufacturing Software Deal",
  },
  {
    id: "meeting-002",
    title: "Follow-up with TechSolutions",
    date: "May 13, 2025",
    time: "2:30 PM",
    duration: "30 min",
    attendees: ["Mike Williams", "Lisa Chen"],
    type: "Phone Call",
    related: "TechSolutions - Maintenance Contract",
  },
  {
    id: "meeting-003",
    title: "Initial Consultation with NewCo",
    date: "May 15, 2025",
    time: "11:00 AM",
    duration: "60 min",
    attendees: ["David Lee", "Emma Wilson", "Robert Taylor"],
    type: "In Person",
    related: "NewCo - Potential Client",
  },
]

const pastMeetings: Meeting[] = [
  {
    id: "meeting-004",
    title: "Quarterly Review with MegaCorp",
    date: "May 5, 2025",
    time: "9:00 AM",
    duration: "90 min",
    attendees: ["Alex Johnson", "Maria Garcia"],
    type: "Video Call",
    related: "MegaCorp - Enterprise Agreement",
  },
  {
    id: "meeting-005",
    title: "Requirements Gathering with StartupX",
    date: "May 3, 2025",
    time: "3:00 PM",
    duration: "60 min",
    attendees: ["James Wilson", "Sophia Lee"],
    type: "Video Call",
    related: "StartupX - Custom Implementation",
  },
]

const meetingNotes: Note[] = [
  {
    id: "note-001",
    title: "MegaCorp Quarterly Review",
    date: "May 5, 2025",
    meeting: "Quarterly Review with MegaCorp",
    summary: "Discussed Q2 goals and implementation timeline. Client expressed interest in additional modules.",
    actionItems: 4,
  },
  {
    id: "note-002",
    title: "StartupX Requirements",
    date: "May 3, 2025",
    meeting: "Requirements Gathering with StartupX",
    summary: "Identified key requirements for custom implementation. Need to follow up with technical specifications.",
    actionItems: 6,
  },
  {
    id: "note-003",
    title: "GlobalTech Integration Planning",
    date: "April 28, 2025",
    meeting: "Integration Planning with GlobalTech",
    summary: "Mapped out API integration points and data flow. Development team to create technical specification.",
    actionItems: 3,
  },
]
