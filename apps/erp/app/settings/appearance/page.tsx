"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Check, Moon, Palette, Sun } from "lucide-react"
import { ColorPicker } from "@/components/color-picker"

export default function AppearanceSettingsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [borderRadius, setBorderRadius] = useState("medium")
  const [density, setDensity] = useState("comfortable")

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <div className="container py-6 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight gradient-heading">Appearance Settings</h1>
      </div>

      <Tabs defaultValue="theme" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="space-y-4 animate-slide-in">
          <Card>
            <CardHeader>
              <CardTitle>Theme Mode</CardTitle>
              <CardDescription>Choose between light, dark, or system theme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card
                  className={`cursor-pointer border-2 ${theme === "light" ? "border-primary" : "border-border"} card-hover`}
                  onClick={() => setTheme("light")}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                    <Sun className="h-8 w-8 text-amber-500" />
                    <span className="font-medium">Light</span>
                    {theme === "light" && <Check className="h-4 w-4 text-primary absolute top-2 right-2" />}
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer border-2 ${theme === "dark" ? "border-primary" : "border-border"} card-hover`}
                  onClick={() => setTheme("dark")}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                    <Moon className="h-8 w-8 text-indigo-400" />
                    <span className="font-medium">Dark</span>
                    {theme === "dark" && <Check className="h-4 w-4 text-primary absolute top-2 right-2" />}
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer border-2 ${theme === "system" ? "border-primary" : "border-border"} card-hover`}
                  onClick={() => setTheme("system")}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center gap-2">
                    <Palette className="h-8 w-8 text-blue-500" />
                    <span className="font-medium">System</span>
                    {theme === "system" && <Check className="h-4 w-4 text-primary absolute top-2 right-2" />}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4 animate-slide-in">
          <ColorPicker />
        </TabsContent>

        <TabsContent value="layout" className="space-y-4 animate-slide-in">
          <Card>
            <CardHeader>
              <CardTitle>Layout Settings</CardTitle>
              <CardDescription>Customize the layout of your interface</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations">Interface Animations</Label>
                  <Switch id="animations" checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
                </div>
                <p className="text-sm text-muted-foreground">Enable or disable interface animations and transitions</p>
              </div>

              <div className="space-y-2">
                <Label>Border Radius</Label>
                <RadioGroup value={borderRadius} onValueChange={setBorderRadius} className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="small" id="radius-small" className="peer sr-only" />
                    <Label
                      htmlFor="radius-small"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="w-12 h-6 rounded-sm border border-foreground/20"></div>
                      <span className="mt-2">Small</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="medium" id="radius-medium" className="peer sr-only" />
                    <Label
                      htmlFor="radius-medium"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="w-12 h-6 rounded-md border border-foreground/20"></div>
                      <span className="mt-2">Medium</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="large" id="radius-large" className="peer sr-only" />
                    <Label
                      htmlFor="radius-large"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="w-12 h-6 rounded-lg border border-foreground/20"></div>
                      <span className="mt-2">Large</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Interface Density</Label>
                <RadioGroup value={density} onValueChange={setDensity} className="grid grid-cols-3 gap-4">
                  <div>
                    <RadioGroupItem value="compact" id="density-compact" className="peer sr-only" />
                    <Label
                      htmlFor="density-compact"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="w-12 h-6 flex flex-col gap-1">
                        <div className="h-1 w-full bg-foreground/20 rounded-full"></div>
                        <div className="h-1 w-full bg-foreground/20 rounded-full"></div>
                        <div className="h-1 w-full bg-foreground/20 rounded-full"></div>
                      </div>
                      <span className="mt-2">Compact</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="comfortable" id="density-comfortable" className="peer sr-only" />
                    <Label
                      htmlFor="density-comfortable"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="w-12 h-8 flex flex-col gap-2">
                        <div className="h-1 w-full bg-foreground/20 rounded-full"></div>
                        <div className="h-1 w-full bg-foreground/20 rounded-full"></div>
                        <div className="h-1 w-full bg-foreground/20 rounded-full"></div>
                      </div>
                      <span className="mt-2">Comfortable</span>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="spacious" id="density-spacious" className="peer sr-only" />
                    <Label
                      htmlFor="density-spacious"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <div className="w-12 h-10 flex flex-col gap-3">
                        <div className="h-1 w-full bg-foreground/20 rounded-full"></div>
                        <div className="h-1 w-full bg-foreground/20 rounded-full"></div>
                        <div className="h-1 w-full bg-foreground/20 rounded-full"></div>
                      </div>
                      <span className="mt-2">Spacious</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Layout Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-4 animate-slide-in">
          <Card>
            <CardHeader>
              <CardTitle>Typography Settings</CardTitle>
              <CardDescription>Customize the typography of your interface</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Typography settings coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
