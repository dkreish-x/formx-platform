"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Palette } from "lucide-react"
import { ColorPickerModal } from "./color-picker-modal"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const [colorPickerOpen, setColorPickerOpen] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled className="w-9 h-9 rounded-full" />
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="w-9 h-9 rounded-full">
            <Palette className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Theme settings</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setColorPickerOpen(true)}>
            <Palette className="mr-2 h-4 w-4" />
            <span>Customize Theme</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ColorPickerModal open={colorPickerOpen} onOpenChange={setColorPickerOpen} />
    </>
  )
}
