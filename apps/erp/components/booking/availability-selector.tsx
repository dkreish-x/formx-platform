"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"

interface TimeRange {
  start: string
  end: string
}

interface DayAvailability {
  enabled: boolean
  timeRanges: TimeRange[]
}

type WeekAvailability = {
  [key in "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"]: DayAvailability
}

export function AvailabilitySelector() {
  const [availability, setAvailability] = useState<WeekAvailability>({
    monday: { enabled: true, timeRanges: [{ start: "09:00", end: "17:00" }] },
    tuesday: { enabled: true, timeRanges: [{ start: "09:00", end: "17:00" }] },
    wednesday: { enabled: true, timeRanges: [{ start: "09:00", end: "17:00" }] },
    thursday: { enabled: true, timeRanges: [{ start: "09:00", end: "17:00" }] },
    friday: { enabled: true, timeRanges: [{ start: "09:00", end: "17:00" }] },
    saturday: { enabled: false, timeRanges: [{ start: "09:00", end: "17:00" }] },
    sunday: { enabled: false, timeRanges: [{ start: "09:00", end: "17:00" }] },
  })

  const toggleDay = (day: keyof WeekAvailability) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        enabled: !availability[day].enabled,
      },
    })
  }

  const updateTimeRange = (day: keyof WeekAvailability, index: number, field: keyof TimeRange, value: string) => {
    const newTimeRanges = [...availability[day].timeRanges]
    newTimeRanges[index] = {
      ...newTimeRanges[index],
      [field]: value,
    }

    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        timeRanges: newTimeRanges,
      },
    })
  }

  const addTimeRange = (day: keyof WeekAvailability) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        timeRanges: [...availability[day].timeRanges, { start: "09:00", end: "17:00" }],
      },
    })
  }

  const removeTimeRange = (day: keyof WeekAvailability, index: number) => {
    if (availability[day].timeRanges.length <= 1) {
      return // Keep at least one time range
    }

    const newTimeRanges = [...availability[day].timeRanges]
    newTimeRanges.splice(index, 1)

    setAvailability({
      ...availability,
      [day]: {
        ...availability[day],
        timeRanges: newTimeRanges,
      },
    })
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  const dayNames: Record<keyof WeekAvailability, string> = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  }

  return (
    <div className="space-y-4">
      {(Object.keys(availability) as Array<keyof WeekAvailability>).map((day) => (
        <Card key={day} className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Switch id={`${day}-toggle`} checked={availability[day].enabled} onCheckedChange={() => toggleDay(day)} />
              <Label htmlFor={`${day}-toggle`} className="font-medium">
                {dayNames[day]}
              </Label>
            </div>
            {availability[day].enabled && availability[day].timeRanges.length < 3 && (
              <Button variant="outline" size="sm" onClick={() => addTimeRange(day)}>
                Add Time Range
              </Button>
            )}
          </div>

          {availability[day].enabled && (
            <div className="space-y-3">
              {availability[day].timeRanges.map((timeRange, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Select
                    value={timeRange.start}
                    onValueChange={(value) => updateTimeRange(day, index, "start", value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, hour) => (
                        <SelectItem key={`${hour}:00`} value={`${hour.toString().padStart(2, "0")}:00`}>
                          {formatTime(`${hour.toString().padStart(2, "0")}:00`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <span>to</span>

                  <Select value={timeRange.end} onValueChange={(value) => updateTimeRange(day, index, "end", value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }).map((_, hour) => (
                        <SelectItem key={`${hour}:00`} value={`${hour.toString().padStart(2, "0")}:00`}>
                          {formatTime(`${hour.toString().padStart(2, "0")}:00`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTimeRange(day, index)}
                    disabled={availability[day].timeRanges.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
