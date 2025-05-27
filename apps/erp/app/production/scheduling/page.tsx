"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourceAllocation } from "@/components/production-resources"
import { ProductionCapacityChart } from "@/components/production-capacity-chart"
import { ScheduleConflicts } from "@/components/schedule-conflicts"
import { ScheduleTimeline } from "@/components/schedule-timeline"
import { ProductionSchedule } from "@/components/production-schedule"
import { MaterialRequirementsPlanning } from "@/components/material-requirements-planning"
import { StatisticalProcessControl } from "@/components/statistical-process-control"
import { ManufacturingDocumentation } from "@/components/manufacturing-documentation"
import { Calendar, Clock, Plus, Settings, FileText, BarChart2, Activity, ListChecks, Package } from "lucide-react"

export default function SchedulingPage() {
  const [activeTab, setActiveTab] = useState("schedule")

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Production Management</h1>
          <p className="text-muted-foreground">Plan, schedule, and optimize manufacturing operations</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Schedule
          </Button>
        </div>
      </div>

      <Tabs defaultValue="schedule" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="schedule">
            <Clock className="mr-2 h-4 w-4" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="timeline">
            <Calendar className="mr-2 h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="resources">
            <Settings className="mr-2 h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="capacity">
            <BarChart2 className="mr-2 h-4 w-4" />
            Capacity
          </TabsTrigger>
          <TabsTrigger value="mrp">
            <Package className="mr-2 h-4 w-4" />
            MRP
          </TabsTrigger>
          <TabsTrigger value="quality">
            <Activity className="mr-2 h-4 w-4" />
            SPC
          </TabsTrigger>
          <TabsTrigger value="docs">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <ListChecks className="mr-2 h-4 w-4" />
            Metrics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="space-y-6 mt-6">
          <ProductionSchedule />
          <ScheduleConflicts />
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6 mt-6">
          <ScheduleTimeline />
        </TabsContent>

        <TabsContent value="resources" className="space-y-6 mt-6">
          <ResourceAllocation />
        </TabsContent>

        <TabsContent value="capacity" className="space-y-6 mt-6">
          <ProductionCapacityChart />
        </TabsContent>

        <TabsContent value="mrp" className="space-y-6 mt-6">
          <MaterialRequirementsPlanning />
        </TabsContent>

        <TabsContent value="quality" className="space-y-6 mt-6">
          <StatisticalProcessControl />
        </TabsContent>

        <TabsContent value="docs" className="space-y-6 mt-6">
          <ManufacturingDocumentation />
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6 mt-6">
          <div className="flex items-center justify-center h-96 border rounded-md bg-muted/20">
            <div className="text-center">
              <BarChart2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium">Manufacturing Metrics Dashboard</h3>
              <p className="text-muted-foreground">This feature is coming soon</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
