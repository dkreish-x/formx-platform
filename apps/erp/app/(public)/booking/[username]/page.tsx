import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MeetingTypeSelector } from "@/components/booking/meeting-type-selector"
import { TimeSlotPicker } from "@/components/booking/time-slot-picker"
import { BookingForm } from "@/components/booking/booking-form"
import { Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// This would normally come from a database
const users = [
  {
    username: "johndoe",
    name: "John Doe",
    title: "Sales Manager",
    avatar: "/diverse-avatars.png",
    pageTitle: "Book a Meeting with John Doe",
    pageDescription: "Select a time slot that works for you, and I'll get back to you with a confirmation.",
    meetingTypes: [
      { id: "1", name: "15 Minute Meeting", duration: 15, description: "Quick chat or introduction" },
      { id: "2", name: "30 Minute Meeting", duration: 30, description: "Product demo or consultation" },
      { id: "3", name: "60 Minute Meeting", duration: 60, description: "In-depth discussion or planning session" },
    ],
  },
]

export default function BookingPage({ params }: { params: { username: string } }) {
  const user = users.find((u) => u.username === params.username)

  if (!user) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="container max-w-5xl py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="border-0 shadow-md">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-100 dark:border-zinc-800 shadow-sm">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.title}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">{user.pageDescription}</p>
                <div className="mt-6 flex justify-center">
                  <Link
                    href="/"
                    className="text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  >
                    Powered by Form(X)
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>{user.pageTitle}</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="type" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="type">
                      <Clock className="h-4 w-4 mr-2" />
                      Meeting Type
                    </TabsTrigger>
                    <TabsTrigger value="date">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date & Time
                    </TabsTrigger>
                    <TabsTrigger value="details">
                      <User className="h-4 w-4 mr-2" />
                      Your Details
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="type">
                    <MeetingTypeSelector meetingTypes={user.meetingTypes} />
                  </TabsContent>
                  <TabsContent value="date">
                    <TimeSlotPicker username={user.username} />
                  </TabsContent>
                  <TabsContent value="details">
                    <BookingForm username={user.username} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
