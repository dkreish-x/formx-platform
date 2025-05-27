"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PartConfigurationForm from "@/components/part-configuration-form"
import PartViewer from "@/components/part-viewer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, ShoppingCart } from "lucide-react"
import Link from "next/link"
import QuantityPricingTable from "@/components/quantity-pricing-table"
import RealTimePricing from "@/components/real-time-pricing"
import DesignTips from "@/components/design-tips"
import MaterialComparison from "@/components/material-comparison"
import { toast } from "@/components/ui/use-toast"

interface PartData {
  id: string
  partName: string
  process: string
  material: string
  finish: string
  quantity: number
  tolerance: string
  fileName: string
  fileSize: number
  fileType: string
  fileUrl?: string
  createdAt: string
  dimensions?: {
    x: number
    y: number
    z: number
  }
  additionalOptions?: Record<string, any>
}

export default function ConfigurePage({ params }: { params: { partId: string } }) {
  const router = useRouter()
  const [part, setPart] = useState<PartData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("configure")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    // In a real app, this would fetch the part data from your database
    // For now, we'll simulate fetching part data
    const fetchPart = async () => {
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Get file metadata if available
      let fileName = "example-part.step"
      let fileSize = 2500000
      let fileType = "model/step"

      try {
        const storedMetadata = localStorage.getItem("uploadedFileMetadata")
        if (storedMetadata) {
          const metadata = JSON.parse(storedMetadata)
          fileName = metadata.name || fileName
          fileSize = metadata.size || fileSize
          fileType = metadata.type || fileType
        }
      } catch (e) {
        console.error("Error parsing file metadata", e)
      }

      // Mock part data
      const mockPart: PartData = {
        id: params.partId,
        partName: fileName.split(".")[0] || "Example Part",
        process: "3d-printing",
        material: "sla-standard",
        finish: "as-printed",
        quantity: 1,
        tolerance: "Standard",
        fileName,
        fileSize,
        fileType,
        createdAt: new Date().toISOString(),
        dimensions: {
          x: 0.438,
          y: 0.624,
          z: 0.486,
        },
        additionalOptions: {},
      }

      setPart(mockPart)
      setQuantity(mockPart.quantity)
      setIsLoading(false)
    }

    fetchPart()
  }, [params.partId])

  const handleQuantityChange = (newQuantity: number) => {
    if (!part) return

    // Update part quantity
    setPart({
      ...part,
      quantity: newQuantity,
    })

    setQuantity(newQuantity)
  }

  if (isLoading || !part) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-dark-gold border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-brand-light-grey">Loading part configuration...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container max-w-[1600px]">
          <div className="py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/quote" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{part.partName}</h1>
                <p className="text-sm text-gray-500">Quote {params.partId}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upload">Upload</TabsTrigger>
                  <TabsTrigger value="configure">Configure</TabsTrigger>
                  <TabsTrigger value="review">Review</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-[1600px] py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - 3D viewer */}
          <div className="lg:col-span-1 space-y-4">
            <PartViewer partId={params.partId} fileType={part.fileType} />

            <RealTimePricing part={part} quantity={quantity} />

            <QuantityPricingTable initialQuantity={part.quantity} onQuantityChange={handleQuantityChange} part={part} />

            {part.process && <MaterialComparison processId={part.process} />}
          </div>

          {/* Right column - Configuration options */}
          <div className="lg:col-span-2">
            <Card className="mb-4">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Part Specification</h2>
                  <div className="text-sm text-gray-500">1 selected</div>
                </div>

                <PartConfigurationForm part={part} onPartChange={(updatedPart) => setPart(updatedPart as PartData)} />
              </CardContent>
            </Card>

            {part.process && <DesignTips processId={part.process} />}

            <div className="flex justify-end mt-6">
              <Button
                className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white"
                onClick={() => {
                  // Add to cart functionality
                  const part = {
                    id: params.partId,
                    partName: "Example Part",
                    process: "3d-printing",
                    material: "sla-standard",
                    finish: "as-printed",
                    quantity: quantity,
                    tolerance: "Standard",
                    leadTime: "Standard",
                    price: 149.99,
                  }

                  // Show success toast
                  toast({
                    title: "Added to cart",
                    description: "Your part has been added to the cart successfully.",
                  })

                  // Navigate to cart page after a short delay
                  setTimeout(() => {
                    router.push("/cart")
                  }, 500)
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
