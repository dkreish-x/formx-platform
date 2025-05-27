"use client"

import { Card } from "@/components/ui/card"
import Link from "next/link"

// Sample data for the sales pipeline
const pipelineData = [
  {
    stage: "Discovery",
    count: 5,
    value: "$113,500",
    color: "bg-blue-100 border-blue-300",
    opportunities: [
      { id: "OPP-003", name: "Prototype Development", customer: "Innovative Solutions", value: "$28,500" },
      { id: "OPP-005", name: "Equipment Upgrade", customer: "Precision Engineering", value: "$85,000" },
    ],
  },
  {
    stage: "Qualification",
    count: 3,
    value: "$67,800",
    color: "bg-indigo-100 border-indigo-300",
    opportunities: [
      { id: "OPP-006", name: "Consulting Services", customer: "MetalWorks Inc", value: "$22,800" },
      { id: "OPP-007", name: "Machine Repair", customer: "Advanced Manufacturing", value: "$45,000" },
    ],
  },
  {
    stage: "Proposal",
    count: 4,
    value: "$145,000",
    color: "bg-purple-100 border-purple-300",
    opportunities: [
      { id: "OPP-001", name: "Custom Machining Project", customer: "Acme Industries", value: "$45,000" },
      { id: "OPP-008", name: "Production Tooling", customer: "Precision Tools Ltd", value: "$100,000" },
    ],
  },
  {
    stage: "Negotiation",
    count: 2,
    value: "$120,000",
    color: "bg-amber-100 border-amber-300",
    opportunities: [{ id: "OPP-002", name: "Production Line Automation", customer: "TechCorp", value: "$120,000" }],
  },
  {
    stage: "Closing",
    count: 1,
    value: "$65,000",
    color: "bg-green-100 border-green-300",
    opportunities: [
      { id: "OPP-009", name: "Maintenance Contract", customer: "Global Manufacturing", value: "$65,000" },
    ],
  },
]

export function SalesPipeline() {
  return (
    <div className="w-full">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {pipelineData.map((stage) => (
          <Card
            key={stage.stage}
            className={`flex-shrink-0 w-[220px] ${stage.color} border-2 overflow-hidden shadow-sm`}
          >
            <div className="p-3 border-b bg-background/80">
              <div className="font-medium">{stage.stage}</div>
              <div className="flex justify-between mt-1">
                <div className="text-sm text-muted-foreground">{stage.count} deals</div>
                <div className="font-semibold">{stage.value}</div>
              </div>
            </div>
            <div className="bg-white">
              {stage.opportunities.map((opp) => (
                <Link
                  key={opp.id}
                  href={`/opportunities/${opp.id}`}
                  className="block border-b p-3 hover:bg-muted/20 transition-colors"
                >
                  <div className="font-medium truncate">{opp.name}</div>
                  <div className="text-sm text-muted-foreground truncate">{opp.customer}</div>
                  <div className="mt-1 font-semibold">{opp.value}</div>
                </Link>
              ))}
              <div className="p-2">
                <Link
                  href={`/opportunities?stage=${encodeURIComponent(stage.stage)}`}
                  className="text-xs text-primary hover:underline block text-center"
                >
                  View all
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
