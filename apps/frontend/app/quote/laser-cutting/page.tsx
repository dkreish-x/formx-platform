import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FileUploader from "@/components/file-uploader"
import LaserCuttingConfigurator from "@/components/configurators/laser-cutting-configurator"

export default function LaserCuttingQuotePage() {
  return (
    <main className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Laser Cutting Quote</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          Get an instant quote for your laser cutting project
        </p>
      </div>

      <Tabs defaultValue="upload" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Upload Files</TabsTrigger>
          <TabsTrigger value="configure">Configure</TabsTrigger>
          <TabsTrigger value="quote">Review Quote</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your DXF Files</CardTitle>
              <CardDescription>We accept DXF files for laser cutting projects</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configure" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configure Your Laser Cutting Project</CardTitle>
              <CardDescription>Specify materials, thickness, and other requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <LaserCuttingConfigurator />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quote" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Laser Cutting Quote</CardTitle>
              <CardDescription>Review your quote and proceed to checkout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Quote Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Material:</span>
                      <span>Stainless Steel 304</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Thickness:</span>
                      <span>3mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity:</span>
                      <span>10 pieces</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Finish:</span>
                      <span>Deburred</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lead Time:</span>
                      <span>5 business days</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Price Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Material Cost:</span>
                      <span>$45.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Laser Cutting:</span>
                      <span>$120.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Finishing:</span>
                      <span>$25.00</span>
                    </div>
                    <div className="flex justify-between font-medium text-base pt-2 border-t">
                      <span>Total:</span>
                      <span>$190.00</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline">Back to Configure</Button>
                  <Button>Proceed to Checkout</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
