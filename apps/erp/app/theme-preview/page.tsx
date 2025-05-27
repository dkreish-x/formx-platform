import { ColorSchemePreview } from "@/components/color-scheme-preview"

export default function ThemePreviewPage() {
  return (
    <div className="container py-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Color Scheme Options</h1>
        <p className="text-muted-foreground">
          Select a color scheme that best fits your manufacturing system needs. Each option provides a different
          aesthetic while maintaining readability and usability.
        </p>
        <ColorSchemePreview />
      </div>
    </div>
  )
}
