"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Check, Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [colorScheme, setColorScheme] = useState<string>("default")

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)

    // Get the current color scheme from localStorage or default
    const storedColorScheme = localStorage.getItem("color-scheme")
    setColorScheme(storedColorScheme || getCurrentColorScheme())
  }, [])

  if (!mounted) {
    return null
  }

  const themes = [
    {
      name: "Light",
      value: "light",
      icon: Sun,
    },
    {
      name: "Dark",
      value: "dark",
      icon: Moon,
    },
    {
      name: "System",
      value: "system",
      icon: Monitor,
    },
  ]

  const colorSchemes = [
    {
      name: "Modern Indigo",
      value: "default",
      primaryColor: "bg-[hsl(262.1,83.3%,57.8%)]",
      secondaryColor: "bg-[hsl(220,14.3%,95.9%)]",
    },
    {
      name: "Professional Blue",
      value: "theme-blue",
      primaryColor: "bg-[hsl(221,83%,53%)]",
      secondaryColor: "bg-[hsl(210,40%,96.1%)]",
    },
    {
      name: "Industrial Teal",
      value: "theme-teal",
      primaryColor: "bg-[hsl(171,75%,32%)]",
      secondaryColor: "bg-[hsl(166,100%,97%)]",
    },
    {
      name: "Vibrant Rose",
      value: "theme-rose",
      primaryColor: "bg-[hsl(346.8,77.2%,49.8%)]",
      secondaryColor: "bg-[hsl(240,4.8%,95.9%)]",
    },
    {
      name: "Warm Amber",
      value: "theme-amber",
      primaryColor: "bg-[hsl(35.5,91.7%,32.9%)]",
      secondaryColor: "bg-[hsl(60,4.8%,95.9%)]",
    },
    {
      name: "Fresh Green",
      value: "theme-green",
      primaryColor: "bg-[hsl(142.1,76.2%,36.3%)]",
      secondaryColor: "bg-[hsl(240,4.8%,95.9%)]",
    },
    {
      name: "Neutral Slate",
      value: "theme-slate",
      primaryColor: "bg-[hsl(222.2,47.4%,11.2%)]",
      secondaryColor: "bg-[hsl(210,40%,96.1%)]",
    },
  ]

  // Get the current color scheme from the document element
  const getCurrentColorScheme = () => {
    const htmlClasses = document.documentElement.className.split(" ")
    const themeClass = htmlClasses.find((cls) => cls.startsWith("theme-"))
    return themeClass || "default"
  }

  const handleColorSchemeChange = (value: string) => {
    // Remove any existing theme classes
    document.documentElement.classList.forEach((cls) => {
      if (cls.startsWith("theme-")) {
        document.documentElement.classList.remove(cls)
      }
    })

    // Add the new theme class if it's not the default
    if (value !== "default") {
      document.documentElement.classList.add(value)
    }

    setColorScheme(value)

    // Save to localStorage
    localStorage.setItem("color-scheme", value)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Theme Mode</h3>
        <p className="text-sm text-muted-foreground">Choose between light, dark, or system theme.</p>
        <div className="flex gap-2 mt-4">
          {themes.map((t) => (
            <Button
              key={t.value}
              variant={theme === t.value ? "default" : "outline"}
              className="flex-1 gap-2"
              onClick={() => setTheme(t.value)}
            >
              <t.icon className="h-4 w-4" />
              {t.name}
              {theme === t.value && <Check className="h-4 w-4 ml-auto" />}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium">Color Scheme</h3>
        <p className="text-sm text-muted-foreground">Select a color scheme for the application.</p>
        <RadioGroup
          value={colorScheme}
          onValueChange={handleColorSchemeChange}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4"
        >
          {colorSchemes.map((scheme) => (
            <Label key={scheme.value} htmlFor={scheme.value} className="cursor-pointer">
              <Card
                className={`border-2 ${colorScheme === scheme.value ? "border-primary" : "border-border"} hover:border-primary/50 transition-colors`}
              >
                <CardContent className="p-4 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{scheme.name}</span>
                    <RadioGroupItem value={scheme.value} id={scheme.value} className="sr-only" />
                    {colorScheme === scheme.value && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex gap-2">
                    <div className={`h-6 w-6 rounded-full ${scheme.primaryColor}`} />
                    <div className={`h-6 w-6 rounded-full ${scheme.secondaryColor}`} />
                  </div>
                </CardContent>
              </Card>
            </Label>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
