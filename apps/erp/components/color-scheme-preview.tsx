"use client"

import { useState } from "react"
import { Check, Info, AlertTriangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/ui/status-badge"

const colorSchemes = [
  {
    id: "blue",
    name: "Professional Blue",
    description: "Clean blue palette for enterprise software",
    primary: "#3b82f6",
    secondary: "#f1f5f9",
    accent: "#3b82f6",
    muted: "#f1f5f9",
    background: "#ffffff",
  },
  {
    id: "neutral",
    name: "Neutral Gray",
    description: "Neutral gray palette with high readability",
    primary: "#374151",
    secondary: "#f3f4f6",
    accent: "#6b7280",
    muted: "#f9fafb",
    background: "#ffffff",
  },
  {
    id: "teal",
    name: "Industrial Teal",
    description: "Professional teal palette for manufacturing",
    primary: "#14b8a6",
    secondary: "#f0fdfa",
    accent: "#0d9488",
    muted: "#f0fdfa",
    background: "#ffffff",
  },
  {
    id: "formx",
    name: "Form(X) Brand",
    description: "Original Form(X) gold and gray palette",
    primary: "#d4c273",
    secondary: "#e8dcaa",
    accent: "#525253",
    muted: "#f9fafb",
    background: "#ffffff",
  },
]

export function ColorSchemePreview() {
  const [selectedScheme, setSelectedScheme] = useState("blue")

  const scheme = colorSchemes.find((s) => s.id === selectedScheme) || colorSchemes[0]

  return (
    <div className="space-y-8">
      <RadioGroup
        value={selectedScheme}
        onValueChange={setSelectedScheme}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {colorSchemes.map((colorScheme) => (
          <div key={colorScheme.id}>
            <RadioGroupItem
              value={colorScheme.id}
              id={colorScheme.id}
              className="peer sr-only"
              aria-label={colorScheme.name}
            />
            <Label
              htmlFor={colorScheme.id}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="mb-4 flex items-center justify-center space-x-2">
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: colorScheme.primary }}
                  aria-hidden="true"
                />
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: colorScheme.secondary }}
                  aria-hidden="true"
                />
                <div
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: colorScheme.accent }}
                  aria-hidden="true"
                />
              </div>
              <div className="text-center">
                <p className="font-medium">{colorScheme.name}</p>
                <p className="text-sm text-muted-foreground">{colorScheme.description}</p>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 space-y-4">
              <h4 className="font-medium">Buttons</h4>
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h4 className="font-medium">Status Indicators</h4>
              <div className="flex flex-wrap gap-2">
                <Badge>Badge</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="success">Completed</StatusBadge>
                <StatusBadge status="warning">In Progress</StatusBadge>
                <StatusBadge status="error">Failed</StatusBadge>
                <StatusBadge status="info">Info</StatusBadge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h4 className="font-medium">Alerts</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 p-2 rounded-md bg-green-50 text-green-700 border border-green-200">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Operation completed successfully</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  <Info className="h-4 w-4" />
                  <span className="text-sm">Information message</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Warning: Please review before proceeding</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-md bg-red-50 text-red-700 border border-red-200">
                  <X className="h-4 w-4" />
                  <span className="text-sm">Error: Operation failed</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-4">
              <h4 className="font-medium">Typography</h4>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold">Heading 1</h1>
                <h2 className="text-xl font-bold">Heading 2</h2>
                <h3 className="text-lg font-bold">Heading 3</h3>
                <p className="text-base">Regular paragraph text</p>
                <p className="text-sm text-muted-foreground">Small muted text</p>
                <p>
                  Text with{" "}
                  <a href="#" className="text-primary underline">
                    links
                  </a>{" "}
                  and <strong>emphasis</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => alert(`Theme ${scheme.name} would be applied in a real implementation`)}>
          Apply Theme
        </Button>
      </div>
    </div>
  )
}
