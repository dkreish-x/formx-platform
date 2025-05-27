import { TaskForm } from "@/components/crm/task-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NewTaskPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/crm/tasks">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create New Task</h1>
      </div>

      <TaskForm />
    </div>
  )
}
