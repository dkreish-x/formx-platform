import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ManufacturingQuoteGenerator } from "@/components/manufacturing-quote-generator"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Send, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "Manufacturing Quote Generator",
  description: "Generate detailed quotes for manufacturing services",
}

export default function ManufacturingQuotePage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manufacturing Quote Generator</h1>
          <p className="text-muted-foreground">
            Create detailed quotes for laser cutting, CNC machining, and sheet metal fabrication
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Quote
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Templates
          </Button>
          <Button variant="outline" size="sm">
            <Send className="mr-2 h-4 w-4" />
            Send Quote
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="quote" className="w-full">
        <TabsList>
          <TabsTrigger value="quote">Quote Builder</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Quote History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="quote" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manufacturing Quote Builder</CardTitle>
              <CardDescription>Generate detailed quotes for manufacturing services</CardDescription>
            </CardHeader>
            <CardContent>
              <ManufacturingQuoteGenerator />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quote Templates</CardTitle>
              <CardDescription>Manage and use quote templates for different services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Quote templates module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quote History</CardTitle>
              <CardDescription>View and manage past quotes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Quote history module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quote Analytics</CardTitle>
              <CardDescription>Analyze quote conversion rates and pricing trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                Quote analytics module will be available in the next update
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
