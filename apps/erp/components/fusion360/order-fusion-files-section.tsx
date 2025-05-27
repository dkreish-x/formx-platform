"use client"
import { Card, CardContent } from "@/components/ui/card"
import { OrderLinkedFilesTable } from "./order-linked-files-table"

interface OrderFusionFilesSectionProps {
  lineItemId?: string
}

export function OrderFusionFilesSection({ lineItemId }: OrderFusionFilesSectionProps) {
  // Mock data for linked files
  const mockFiles = [
    {
      id: "file1",
      fileName: "Bracket_Assembly_v3.f3d",
      urn: "urn:adsk.wipprod:fs.file:vf.Abc123DEF456==",
      itemId: "item123",
      versionId: "3",
      assemblyName: "Main Assembly",
      relatedId: lineItemId === "lineItem1" ? "lineItem1" : null,
      relatedType: "lineItem",
      locked: true,
      fromEstimate: true,
    },
    {
      id: "file2",
      fileName: "Connector_Part_v2.f3d",
      urn: "urn:adsk.wipprod:fs.file:vf.Xyz789ABC==",
      itemId: "item456",
      versionId: "2",
      assemblyName: null,
      relatedId: lineItemId === "lineItem2" ? "lineItem2" : null,
      relatedType: "lineItem",
      locked: false,
      fromEstimate: true,
    },
    {
      id: "file3",
      fileName: "Manufacturing_Drawing.dwg",
      urn: "urn:adsk.wipprod:fs.file:vf.DEF456GHI==",
      itemId: "item789",
      versionId: "1",
      assemblyName: null,
      relatedId: lineItemId === "lineItem1" ? "lineItem1" : null,
      relatedType: "lineItem",
      locked: true,
      fromEstimate: false,
    },
  ]

  // Filter files based on lineItemId if provided
  const filteredFiles = lineItemId ? mockFiles.filter((file) => file.relatedId === lineItemId) : mockFiles

  return (
    <Card className="border-none shadow-sm">
      <CardContent className="p-0">
        <OrderLinkedFilesTable files={filteredFiles} />
      </CardContent>
    </Card>
  )
}
