"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileSelectionModal } from "./file-selection-modal"
import { LinkedFilesTable } from "./linked-files-table"
import { Plus } from "lucide-react"

interface FusionFilesSectionProps {
  lineItemId?: string
  lineItemName?: string
}

export function FusionFilesSection({ lineItemId, lineItemName }: FusionFilesSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [linkedFiles, setLinkedFiles] = useState<any[]>([])

  const handleAddFile = (file: any) => {
    // Add the file to the linked files with additional properties
    setLinkedFiles([
      ...linkedFiles,
      {
        ...file,
        relatedId: lineItemId || null,
        relatedType: lineItemId ? "lineItem" : "estimate",
        locked: false,
      },
    ])
    setIsModalOpen(false)
  }

  const handleToggleLock = (fileId: string, locked: boolean) => {
    setLinkedFiles(linkedFiles.map((file) => (file.id === fileId ? { ...file, locked } : file)))
  }

  const handleRemoveFile = (fileId: string) => {
    setLinkedFiles(linkedFiles.filter((file) => file.id !== fileId))
  }

  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {lineItemId ? `CAD Files for ${lineItemName || "Line Item"}` : "CAD Files"}
          </h3>
          <Button onClick={() => setIsModalOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Select from Fusion 360
          </Button>
        </div>

        <LinkedFilesTable files={linkedFiles} onToggleLock={handleToggleLock} onRemoveFile={handleRemoveFile} />

        <FileSelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelectFile={handleAddFile}
          lineItemId={lineItemId}
          lineItemName={lineItemName}
        />
      </CardContent>
    </Card>
  )
}
