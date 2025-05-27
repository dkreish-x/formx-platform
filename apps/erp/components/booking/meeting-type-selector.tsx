"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import { useRouter } from "next/navigation"

interface MeetingType {
  id: string
  name: string
  duration: number
  description: string
}

interface MeetingTypeSelectorProps {
  meetingTypes: MeetingType[]
}

export function MeetingTypeSelector({ meetingTypes }: MeetingTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedType) {
      // In a real app, you would store this in state or URL params
      // For now, we'll just navigate to the next tab
      const tabLinks = document.querySelectorAll('[role="tab"]')
      if (tabLinks.length > 1) {
        ;(tabLinks[1] as HTMLElement).click()
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {meetingTypes.map((type) => (
          <div
            key={type.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedType === type.id
                ? "border-zinc-900 bg-zinc-50 dark:border-zinc-50 dark:bg-zinc-800"
                : "hover:border-zinc-400 dark:hover:border-zinc-600"
            }`}
            onClick={() => setSelectedType(type.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{type.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{type.duration} minutes</span>
                </div>
              </div>
              <div
                className={`w-4 h-4 rounded-full border ${
                  selectedType === type.id
                    ? "border-zinc-900 bg-zinc-900 dark:border-zinc-50 dark:bg-zinc-50"
                    : "border-zinc-300 dark:border-zinc-600"
                }`}
              />
            </div>
            <p className="text-sm mt-2 text-muted-foreground">{type.description}</p>
          </div>
        ))}
      </div>
      <Button onClick={handleContinue} disabled={!selectedType} className="w-full">
        Continue
      </Button>
    </div>
  )
}
