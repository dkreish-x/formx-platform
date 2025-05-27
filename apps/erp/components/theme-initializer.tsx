"use client"

import { useEffect } from "react"
import { applyColorScheme } from "@/lib/color-utils"

export function ThemeInitializer() {
  useEffect(() => {
    // Apply saved color scheme or default to blue
    const savedColor = localStorage.getItem("formx-primary-color") || "#3b82f6"
    applyColorScheme(savedColor)
  }, [])

  return null
}
