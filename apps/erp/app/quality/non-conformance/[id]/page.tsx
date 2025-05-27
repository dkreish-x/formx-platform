import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NonConformanceReportPage({ params }: { params: { id: string } }) {
  // In a real implementation, this would be fetched from the API
  const ncr = {
    id: params.id,
    reportNumber: "NCR-2023-042",
    dateIssued: "2023-05-08",
    issuedBy: "Darrell Steward",
    status: "Open",
    severity: "High",
    program: "WIRE OP1 PROGRAM",
    operation: "CG 16 - 52.40 CLAMP GUIDES",
    reason: "Reason and description spelled out here.",
    affectedParts: 2,
    date: "01-12-2023 10:00:11am",
    items: [
      { qty: 1, name: "Milling - Output", type: "WIP", extras: 2 },
      { qty: 2, name: "CLAMP GUIDE BLANKS - BOTTOM", type: "Make", extras: 4 },
      { qty: 1, name: "[PreviousOpName] - Output", type: "Tool", extras: 0 },
    ],
    customFields: {
      text: "Test value",
      date: "12-12-2024",
      email: "hello@globalconstruction.co",
      assignedRoles: ["Katelyn Murphy", "Leslie Alexander"],
    },
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" asChild className="mr-4">
          <Link href="/quality/non-conformance">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Non-Conformance Report</h1>
        <div className="ml-auto">
          <Button variant="outline" size="sm" className="mr-2">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">WIRE OP1 PROGRAM</h2>
          <div className="text-sm text-gray-500 mb-1">CG 16 - 52.40 CLAMP GUIDES</div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Operation Details</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">User</div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-600">DS</span>
                  </div>
                  <span className="text-sm">Darrell Steward</span>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Date and Time</div>
                <div className="text-sm">{ncr.date}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500 mb-1">Affected Output Parts</div>
                <div className="text-sm">{ncr.affectedParts}</div>
                <Button variant="link" size="sm" className="px-0 h-auto text-blue-600">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Reason</h3>
          <p className="text-sm">{ncr.reason}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-4">Items</h3>
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-2 text-left font-medium text-gray-500">Qty per Op</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500">Item Name</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500">Type</th>
                <th className="px-4 py-2 text-left font-medium text-gray-500">Used for Extras</th>
                <th className="px-4 py-2 text-right font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {ncr.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3">{item.qty}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-gray-100 rounded flex items-center justify-center">
                        <Image
                          src="/intricate-metal-part.png"
                          alt={item.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div>{item.name}</div>
                        <Badge
                          variant="outline"
                          className={
                            item.type === "WIP"
                              ? "bg-purple-100 text-purple-800 border-purple-200"
                              : item.type === "Make"
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-orange-100 text-orange-800 border-orange-200"
                          }
                        >
                          {item.type}
                        </Badge>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={
                        item.type === "WIP"
                          ? "bg-purple-100 text-purple-800 border-purple-200"
                          : item.type === "Make"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-orange-100 text-orange-800 border-orange-200"
                      }
                    >
                      {item.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{item.extras}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium mb-4">Custom Fields</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Text</div>
            <div className="text-sm">{ncr.customFields.text}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Date</div>
            <div className="text-sm">{ncr.customFields.date}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Email</div>
            <div className="text-sm text-blue-600">{ncr.customFields.email}</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-sm text-gray-500 mb-2">Assigned Roles</div>
          <div className="flex flex-wrap gap-2">
            {ncr.customFields.assignedRoles.map((role, index) => (
              <Badge key={index} className="bg-blue-100 text-blue-800 border-blue-200">
                {role}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
