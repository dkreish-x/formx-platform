"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Maximize2, Minimize2, RotateCcw, Download } from "lucide-react"
import Image from "next/image"

interface PartViewerProps {
  partId: string
  fileType?: string
}

export default function PartViewer({ partId, fileType }: PartViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [activeView, setActiveView] = useState("3d")

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const rotateModel = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  return (
    <Card className={`${isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""}`}>
      <CardContent className={`p-0 ${isFullscreen ? "h-full" : ""}`}>
        <div className="relative">
          <Tabs defaultValue="3d" value={activeView} onValueChange={setActiveView}>
            <div className="flex justify-between items-center p-3 border-b">
              <TabsList>
                <TabsTrigger value="3d">3D View</TabsTrigger>
                <TabsTrigger value="front">Front</TabsTrigger>
                <TabsTrigger value="side">Side</TabsTrigger>
                <TabsTrigger value="top">Top</TabsTrigger>
              </TabsList>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" onClick={rotateModel}>
                  <RotateCcw className="h-4 w-4" />
                  <span className="sr-only">Rotate</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  <span className="sr-only">{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
                </Button>
              </div>
            </div>

            <div className={`bg-gray-100 ${isFullscreen ? "h-[calc(100vh-56px)]" : "aspect-square"}`}>
              <TabsContent value="3d" className="h-full m-0">
                <div className="relative h-full flex items-center justify-center">
                  <Image
                    src="/3d-viewer-screenshot.png"
                    alt="3D model preview"
                    width={800}
                    height={800}
                    className="max-h-full max-w-full object-contain"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  />
                  <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs">
                    {fileType || "model/step"} • {partId}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="front" className="h-full m-0">
                <div className="h-full flex items-center justify-center">
                  <Image
                    src="/3d-viewer-screenshot.png"
                    alt="Front view"
                    width={800}
                    height={800}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </TabsContent>
              <TabsContent value="side" className="h-full m-0">
                <div className="h-full flex items-center justify-center">
                  <Image
                    src="/3d-viewer-screenshot.png"
                    alt="Side view"
                    width={800}
                    height={800}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </TabsContent>
              <TabsContent value="top" className="h-full m-0">
                <div className="h-full flex items-center justify-center">
                  <Image
                    src="/3d-viewer-screenshot.png"
                    alt="Top view"
                    width={800}
                    height={800}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
