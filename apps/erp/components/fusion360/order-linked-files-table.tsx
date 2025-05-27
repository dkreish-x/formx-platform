"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, FileText, Lock, Unlock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

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
  fromEstimate?: boolean
}

interface OrderLinkedFilesTableProps {
  files: LinkedFile[]
}

export function OrderLinkedFilesTable({ files }: OrderLinkedFilesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">File Name</TableHead>
            <TableHead className="w-[20%]">Version</TableHead>
            <TableHead className="w-[20%]">Status</TableHead>
            <TableHead className="w-[20%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No files linked
              </TableCell>
            </TableRow>
          ) : (
            files.map((file) => (
              <TableRow key={file.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    <div>
                      <div className="flex items-center gap-2">
                        {file.fileName}
                        {file.fromEstimate && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Badge variant="outline" className="text-xs">
                                  From Estimate
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>This file was linked in the original estimate</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      {file.assemblyName && <div className="text-xs text-muted-foreground">{file.assemblyName}</div>}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{file.versionId}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {file.locked ? (
                      <>
                        <Lock className="h-4 w-4 mr-1 text-amber-500" />
                        <span className="text-sm">Locked</span>
                      </>
                    ) : (
                      <>
                        <Unlock className="h-4 w-4 mr-1 text-green-500" />
                        <span className="text-sm">Unlocked</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Link href={`/fusion/${file.id}`}>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
