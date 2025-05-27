import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileUp, ArrowRight, Check, Info, AlertCircle } from "lucide-react"
import { getProcessById } from "@/lib/manufacturing-processes"

export async function generateMetadata({ params }: { params: { processId: string } }): Promise<Metadata> {
  const process = getProcessById(params.processId)

  if (!process) {
    return {
      title: "Process Not Found | Form(X)",
      description: "The requested manufacturing process was not found.",
    }
  }

  return {
    title: `${process.name} | Form(X)`,
    description: process.description,
  }
}

export default function ProcessDetailPage({ params }: { params: { processId: string } }) {
  const process = getProcessById(params.processId)

  if (!process) {
    notFound()
  }

  return (
    <main className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-dark-grey">
          {process.name}
        </h1>
        <p className="max-w-[700px] text-brand-light-grey md:text-xl/relaxed">{process.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button asChild className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey">
            <Link href={`/upload?process=${process.id}`}>
              <FileUp className="mr-2 h-4 w-4" />
              Upload Files
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/quote">
              Get a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative mb-16 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark-gold/20 to-transparent z-10"></div>
        <Image
          src={`/abstract-geometric-shapes.png?height=400&width=1200&query=${process.name} manufacturing process visualization`}
          alt={`${process.name} process visualization`}
          width={1200}
          height={400}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute bottom-0 left-0 p-6 z-20">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold text-brand-dark-grey mb-2">Process Highlights</h2>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-brand-dark-gold mr-2 mt-0.5" />
                <span>Precision manufacturing with tight tolerances</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-brand-dark-gold mr-2 mt-0.5" />
                <span>Wide range of material options</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-brand-dark-gold mr-2 mt-0.5" />
                <span>Fast turnaround times with expedited options</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8 bg-gray-100/50 p-1 rounded-xl">
          <TabsTrigger
            value="overview"
            className="text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-brand-dark-grey data-[state=active]:shadow-sm rounded-lg"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="materials"
            className="text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-brand-dark-grey data-[state=active]:shadow-sm rounded-lg"
          >
            Materials
          </TabsTrigger>
          <TabsTrigger
            value="finishes"
            className="text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-brand-dark-grey data-[state=active]:shadow-sm rounded-lg"
          >
            Finishes
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="text-sm md:text-base data-[state=active]:bg-white data-[state=active]:text-brand-dark-grey data-[state=active]:shadow-sm rounded-lg"
          >
            Specifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-brand-dark-grey">About {process.name}</h2>
              <div className="prose max-w-none">
                <p className="text-brand-light-grey mb-4">
                  {process.description} This manufacturing process is ideal for creating precise, high-quality parts
                  with excellent repeatability and consistency.
                </p>
                <h3 className="text-xl font-semibold mb-2 text-brand-dark-grey">Key Benefits</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-dark-gold mr-2 mt-0.5" />
                    <span>Precision manufacturing with tight tolerances</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-dark-gold mr-2 mt-0.5" />
                    <span>Wide range of material options to suit your application</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-dark-gold mr-2 mt-0.5" />
                    <span>Various finishing options for both functional and aesthetic requirements</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-dark-gold mr-2 mt-0.5" />
                    <span>Fast turnaround times with expedited options available</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand-dark-gold mr-2 mt-0.5" />
                    <span>Cost-effective for both prototyping and production runs</span>
                  </li>
                </ul>
                <h3 className="text-xl font-semibold mb-2 text-brand-dark-grey">Common Applications</h3>
                <p className="text-brand-light-grey mb-4">
                  {process.name} is commonly used in industries such as aerospace, automotive, consumer products,
                  medical devices, and industrial equipment manufacturing.
                </p>
              </div>
            </div>
            <div>
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-brand-dark-gold/10 to-brand-light-gold/5 border-b">
                  <CardTitle>Process Specifications</CardTitle>
                  <CardDescription>Key specifications for {process.name}</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-brand-dark-grey">Lead Time</h4>
                      <p className="text-sm text-brand-light-grey">
                        {process.leadTimeRange.min}-{process.leadTimeRange.max} business days
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-brand-dark-grey">Quantity Range</h4>
                      <p className="text-sm text-brand-light-grey">
                        {process.minQuantity} - {process.maxQuantity} units
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-brand-dark-grey">File Types</h4>
                      <div className="flex flex-wrap gap-1">
                        {process.acceptedFileTypes.map((fileType) => (
                          <Badge key={fileType} variant="outline" className="text-xs">
                            {fileType}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {process.dimensionLimits?.maxLength && (
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-brand-dark-grey">Max Dimensions</h4>
                        <p className="text-sm text-brand-light-grey">
                          {process.dimensionLimits.maxLength}mm × {process.dimensionLimits.maxWidth}mm
                          {process.dimensionLimits.maxHeight ? ` × ${process.dimensionLimits.maxHeight}mm` : ""}
                        </p>
                      </div>
                    )}
                    {process.dimensionLimits?.maxDiameter && (
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium text-brand-dark-grey">Diameter Range</h4>
                        <p className="text-sm text-brand-light-grey">
                          {process.dimensionLimits.minDiameter || 0}mm - {process.dimensionLimits.maxDiameter}mm
                        </p>
                      </div>
                    )}
                  </div>

                  <Separator className="my-6" />

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-brand-dark-gold mr-2 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-brand-dark-grey">Design Tips</h4>
                        <p className="text-sm text-brand-light-grey mt-1">
                          For optimal results with {process.name}, consider these design guidelines:
                        </p>
                        <ul className="text-sm text-brand-light-grey list-disc list-inside mt-2 space-y-1">
                          <li>Design with the manufacturing process constraints in mind</li>
                          <li>Include appropriate tolerances for critical dimensions</li>
                          <li>Consider material properties when designing features</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">Need Help?</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Our engineering team is available to help with design reviews and process selection.
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="mt-2 border-amber-600 text-amber-700 hover:bg-amber-100"
                    >
                      <Link href="/contact">Contact Engineering</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="materials" className="mt-0">
          <h2 className="text-2xl font-bold mb-6 text-brand-dark-grey">Available Materials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.materials.map((material) => (
              <Card key={material.id} className="overflow-hidden border-0 shadow-md">
                <div className="h-3" style={{ backgroundColor: material.color || process.accentColor }}></div>
                <CardHeader>
                  <CardTitle>{material.name}</CardTitle>
                  {material.description && <CardDescription>{material.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {material.minThickness !== undefined && material.maxThickness !== undefined && (
                      <div>
                        <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Thickness Range</h4>
                        <p className="text-sm text-brand-light-grey">
                          {material.minThickness}mm - {material.maxThickness}mm
                        </p>
                      </div>
                    )}
                    {material.availableFinishes && material.availableFinishes.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Compatible Finishes</h4>
                        <div className="flex flex-wrap gap-1">
                          {material.availableFinishes.map((finishId) => {
                            const finish = process.finishes.find((f) => f.id === finishId)
                            return finish ? (
                              <Badge key={finishId} variant="outline" className="text-xs">
                                {finish.name}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                    {material.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Notes</h4>
                        <p className="text-sm text-brand-light-grey">{material.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="finishes" className="mt-0">
          <h2 className="text-2xl font-bold mb-6 text-brand-dark-grey">Available Finishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.finishes.map((finish) => (
              <Card key={finish.id} className="overflow-hidden border-0 shadow-md">
                <div className="h-3" style={{ backgroundColor: finish.color || process.accentColor }}></div>
                <CardHeader>
                  <CardTitle>{finish.name}</CardTitle>
                  {finish.description && <CardDescription>{finish.description}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {finish.leadTimeAdd !== undefined && (
                      <div>
                        <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Additional Lead Time</h4>
                        <p className="text-sm text-brand-light-grey">
                          {finish.leadTimeAdd} {finish.leadTimeAdd === 1 ? "day" : "days"}
                        </p>
                      </div>
                    )}
                    {finish.compatibleMaterials && finish.compatibleMaterials.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Compatible Materials</h4>
                        <div className="flex flex-wrap gap-1">
                          {finish.compatibleMaterials.map((materialId) => {
                            const material = process.materials.find((m) => m.id === materialId)
                            return material ? (
                              <Badge key={materialId} variant="outline" className="text-xs">
                                {material.name}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>
                    )}
                    {finish.notes && (
                      <div>
                        <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Notes</h4>
                        <p className="text-sm text-brand-light-grey">{finish.notes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="mt-0">
          <h2 className="text-2xl font-bold mb-6 text-brand-dark-grey">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-brand-dark-gold/10 to-brand-light-gold/5 border-b">
                <CardTitle>Process Parameters</CardTitle>
                <CardDescription>Technical specifications for {process.name}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Lead Time</h4>
                      <p className="text-sm text-brand-light-grey">
                        {process.leadTimeRange.min}-{process.leadTimeRange.max} business days
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Quantity Range</h4>
                      <p className="text-sm text-brand-light-grey">
                        {process.minQuantity} - {process.maxQuantity} units
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Accepted File Types</h4>
                    <div className="flex flex-wrap gap-1">
                      {process.acceptedFileTypes.map((fileType) => (
                        <Badge key={fileType} variant="outline" className="text-xs">
                          {fileType}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {process.dimensionLimits && (
                    <div>
                      <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Dimension Limits</h4>
                      <ul className="text-sm text-brand-light-grey list-disc list-inside">
                        {process.dimensionLimits.maxLength && (
                          <li>Maximum Length: {process.dimensionLimits.maxLength}mm</li>
                        )}
                        {process.dimensionLimits.maxWidth && (
                          <li>Maximum Width: {process.dimensionLimits.maxWidth}mm</li>
                        )}
                        {process.dimensionLimits.maxHeight && (
                          <li>Maximum Height: {process.dimensionLimits.maxHeight}mm</li>
                        )}
                        {process.dimensionLimits.maxDiameter && (
                          <li>Maximum Diameter: {process.dimensionLimits.maxDiameter}mm</li>
                        )}
                        {process.dimensionLimits.minDiameter && (
                          <li>Minimum Diameter: {process.dimensionLimits.minDiameter}mm</li>
                        )}
                        {process.dimensionLimits.maxWeight && (
                          <li>Maximum Weight: {process.dimensionLimits.maxWeight}kg</li>
                        )}
                      </ul>
                    </div>
                  )}

                  {process.additionalFields && process.additionalFields.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Additional Options</h4>
                      <ul className="text-sm text-brand-light-grey list-disc list-inside">
                        {process.additionalFields.map((field) => (
                          <li key={field.id}>
                            {field.name}
                            {field.type === "select" && field.options && (
                              <>: {field.options.map((o) => o.name).join(", ")}</>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-brand-dark-gold/10 to-brand-light-gold/5 border-b">
                <CardTitle>Design Guidelines</CardTitle>
                <CardDescription>Best practices for {process.name}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-brand-dark-grey mb-1">File Preparation</h4>
                    <ul className="text-sm text-brand-light-grey list-disc list-inside">
                      <li>Ensure all dimensions are in millimeters (mm)</li>
                      <li>Include all necessary views and details in your files</li>
                      <li>Specify tolerances where critical dimensions are required</li>
                      <li>Ensure your file is clean and optimized for manufacturing</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Design Considerations</h4>
                    <ul className="text-sm text-brand-light-grey list-disc list-inside">
                      <li>Design with the manufacturing process in mind</li>
                      <li>Consider material properties when designing features</li>
                      <li>Avoid unnecessarily complex geometries when possible</li>
                      <li>Include draft angles and fillets where appropriate</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-brand-dark-grey mb-1">Quality Assurance</h4>
                    <p className="text-sm text-brand-light-grey">
                      All parts undergo quality inspection before shipping. For critical dimensions, specify inspection
                      requirements in your notes during the ordering process.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-gradient-to-r from-brand-dark-gold/10 to-brand-light-gold/5 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-brand-dark-grey">Ready to Get Started?</h2>
        <p className="max-w-[700px] mx-auto text-brand-light-grey mb-6">
          Upload your files now to get an instant quote for your {process.name} project.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey">
            <Link href={`/upload?process=${process.id}`}>
              <FileUp className="mr-2 h-4 w-4" />
              Upload Files
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
