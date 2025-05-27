"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" asChild className="mr-4">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Project</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Project Name</label>
                <Input placeholder="Enter project name" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Customer</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="acme">Acme Industries</SelectItem>
                    <SelectItem value="techcorp">TechCorp Solutions</SelectItem>
                    <SelectItem value="innovate">Innovate Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Project Manager</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="sarah">Sarah Williams</SelectItem>
                    <SelectItem value="mike">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <Input type="date" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input type="date" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Budget</label>
                <Input placeholder="Enter budget" className="mt-1" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">Description</label>
            <Textarea placeholder="Enter project description" className="mt-1" rows={4} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <Link href="/projects">Cancel</Link>
        </Button>
        <Button>Create Project</Button>
      </div>
    </div>
  )
}
