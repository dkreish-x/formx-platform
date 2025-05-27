import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "CAD/CAM | Form(X) Manufacturing",
  description: "CAD/CAM file management",
}

export default function CadCamPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CAD/CAM Management</h1>
          <p className="text-muted-foreground">Manage CAD files and manufacturing specifications.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>CAD Files</CardTitle>
            <CardDescription>Manage design files</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Upload, organize, and version control CAD files.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>CAM Programs</CardTitle>
            <CardDescription>Manufacturing programs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage CNC programs and manufacturing instructions.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Drawing Repository</CardTitle>
            <CardDescription>Technical drawings</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage technical drawings and specifications.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
