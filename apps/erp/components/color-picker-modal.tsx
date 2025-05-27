"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { applyColorScheme } from "@/lib/color-utils"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, RefreshCw, Moon, Sun, Monitor } from "lucide-react"
import { hexToHsb, hsbToHex } from "@/lib/color-utils"
import { useTheme } from "next-themes"

interface ColorPickerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ColorPickerModal({ open, onOpenChange }: ColorPickerModalProps) {
  const { theme, setTheme } = useTheme()
  const [color, setColor] = useState("#3b82f6") // Default blue
  const [hsb, setHsb] = useState({ h: 217, s: 91, b: 96 }) // Default blue in HSB
  const [mounted, setMounted] = useState(false)
  const colorWheelRef = useRef<HTMLDivElement>(null)
  const colorThumbRef = useRef<HTMLDivElement>(null)
  const brightnessSliderRef = useRef<HTMLDivElement>(null)
  const brightnessThumbRef = useRef<HTMLDivElement>(null)
  const isDraggingWheelRef = useRef(false)
  const isDraggingBrightnessRef = useRef(false)

  // Load saved color on mount
  useEffect(() => {
    setMounted(true)
    const savedColor = localStorage.getItem("formx-primary-color")
    if (savedColor) {
      setColor(savedColor)
      setHsb(hexToHsb(savedColor))
    }
  }, [])

  // Apply color scheme when color changes
  useEffect(() => {
    if (mounted) {
      applyColorScheme(color)
    }
  }, [color, mounted])

  // Update color when HSB changes
  useEffect(() => {
    if (mounted) {
      const newColor = hsbToHex(hsb.h, hsb.s, hsb.b)
      setColor(newColor)
    }
  }, [hsb, mounted])

  // Position the color thumb based on HSB values
  useEffect(() => {
    if (colorWheelRef.current && colorThumbRef.current && mounted) {
      const wheel = colorWheelRef.current
      const thumb = colorThumbRef.current

      // Calculate wheel dimensions
      const wheelRect = wheel.getBoundingClientRect()
      const centerX = wheelRect.width / 2
      const centerY = wheelRect.height / 2
      const maxRadius = Math.min(centerX, centerY) - 5 // 5px buffer from edge

      // Calculate position based on hue angle and saturation
      // Note: We need to adjust the angle by -90 degrees because the color wheel starts at the right (0 degrees)
      // and goes counterclockwise, while Math.cos/sin start at the right and go clockwise
      const hueRadians = ((hsb.h - 90) * Math.PI) / 180
      const saturationRadius = (hsb.s / 100) * maxRadius

      // Calculate x and y coordinates
      const x = centerX + saturationRadius * Math.cos(hueRadians)
      const y = centerY + saturationRadius * Math.sin(hueRadians)

      // Position the thumb
      thumb.style.left = `${x}px`
      thumb.style.top = `${y}px`
    }
  }, [hsb.h, hsb.s, mounted])

  // Position the brightness thumb
  useEffect(() => {
    if (brightnessSliderRef.current && brightnessThumbRef.current && mounted) {
      const slider = brightnessSliderRef.current
      const thumb = brightnessThumbRef.current

      const sliderRect = slider.getBoundingClientRect()
      const position = (hsb.b / 100) * sliderRect.width

      thumb.style.left = `${position}px`
    }
  }, [hsb.b, mounted])

  // Calculate HSB values from mouse/touch position on color wheel
  const calculateHsbFromPosition = (clientX: number, clientY: number) => {
    if (!colorWheelRef.current) return null

    const wheel = colorWheelRef.current
    const rect = wheel.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Calculate coordinates relative to center
    const x = clientX - rect.left - centerX
    const y = clientY - rect.top - centerY

    // Calculate distance from center (for saturation)
    const maxRadius = Math.min(centerX, centerY) - 5 // 5px buffer
    const distance = Math.sqrt(x * x + y * y)

    // If outside the wheel, clamp to the edge
    if (distance > maxRadius) {
      // Normalize the coordinates to stay on the edge of the wheel
      const ratio = maxRadius / distance
      const clampedX = x * ratio
      const clampedY = y * ratio

      // Recalculate distance and angle with clamped coordinates
      const clampedDistance = Math.sqrt(clampedX * clampedX + clampedY * clampedY)
      const angle = Math.atan2(clampedY, clampedX)

      // Convert to degrees and normalize to 0-360
      // Add 90 degrees to adjust for the fact that 0 degrees is at the top in our UI
      let degrees = angle * (180 / Math.PI) + 90
      if (degrees < 0) degrees += 360
      if (degrees >= 360) degrees -= 360

      return { h: degrees, s: 100 } // Max saturation when clamped to edge
    }

    const saturation = Math.min(100, Math.max(0, Math.round((distance / maxRadius) * 100)))

    // Calculate angle in radians, then convert to degrees (for hue)
    const angle = Math.atan2(y, x)
    // Convert to degrees and normalize to 0-360
    // Add 90 degrees to adjust for the fact that 0 degrees is at the top in our UI
    let degrees = angle * (180 / Math.PI) + 90
    if (degrees < 0) degrees += 360
    if (degrees >= 360) degrees -= 360

    return { h: degrees, s: saturation }
  }

  // Calculate brightness from mouse/touch position on brightness slider
  const calculateBrightnessFromPosition = (clientX: number) => {
    if (!brightnessSliderRef.current) return null

    const slider = brightnessSliderRef.current
    const rect = slider.getBoundingClientRect()

    // Calculate position relative to slider
    const x = clientX - rect.left

    // Calculate brightness percentage
    const brightness = Math.min(100, Math.max(0, Math.round((x / rect.width) * 100)))

    return brightness
  }

  // Mouse event handlers for color wheel
  const handleWheelMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    isDraggingWheelRef.current = true

    const newHsb = calculateHsbFromPosition(e.clientX, e.clientY)
    if (newHsb) {
      setHsb((prev) => ({ ...prev, h: newHsb.h, s: newHsb.s }))
    }

    // Add event listeners for drag
    document.addEventListener("mousemove", handleWheelMouseMove)
    document.addEventListener("mouseup", handleWheelMouseUp)
  }

  const handleWheelMouseMove = (e: MouseEvent) => {
    if (!isDraggingWheelRef.current) return

    const newHsb = calculateHsbFromPosition(e.clientX, e.clientY)
    if (newHsb) {
      setHsb((prev) => ({ ...prev, h: newHsb.h, s: newHsb.s }))
    }
  }

  const handleWheelMouseUp = () => {
    isDraggingWheelRef.current = false

    // Remove event listeners
    document.removeEventListener("mousemove", handleWheelMouseMove)
    document.removeEventListener("mouseup", handleWheelMouseUp)
  }

  // Mouse event handlers for brightness slider
  const handleBrightnessMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    isDraggingBrightnessRef.current = true

    const brightness = calculateBrightnessFromPosition(e.clientX)
    if (brightness !== null) {
      setHsb((prev) => ({ ...prev, b: brightness }))
    }

    // Add event listeners for drag
    document.addEventListener("mousemove", handleBrightnessMouseMove)
    document.addEventListener("mouseup", handleBrightnessMouseUp)
  }

  const handleBrightnessMouseMove = (e: MouseEvent) => {
    if (!isDraggingBrightnessRef.current) return

    const brightness = calculateBrightnessFromPosition(e.clientX)
    if (brightness !== null) {
      setHsb((prev) => ({ ...prev, b: brightness }))
    }
  }

  const handleBrightnessMouseUp = () => {
    isDraggingBrightnessRef.current = false

    // Remove event listeners
    document.removeEventListener("mousemove", handleBrightnessMouseMove)
    document.removeEventListener("mouseup", handleBrightnessMouseUp)
  }

  // Reset to default blue
  const resetToDefault = () => {
    setColor("#3b82f6")
    setHsb({ h: 217, s: 91, b: 96 })
  }

  if (!mounted) return null

  // Calculate the color at full brightness for the brightness slider background
  const fullBrightnessColor = hsbToHex(hsb.h, hsb.s, 100)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Customize Theme</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Mode toggle */}
          <div className="flex justify-center space-x-2">
            <Button
              variant={theme === "light" ? "default" : "outline"}
              size="sm"
              className="gap-1"
              onClick={() => setTheme("light")}
            >
              <Sun className="h-4 w-4" />
              <span>Light</span>
            </Button>
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              size="sm"
              className="gap-1"
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-4 w-4" />
              <span>Dark</span>
            </Button>
            <Button
              variant={theme === "system" ? "default" : "outline"}
              size="sm"
              className="gap-1"
              onClick={() => setTheme("system")}
            >
              <Monitor className="h-4 w-4" />
              <span>System</span>
            </Button>
          </div>

          {/* Color wheel */}
          <div
            className="relative aspect-square mx-auto max-w-[280px] cursor-pointer"
            ref={colorWheelRef}
            onMouseDown={handleWheelMouseDown}
          >
            {/* Hue wheel */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background: `conic-gradient(
                  from 0deg,
                  hsl(0, 100%, 50%),
                  hsl(60, 100%, 50%),
                  hsl(120, 100%, 50%),
                  hsl(180, 100%, 50%),
                  hsl(240, 100%, 50%),
                  hsl(300, 100%, 50%),
                  hsl(360, 100%, 50%)
                )`,
              }}
            />

            {/* Saturation overlay - white to transparent radial gradient */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background: `radial-gradient(circle, white 0%, transparent 70%)`,
                mixBlendMode: "overlay",
              }}
            />

            {/* Brightness overlay based on current brightness */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                background: hsb.b < 100 ? `rgba(0, 0, 0, ${1 - hsb.b / 100})` : "transparent",
                mixBlendMode: "multiply",
              }}
            />

            {/* Center white circle */}
            <div className="absolute inset-[15%] rounded-full bg-white" />

            {/* Color selection thumb */}
            <div
              ref={colorThumbRef}
              className="absolute w-5 h-5 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ backgroundColor: color }}
            />
          </div>

          {/* Brightness slider */}
          <div className="space-y-2">
            <div
              className="relative h-6 rounded-full overflow-hidden cursor-pointer"
              ref={brightnessSliderRef}
              onMouseDown={handleBrightnessMouseDown}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(to right, #000000, ${fullBrightnessColor})`,
                }}
              />
              <div
                ref={brightnessThumbRef}
                className="absolute top-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>

          {/* Color info and reset */}
          <div className="flex items-center justify-between">
            <div className="font-mono text-sm bg-muted/30 px-2 py-1 rounded border">{color.toUpperCase()}</div>
            <Button variant="outline" size="sm" onClick={resetToDefault} className="h-8 gap-1">
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </Button>
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <div className="text-sm font-medium">Preview</div>
            <div className="space-y-3 p-4 border rounded-md">
              <div className="flex flex-wrap gap-2">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
              <Card>
                <CardContent className="p-4">
                  <p>Card with primary border accent</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => onOpenChange(false)} className="gap-1">
            <Check className="h-4 w-4" />
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
