"use client"

import { useState, useEffect } from "react"

export interface BookingPagePreviewProps {
  title: string
  description: string
  meetingTypes: any[] // Replace 'any' with a more specific type if possible
  theme: string
}

export function BookingPagePreview({ title, description, meetingTypes, theme }: BookingPagePreviewProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-64 bg-muted animate-pulse rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground">Loading preview...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold">{title}</div>
      <div className="text-sm text-muted-foreground">{description}</div>
      <div>
        {meetingTypes.length > 0 ? (
          <ul>
            {meetingTypes.map((meetingType) => (
              <li key={meetingType.id}>{meetingType.name}</li>
            ))}
          </ul>
        ) : (
          <p>No meeting types available.</p>
        )}
      </div>
      <div>Theme: {theme}</div>
    </div>
  )
}
