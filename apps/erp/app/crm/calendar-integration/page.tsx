import { GoogleCalendarIntegration } from "@/components/crm/google-calendar-integration"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Calendar | CRM",
  description: "Google Calendar integration for scheduling and managing meetings",
}

export default function CalendarIntegrationPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/crm">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Calendar Integration</h1>
        </div>
        <Button asChild>
          <Link href="/crm/meetings/new">
            <Clock className="mr-2 h-4 w-4" />
            Schedule Meeting
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="calendar">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Clock className="h-4 w-4 mr-2" />
            Integration Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-6">
          <GoogleCalendarIntegration />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Calendar Sync Settings</h2>
            {/* Calendar settings would go here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
