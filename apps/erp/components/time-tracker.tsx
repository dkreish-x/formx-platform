"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, StopCircle, Clock } from "lucide-react"

interface TimeTrackerProps {
  operation: string
}

export function TimeTracker({ operation }: TimeTrackerProps) {
  const [isTracking, setIsTracking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [startTime, setStartTime] = useState<Date | null>(null)
  const [notes, setNotes] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isTracking) {
      interval = setInterval(() => {
        if (startTime) {
          const now = new Date()
          const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000)
          setElapsedTime(elapsed)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isTracking, startTime])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`
  }

  const startTracking = () => {
    setStartTime(new Date())
    setIsTracking(true)
  }

  const pauseTracking = () => {
    setIsTracking(false)
  }

  const stopTracking = () => {
    setIsTracking(false)
    // In a real implementation, this would submit the time entry to the server
    alert(`Time logged: ${formatTime(elapsedTime)} for ${operation}`)
    setElapsedTime(0)
    setStartTime(null)
    setNotes("")
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{operation}</h3>
              <p className="text-sm text-muted-foreground">Track time for this operation</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-xl font-mono">{formatTime(elapsedTime)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {!isTracking ? (
              <Button onClick={startTracking} className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : (
              <Button onClick={pauseTracking} variant="outline" className="flex-1">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            <Button onClick={stopTracking} variant="destructive" disabled={!startTime}>
              <StopCircle className="h-4 w-4 mr-2" />
              Stop & Save
            </Button>
          </div>

          <div>
            <Textarea
              placeholder="Add notes about this time entry..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Quantity Completed</label>
              <Input type="number" placeholder="0" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Employee ID</label>
              <Input placeholder="Scan employee badge" className="mt-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
