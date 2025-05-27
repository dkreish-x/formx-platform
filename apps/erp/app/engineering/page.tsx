import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Engineering | Form(X) Manufacturing",
  description: "Engineering and design management",
}

export default function EngineeringPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Engineering</h1>
          <p className="text-muted-foreground">Manage engineering projects, designs, and documentation.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Projects</CardTitle>
            <CardDescription>Manage engineering projects</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Track and manage engineering projects and timelines.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>CAD/CAM</CardTitle>
            <CardDescription>Design and manufacturing files</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage CAD files and manufacturing specifications.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Bill of Materials</CardTitle>
            <CardDescription>Manage product BOMs</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create and manage bills of materials for products.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Revisions</CardTitle>
            <CardDescription>Track design changes</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage design revisions and change history.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
