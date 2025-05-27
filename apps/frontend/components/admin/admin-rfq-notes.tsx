"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { Plus } from "lucide-react"

interface AdminRFQNotesProps {
  rfqId: string
  initialNotes: Array<{
    id: string
    text: string
    author: string
    date: string
  }>
}

export default function AdminRFQNotes({ rfqId, initialNotes }: AdminRFQNotesProps) {
  const [notes, setNotes] = useState(initialNotes)
  const [newNote, setNewNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddNote = async () => {
    if (!newNote.trim()) return

    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to add the note
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newNoteObj = {
        id: `note_${Date.now()}`,
        text: newNote,
        author: "Admin User", // In a real app, this would be the current user
        date: new Date().toLocaleString(),
      }

      setNotes([newNoteObj, ...notes])
      setNewNote("")

      toast({
        title: "Note added",
        description: "Your note has been added successfully.",
      })
    } catch (error) {
      console.error("Error adding note:", error)
      toast({
        title: "Error adding note",
        description: "There was an error adding your note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Internal Notes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Add a new internal note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <Button
            onClick={handleAddNote}
            disabled={isSubmitting || !newNote.trim()}
            className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey"
          >
            {isSubmitting ? (
              "Adding Note..."
            ) : (
              <>
                <Plus className="h-4 w-4 mr-1" />
                Add Note
              </>
            )}
          </Button>
        </div>

        <Separator />

        <div className="space-y-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div key={note.id} className="p-3 border rounded-md">
                <p className="text-sm text-brand-dark-grey">{note.text}</p>
                <div className="flex justify-between mt-2 text-xs text-brand-light-grey">
                  <span>{note.author}</span>
                  <span>{note.date}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-brand-light-grey">No internal notes yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
