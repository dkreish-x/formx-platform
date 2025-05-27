import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Plus, ChevronLeft, ChevronRight, Calendar, List } from "lucide-react"

export default function CalendarPage() {
  // Sample data for calendar events
  const events = [
    {
      id: "EVENT-001",
      title: "Meeting with Acme Industries",
      type: "meeting",
      date: "2023-05-15",
      time: "10:00 AM",
      duration: "1 hour",
      location: "Client Office",
      description: "Discuss custom machining project",
      attendees: ["Jane Doe", "John Smith", "Robert Johnson"],
      relatedTo: {
        type: "Customer",
        id: "CUST-001",
        name: "Acme Industries",
      },
    },
    {
      id: "EVENT-002",
      title: "Call with TechPro Industries",
      type: "call",
      date: "2023-05-15",
      time: "2:15 PM",
      duration: "30 minutes",
      description: "Follow up on latest quote",
      attendees: ["Mike Wilson", "Sarah Johnson"],
      relatedTo: {
        type: "Customer",
        id: "CUST-002",
        name: "TechPro Industries",
      },
    },
    {
      id: "EVENT-003",
      title: "Send Proposal",
      type: "task",
      date: "2023-05-16",
      time: "9:00 AM",
      description: "Send proposal for custom machining project to Precision Engineering",
      assignedTo: "Jane Doe",
      relatedTo: {
        type: "Customer",
        id: "CUST-004",
        name: "Precision Engineering",
      },
    },
    {
      id: "EVENT-004",
      title: "Site Visit",
      type: "meeting",
      date: "2023-05-17",
      time: "10:00 AM",
      duration: "3 hours",
      location: "Global Fabrication Facility",
      description: "Visit Global Fabrication facility to assess automation needs",
      attendees: ["Jane Doe", "Mike Wilson", "David Lee"],
      relatedTo: {
        type: "Lead",
        id: "LEAD-003",
        name: "Global Manufacturing",
      },
    },
  ]

  // Current month and year
  const currentMonth = "May"
  const currentYear = "2023"

  // Generate calendar days
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  // Dummy first day of month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = 1 // Monday

  // Create empty slots for days before the first day of the month
  const emptySlots = Array.from({ length: firstDayOfMonth }, (_, i) => null)

  // Combine empty slots and days
  const calendarDays = [...emptySlots, ...days]

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Schedule and manage your appointments and tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/crm/calendar/new-event">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="mx-4 text-xl font-semibold">
                  {currentMonth} {currentYear}
                </div>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm">
                Today
              </Button>
            </div>
            <Tabs defaultValue="month">
              <TabsList>
                <TabsTrigger value="month">
                  <Calendar className="h-4 w-4 mr-2" />
                  Month
                </TabsTrigger>
                <TabsTrigger value="list">
                  <List className="h-4 w-4 mr-2" />
                  List
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="month">
            <TabsContent value="month" className="mt-4">
              <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center font-medium py-2 text-sm">
                    {day}
                  </div>
                ))}
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] border rounded-md p-1 ${
                      day === 15 ? "bg-primary/5 border-primary/20" : ""
                    } ${day === null ? "bg-muted/20" : "hover:bg-muted/10"} relative`}
                  >
                    {day !== null && (
                      <>
                        <div className={`text-right ${day === 15 ? "font-bold" : ""}`}>{day}</div>
                        {day === 15 && (
                          <div className="mt-1 space-y-1">
                            <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 truncate">
                              10:00 AM - Meeting with Acme
                            </div>
                            <div className="text-xs bg-green-100 text-green-800 rounded px-1 py-0.5 truncate">
                              2:15 PM - Call with TechPro
                            </div>
                          </div>
                        )}
                        {day === 16 && (
                          <div className="mt-1 space-y-1">
                            <div className="text-xs bg-amber-100 text-amber-800 rounded px-1 py-0.5 truncate">
                              9:00 AM - Send Proposal
                            </div>
                          </div>
                        )}
                        {day === 17 && (
                          <div className="mt-1 space-y-1">
                            <div className="text-xs bg-purple-100 text-purple-800 rounded px-1 py-0.5 truncate">
                              10:00 AM - Site Visit
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="list" className="mt-4">
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex border rounded-md overflow-hidden">
                    <div className="w-2 bg-primary"></div>
                    <div className="p-4 flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {event.date} • {event.time} {event.duration && `• ${event.duration}`}
                      </div>
                      {event.location && <div className="text-sm mt-1">Location: {event.location}</div>}
                      <div className="text-sm mt-2">{event.description}</div>
                      {event.relatedTo && (
                        <div className="text-sm text-primary mt-2">
                          <Link href={`/${event.relatedTo.type.toLowerCase()}s/${event.relatedTo.id}`}>
                            {event.relatedTo.type}: {event.relatedTo.name}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
