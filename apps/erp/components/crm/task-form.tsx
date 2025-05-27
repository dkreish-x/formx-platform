"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { DatePicker } from "@/components/ui/date-picker"

export interface TaskFormProps {
  task?: {
    id?: string
    title: string
    description: string
    dueDate: Date | null
    priority: string
    status: string
    assignedTo: string
    relatedTo?: {
      type: string
      id: string
      name: string
    }
  }
  isEditing?: boolean
}

const defaultTask = {
  title: "",
  description: "",
  dueDate: null,
  priority: "medium",
  status: "pending",
  assignedTo: "",
}

export function TaskForm({ task = defaultTask, isEditing = false }: TaskFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState(task)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, dueDate: date }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real implementation, you would save the task here
    console.log("Saving task:", formData)

    // Redirect back to tasks page
    router.push("/crm/tasks")
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "Edit Task" : "Create New Task"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter task title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <DatePicker selected={formData.dueDate} onSelect={handleDateChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="deferred">Deferred</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To *</Label>
              <Select value={formData.assignedTo} onValueChange={(value) => handleSelectChange("assignedTo", value)}>
                <SelectTrigger id="assignedTo">
                  <SelectValue placeholder="Select team member" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jane-doe">Jane Doe</SelectItem>
                  <SelectItem value="john-smith">John Smith</SelectItem>
                  <SelectItem value="mike-wilson">Mike Wilson</SelectItem>
                  <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                  <SelectItem value="david-chen">David Chen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.relatedTo && (
            <div className="p-4 border rounded-md bg-muted/20">
              <Label className="block mb-2">Related To</Label>
              <div className="text-sm">
                <span className="font-medium">{formData.relatedTo.type}: </span>
                <span>{formData.relatedTo.name}</span>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/crm/tasks")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : isEditing ? "Update Task" : "Create Task"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
