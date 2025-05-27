"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { startOfDay } from "date-fns"

interface TimeSlotPickerProps {
  username: string
}

export function TimeSlotPicker({ username }: TimeSlotPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Generate available time slots (this would normally come from the server based on calendar availability)
  const generateTimeSlots = (date: Date) => {
    // Mock data - in a real app, this would check against Google Calendar
    const slots = []
    const startHour = 9 // 9 AM
    const endHour = 17 // 5 PM
    const interval = 30 // 30 minute slots

    // Skip weekends in this example
    const day = date.getDay()
    if (day === 0 || day === 6) {
      return [] // No slots on weekends
    }

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        // Skip lunch hour in this example
        if (hour === 12 && minute === 0) continue

        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
        slots.push(timeString)
      }
    }

    return slots
  }

  const availableSlots = selectedDate ? generateTimeSlots(selectedDate) : []

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      // In a real app, you would store this in state or URL params
      // For now, we'll just navigate to the next tab
      const tabLinks = document.querySelectorAll('[role="tab"]')
      if (tabLinks.length > 2) {
        ;(tabLinks[2] as HTMLElement).click()
      }
    }
  }

  const formatTimeSlot = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Select a Date</h3>
          <div className="border rounded-md p-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < startOfDay(new Date())}
              className="rounded-md"
            />
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Select a Time</h3>
          {selectedDate ? (
            availableSlots.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSelectedTime(time)}
                  >
                    {formatTimeSlot(time)}
                  </Button>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground">No available time slots on this date.</p>
                <p className="text-sm mt-2">Please select another date.</p>
              </Card>
            )
          ) : (
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">Please select a date first.</p>
            </Card>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => {
            const tabLinks = document.querySelectorAll('[role="tab"]')
            if (tabLinks.length > 0) {
              ;(tabLinks[0] as HTMLElement).click()
            }
          }}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!selectedDate || !selectedTime}>
          Continue
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
