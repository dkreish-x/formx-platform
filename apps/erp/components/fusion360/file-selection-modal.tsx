"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Search, Calendar, Check } from "lucide-react"
import { useState } from "react"

interface FusionFile {
  id: string
  fileName: string
  urn: string
  itemId: string
  versionId: string
  assemblyName: string | null
  lastModified: string
}

interface FileSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectFile: (file: FusionFile) => void
  lineItemId?: string
  lineItemName?: string
}

export function FileSelectionModal({
  isOpen,
  onClose,
  onSelectFile,
  lineItemId,
  lineItemName,
}: FileSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for Fusion 360 files
  const mockFusionFiles: FusionFile[] = [
    {
      id: "file1",
      fileName: "Bracket_Assembly_v3.f3d",
      urn: "urn:adsk.wipprod:fs.file:vf.Abc123DEF456==",
      itemId: "item123",
      versionId: "3",
      assemblyName: "Main Assembly",
      lastModified: "2023-04-12",
    },
    {
      id: "file2",
      fileName: "Connector_Part_v2.f3d",
      urn: "urn:adsk.wipprod:fs.file:vf.Xyz789ABC==",
      itemId: "item456",
      versionId: "2",
      assemblyName: null,
      lastModified: "2023-04-10",
    },
    {
      id: "file3",
      fileName: "Manufacturing_Drawing.dwg",
      urn: "urn:adsk.wipprod:fs.file:vf.DEF456GHI==",
      itemId: "item789",
      versionId: "1",
      assemblyName: null,
      lastModified: "2023-04-08",
    },
    {
      id: "file4",
      fileName: "Precision_Part_A1.f3d",
      urn: "urn:adsk.wipprod:fs.file:vf.JKL789MNO==",
      itemId: "item101",
      versionId: "5",
      assemblyName: "Sub-Assembly A",
      lastModified: "2023-04-15",
    },
    {
      id: "file5",
      fileName: "Custom_Bracket_B2.f3d",
      urn: "urn:adsk.wipprod:fs.file:vf.PQR123STU==",
      itemId: "item102",
      versionId: "2",
      assemblyName: null,
      lastModified: "2023-04-14",
    },
    {
      id: "file6",
      fileName: "Connector_C3.f3d",
      urn: "urn:adsk.wipprod:fs.file:vf.VWX456YZ==",
      itemId: "item103",
      versionId: "1",
      assemblyName: null,
      lastModified: "2023-04-13",
    },
  ]

  // Filter files based on search query
  const filteredFiles = mockFusionFiles.filter((file) =>
    file.fileName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            Select Fusion 360 File
            {lineItemName && <span className="text-muted-foreground ml-2">for {lineItemName}</span>}
          </DialogTitle>
          <DialogDescription>
            Choose a file from your Fusion 360 Team to link to this {lineItemId ? "line item" : "estimate"}.
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-y-auto flex-1 border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">File Name</TableHead>
                <TableHead className="w-[25%]">Assembly</TableHead>
                <TableHead className="w-[15%]">Version</TableHead>
                <TableHead className="w-[20%]">Last Modified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No files found
                  </TableCell>
                </TableRow>
              ) : (
                filteredFiles.map((file) => (
                  <TableRow
                    key={file.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onSelectFile(file)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                        {file.fileName}
                      </div>
                    </TableCell>
                    <TableCell>{file.assemblyName || "-"}</TableCell>
                    <TableCell>{file.versionId}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {file.lastModified}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose} disabled={true}>
            <Check className="mr-2 h-4 w-4" /> Select File
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
