import { Button } from "@/components/ui/button"
import { MeetingNotes } from "@/components/crm/meeting-notes"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MeetingNotesPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/crm/meetings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Meeting Notes</h1>
      </div>

      <MeetingNotes meetingId={params.id} />
    </div>
  )
}
