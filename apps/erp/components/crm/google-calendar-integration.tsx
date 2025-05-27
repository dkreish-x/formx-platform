"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, RefreshCw, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface GoogleCalendarIntegrationProps {
  isConnected?: boolean
}

export function GoogleCalendarIntegration({ isConnected = false }: GoogleCalendarIntegrationProps) {
  const [connected, setConnected] = useState(isConnected)
  const [syncing, setSyncing] = useState(false)
  const [syncSettings, setSyncSettings] = useState({
    twoWaySync: true,
    includeAttendees: true,
    notifyOnChanges: true,
    autoCreateTasks: true,
  })

  const handleConnect = async () => {
    // In a real implementation, this would open the Google OAuth flow
    // For this demo, we'll simulate the connection process
    setSyncing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setConnected(true)
    setSyncing(false)
  }

  const handleDisconnect = async () => {
    // In a real implementation, this would revoke access tokens
    setSyncing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setConnected(false)
    setSyncing(false)
  }

  const handleSyncNow = async () => {
    setSyncing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSyncing(false)
  }

  const handleToggleSetting = (setting: keyof typeof syncSettings) => {
    setSyncSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Google Calendar Integration</CardTitle>
          </div>
          {connected && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Connected
            </Badge>
          )}
        </div>
        <CardDescription>Sync your meetings and appointments with Google Calendar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {connected ? (
          <>
            <div className="rounded-md bg-muted p-4">
              <div className="font-medium">Connected Account</div>
              <div className="text-sm text-muted-foreground mt-1">manufacturing@formx.com</div>
              <div className="text-xs text-muted-foreground mt-1">Last synced: Today at 9:45 AM</div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Sync Settings</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-way-sync">Two-way synchronization</Label>
                  <p className="text-xs text-muted-foreground">Changes in either system will update the other</p>
                </div>
                <Switch
                  id="two-way-sync"
                  checked={syncSettings.twoWaySync}
                  onCheckedChange={() => handleToggleSetting("twoWaySync")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="include-attendees">Include meeting attendees</Label>
                  <p className="text-xs text-muted-foreground">Sync attendee information between systems</p>
                </div>
                <Switch
                  id="include-attendees"
                  checked={syncSettings.includeAttendees}
                  onCheckedChange={() => handleToggleSetting("includeAttendees")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-changes">Notify on changes</Label>
                  <p className="text-xs text-muted-foreground">Receive notifications when events are updated</p>
                </div>
                <Switch
                  id="notify-changes"
                  checked={syncSettings.notifyOnChanges}
                  onCheckedChange={() => handleToggleSetting("notifyOnChanges")}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-create-tasks">Auto-create follow-up tasks</Label>
                  <p className="text-xs text-muted-foreground">Automatically create tasks after meetings</p>
                </div>
                <Switch
                  id="auto-create-tasks"
                  checked={syncSettings.autoCreateTasks}
                  onCheckedChange={() => handleToggleSetting("autoCreateTasks")}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-medium">Connect to Google Calendar</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Sync your meetings, appointments, and events with Google Calendar
              </p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {connected ? (
          <>
            <Button variant="outline" onClick={handleDisconnect} disabled={syncing}>
              <X className="h-4 w-4 mr-2" />
              Disconnect
            </Button>
            <Button onClick={handleSyncNow} disabled={syncing}>
              {syncing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Now
                </>
              )}
            </Button>
          </>
        ) : (
          <Button onClick={handleConnect} className="w-full" disabled={syncing}>
            {syncing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <Calendar className="h-4 w-4 mr-2" />
                Connect to Google Calendar
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
