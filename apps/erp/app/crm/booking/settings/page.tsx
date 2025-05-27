"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AvailabilitySelector } from "@/components/booking/availability-selector"
import { ShareableLink } from "@/components/booking/shareable-link-generator"
import { BookingPagePreview } from "@/components/booking/booking-page-preview"
import { ArrowLeft, Calendar, Clock, Link2, Settings, Users } from "lucide-react"
import Link from "next/link"

export default function BookingSettingsPage() {
  const [pageTitle, setPageTitle] = useState("Book a Meeting with John Doe")
  const [pageDescription, setPageDescription] = useState(
    "Select a time slot that works for you, and I'll get back to you with a confirmation.",
  )
  const [username, setUsername] = useState("johndoe")
  const [meetingTypes, setMeetingTypes] = useState([
    { id: "1", name: "15 Minute Meeting", duration: 15, description: "Quick chat or introduction" },
    { id: "2", name: "30 Minute Meeting", duration: 30, description: "Product demo or consultation" },
    { id: "3", name: "60 Minute Meeting", duration: 60, description: "In-depth discussion or planning session" },
  ])
  const [selectedTheme, setSelectedTheme] = useState("default")
  const [bufferTime, setBufferTime] = useState("15")
  const [maxBookingsPerDay, setMaxBookingsPerDay] = useState("5")
  const [collectName, setCollectName] = useState(true)
  const [collectEmail, setCollectEmail] = useState(true)
  const [collectPhone, setCollectPhone] = useState(false)
  const [collectCompany, setCollectCompany] = useState(true)
  const [collectMessage, setCollectMessage] = useState(true)
  const [redirectUrl, setRedirectUrl] = useState("")
  const [confirmationEmail, setConfirmationEmail] = useState(true)
  const [reminderEmail, setReminderEmail] = useState(true)
  const [reminderTime, setReminderTime] = useState("60")

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
          <h1 className="text-3xl font-bold tracking-tight">Booking Page Settings</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/booking/${username}`} target="_blank">
              <Link2 className="mr-2 h-4 w-4" />
              Preview
            </Link>
          </Button>
          <Button>Save Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">
                <Settings className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="availability">
                <Clock className="h-4 w-4 mr-2" />
                Availability
              </TabsTrigger>
              <TabsTrigger value="meetings">
                <Calendar className="h-4 w-4 mr-2" />
                Meeting Types
              </TabsTrigger>
              <TabsTrigger value="form">
                <Users className="h-4 w-4 mr-2" />
                Form Fields
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Page Details</CardTitle>
                  <CardDescription>Customize how your booking page appears to visitors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="page-title">Page Title</Label>
                    <Input
                      id="page-title"
                      value={pageTitle}
                      onChange={(e) => setPageTitle(e.target.value)}
                      placeholder="Book a Meeting with [Your Name]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="page-description">Description</Label>
                    <Textarea
                      id="page-description"
                      value={pageDescription}
                      onChange={(e) => setPageDescription(e.target.value)}
                      placeholder="Tell visitors what to expect when booking a meeting with you"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">URL Username</Label>
                    <div className="flex items-center">
                      <span className="bg-muted px-3 py-2 rounded-l-md text-muted-foreground text-sm border border-r-0 border-input">
                        yourdomain.com/booking/
                      </span>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="rounded-l-none"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">This will be used in your shareable booking link</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel of your booking page</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="branded">Branded</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scheduling Options</CardTitle>
                  <CardDescription>Configure how your meetings are scheduled</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="buffer-time">Buffer Time Between Meetings (minutes)</Label>
                    <Select value={bufferTime} onValueChange={setBufferTime}>
                      <SelectTrigger id="buffer-time">
                        <SelectValue placeholder="Select buffer time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">No buffer</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-bookings">Maximum Bookings Per Day</Label>
                    <Select value={maxBookingsPerDay} onValueChange={setMaxBookingsPerDay}>
                      <SelectTrigger id="max-bookings">
                        <SelectValue placeholder="Select maximum bookings" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 meetings</SelectItem>
                        <SelectItem value="5">5 meetings</SelectItem>
                        <SelectItem value="8">8 meetings</SelectItem>
                        <SelectItem value="10">10 meetings</SelectItem>
                        <SelectItem value="unlimited">Unlimited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Availability</CardTitle>
                  <CardDescription>Set the days and times when you're available for meetings</CardDescription>
                </CardHeader>
                <CardContent>
                  <AvailabilitySelector />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meetings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meeting Types</CardTitle>
                  <CardDescription>Create different types of meetings that people can book</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {meetingTypes.map((type) => (
                    <div key={type.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{type.name}</h3>
                          <p className="text-sm text-muted-foreground">{type.duration} minutes</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                      <p className="text-sm">{type.description}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Add Meeting Type
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="form" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Fields</CardTitle>
                  <CardDescription>Configure what information to collect from visitors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="collect-name">Name</Label>
                      <p className="text-sm text-muted-foreground">Collect the visitor's name</p>
                    </div>
                    <Switch id="collect-name" checked={collectName} onCheckedChange={setCollectName} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="collect-email">Email Address</Label>
                      <p className="text-sm text-muted-foreground">Collect the visitor's email address</p>
                    </div>
                    <Switch id="collect-email" checked={collectEmail} onCheckedChange={setCollectEmail} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="collect-phone">Phone Number</Label>
                      <p className="text-sm text-muted-foreground">Collect the visitor's phone number</p>
                    </div>
                    <Switch id="collect-phone" checked={collectPhone} onCheckedChange={setCollectPhone} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="collect-company">Company</Label>
                      <p className="text-sm text-muted-foreground">Collect the visitor's company name</p>
                    </div>
                    <Switch id="collect-company" checked={collectCompany} onCheckedChange={setCollectCompany} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="collect-message">Message</Label>
                      <p className="text-sm text-muted-foreground">Allow visitors to include a message</p>
                    </div>
                    <Switch id="collect-message" checked={collectMessage} onCheckedChange={setCollectMessage} />
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Configure email notifications for bookings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="confirmation-email">Send Confirmation Email</Label>
                      <p className="text-sm text-muted-foreground">
                        Send a confirmation email to visitors after booking
                      </p>
                    </div>
                    <Switch
                      id="confirmation-email"
                      checked={confirmationEmail}
                      onCheckedChange={setConfirmationEmail}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="reminder-email">Send Reminder Email</Label>
                      <p className="text-sm text-muted-foreground">Send a reminder email before the meeting</p>
                    </div>
                    <Switch id="reminder-email" checked={reminderEmail} onCheckedChange={setReminderEmail} />
                  </div>
                  {reminderEmail && (
                    <div className="space-y-2">
                      <Label htmlFor="reminder-time">Reminder Time (minutes before meeting)</Label>
                      <Select value={reminderTime} onValueChange={setReminderTime}>
                        <SelectTrigger id="reminder-time">
                          <SelectValue placeholder="Select reminder time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                          <SelectItem value="1440">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shareable Link</CardTitle>
              <CardDescription>Share this link with others to let them book meetings with you</CardDescription>
            </CardHeader>
            <CardContent>
              <ShareableLink username={username} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>This is how your booking page will look to visitors</CardDescription>
            </CardHeader>
            <CardContent className="p-0 overflow-hidden">
              <BookingPagePreview
                title={pageTitle}
                description={pageDescription}
                meetingTypes={meetingTypes}
                theme={selectedTheme}
              />
            </CardContent>
            <CardFooter className="border-t bg-muted/50 flex justify-center">
              <Button variant="outline" asChild>
                <Link href={`/booking/${username}`} target="_blank">
                  <Link2 className="mr-2 h-4 w-4" />
                  Open Full Preview
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
