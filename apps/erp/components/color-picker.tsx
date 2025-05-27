"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { applyColorScheme } from "@/lib/color-utils"
import { Check, RefreshCw } from "lucide-react"

// Predefined color suggestions
const colorSuggestions = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Pink", value: "#ec4899" },
  { name: "Red", value: "#ef4444" },
  { name: "Orange", value: "#f97316" },
  { name: "Amber", value: "#f59e0b" },
  { name: "Yellow", value: "#eab308" },
  { name: "Lime", value: "#84cc16" },
  { name: "Green", value: "#22c55e" },
  { name: "Emerald", value: "#10b981" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Cyan", value: "#06b6d4" },
  { name: "Sky", value: "#0ea5e9" },
  { name: "Slate", value: "#475569" },
]

export function ColorPicker() {
  const [color, setColor] = useState("#3b82f6")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load saved color from localStorage
    const savedColor = localStorage.getItem("formx-primary-color")
    if (savedColor) {
      setColor(savedColor)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      applyColorScheme(color)
    }
  }, [color, mounted])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  const handleSuggestionClick = (colorValue: string) => {
    setColor(colorValue)
  }

  const handleReset = () => {
    // Reset to default blue
    setColor("#3b82f6")
  }

  if (!mounted) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Color Theme</CardTitle>
        <CardDescription>Choose a primary color to generate a complete theme</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="color-picker">Primary Color</Label>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-border" style={{ backgroundColor: color }} />
            <input
              id="color-picker"
              type="color"
              value={color}
              onChange={handleColorChange}
              className="h-10 w-full cursor-pointer appearance-none overflow-hidden rounded-md bg-transparent"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-1">Current value: {color}</p>
        </div>

        <div className="space-y-2">
          <Label>Color Suggestions</Label>
          <div className="grid grid-cols-5 gap-2">
            {colorSuggestions.map((suggestion) => (
              <Button
                key={suggestion.value}
                type="button"
                variant="outline"
                className="p-0 w-full h-10 relative"
                onClick={() => handleSuggestionClick(suggestion.value)}
              >
                <div className="absolute inset-0 m-1 rounded-sm" style={{ backgroundColor: suggestion.value }} />
                {color === suggestion.value && <Check className="h-4 w-4 absolute text-white drop-shadow-md" />}
                <span className="sr-only">{suggestion.name}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <div className="h-10 w-20 rounded bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                Primary
              </div>
              <div className="h-10 w-20 rounded bg-secondary flex items-center justify-center text-secondary-foreground text-sm font-medium">
                Secondary
              </div>
              <div className="h-10 w-20 rounded bg-accent flex items-center justify-center text-accent-foreground text-sm font-medium">
                Accent
              </div>
              <div className="h-10 w-20 rounded bg-muted flex items-center justify-center text-muted-foreground text-sm font-medium">
                Muted
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm">Primary Button</Button>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
              <Button size="sm" variant="outline">
                Outline
              </Button>
              <Button size="sm" variant="ghost">
                Ghost
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" onClick={handleReset} className="gap-1">
          <RefreshCw className="h-4 w-4" />
          Reset to Default
        </Button>
      </CardFooter>
    </Card>
  )
}
