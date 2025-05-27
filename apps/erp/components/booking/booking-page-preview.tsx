"use client"
import { Clock } from "lucide-react"

interface MeetingType {
  id: string
  name: string
  duration: number
  description: string
}

interface BookingPagePreviewProps {
  title: string
  description: string
  meetingTypes: MeetingType[]
  theme: string
}

export function BookingPagePreview({ title, description, meetingTypes, theme }: BookingPagePreviewProps) {
  return (
    <div className={`w-full h-[400px] overflow-auto ${theme === "dark" ? "bg-zinc-900 text-white" : "bg-white"}`}>
      <div className="p-4">
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">{title || "Book a Meeting"}</h2>
          <p className="text-sm text-muted-foreground mt-1">{description || "Select a time that works for you."}</p>
        </div>

        <div className="space-y-3">
          <h3 className="font-medium text-sm">Select Meeting Type:</h3>
          {meetingTypes.map((type) => (
            <div
              key={type.id}
              className={`border rounded-lg p-3 cursor-pointer ${
                theme === "dark" ? "border-zinc-700 hover:border-zinc-600" : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sm">{type.name}</h4>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{type.duration} minutes</span>
                  </div>
                </div>
              </div>
              <p className="text-xs mt-2">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
