"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, FileText, Lock, Unlock, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

interface LinkedFile {
  id: string
  fileName: string
  urn: string
  itemId: string
  versionId: string
  assemblyName: string | null
  relatedId: string | null
  relatedType: string
  locked: boolean
}

interface LinkedFilesTableProps {
  files: LinkedFile[]
  onToggleLock: (fileId: string, locked: boolean) => void
  onRemoveFile: (fileId: string) => void
}

export function LinkedFilesTable({ files, onToggleLock, onRemoveFile }: LinkedFilesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">File Name</TableHead>
            <TableHead className="w-[15%]">Version</TableHead>
            <TableHead className="w-[15%]">Lock</TableHead>
            <TableHead className="w-[30%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No files linked. Click "Select from Fusion 360" to add files.
              </TableCell>
            </TableRow>
          ) : (
            files.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    <div>
                      <div>{file.fileName}</div>
                      {file.assemblyName && <div className="text-xs text-muted-foreground">{file.assemblyName}</div>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{file.versionId}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={file.locked}
                      onCheckedChange={(checked) => onToggleLock(file.id, checked)}
                      aria-label="Toggle lock"
                    />
                    {file.locked ? (
                      <Lock className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Unlock className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/fusion/${file.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => onRemoveFile(file.id)}>
                      <Trash2 className="h-4 w-4 mr-1 text-red-500" />
                      Remove
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
