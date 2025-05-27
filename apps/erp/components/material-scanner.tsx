"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { QrCode, Barcode, Check } from "lucide-react"

export function MaterialScanner() {
  const [scanMode, setScanMode] = useState<"qr" | "barcode" | "manual">("qr")
  const [materialCode, setMaterialCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scannedMaterial, setScannedMaterial] = useState<any>(null)

  const startScanning = () => {
    setIsScanning(true)
    // In a real implementation, this would activate the device camera
    // For now, we'll simulate a scan after a short delay
    setTimeout(() => {
      const fakeMaterial = {
        id: "MAT-2023-0143",
        type: "Aluminum 6061-T6",
        lotNumber: "LOT-AL6061-2023-043",
        quantity: "50 pcs",
        supplier: "Metal Suppliers Inc.",
        receivedDate: "2023-05-01",
      }
      setScannedMaterial(fakeMaterial)
      setIsScanning(false)
    }, 2000)
  }

  const handleManualEntry = () => {
    if (!materialCode) return

    // In a real implementation, this would validate the code against the database
    const fakeMaterial = {
      id: "MAT-" + materialCode,
      type: "Aluminum 6061-T6",
      lotNumber: "LOT-" + materialCode,
      quantity: "50 pcs",
      supplier: "Metal Suppliers Inc.",
      receivedDate: "2023-05-01",
    }
    setScannedMaterial(fakeMaterial)
  }

  const resetScanner = () => {
    setScannedMaterial(null)
    setMaterialCode("")
  }

  return (
    <Card>
      <CardContent className="p-4">
        {!scannedMaterial ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Button
                variant={scanMode === "qr" ? "default" : "outline"}
                onClick={() => setScanMode("qr")}
                className="flex-1"
              >
                <QrCode className="h-4 w-4 mr-2" />
                QR Code
              </Button>
              <Button
                variant={scanMode === "barcode" ? "default" : "outline"}
                onClick={() => setScanMode("barcode")}
                className="flex-1"
              >
                <Barcode className="h-4 w-4 mr-2" />
                Barcode
              </Button>
              <Button
                variant={scanMode === "manual" ? "default" : "outline"}
                onClick={() => setScanMode("manual")}
                className="flex-1"
              >
                Manual
              </Button>
            </div>

            {scanMode === "manual" ? (
              <div className="space-y-2">
                <Input
                  placeholder="Enter material code"
                  value={materialCode}
                  onChange={(e) => setMaterialCode(e.target.value)}
                />
                <Button onClick={handleManualEntry} className="w-full">
                  Submit
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-md p-4 h-48 flex flex-col items-center justify-center ${
                    isScanning ? "border-primary" : ""
                  }`}
                >
                  {isScanning ? (
                    <div className="text-center">
                      <div className="h-16 w-16 border-4 border-t-primary border-primary/30 rounded-full animate-spin mx-auto"></div>
                      <p className="mt-2 text-sm">Scanning {scanMode === "qr" ? "QR Code" : "Barcode"}...</p>
                    </div>
                  ) : (
                    <>
                      {scanMode === "qr" ? (
                        <QrCode className="h-12 w-12 text-muted-foreground mb-2" />
                      ) : (
                        <Barcode className="h-12 w-12 text-muted-foreground mb-2" />
                      )}
                      <p className="text-sm text-muted-foreground">
                        Position the {scanMode === "qr" ? "QR code" : "barcode"} in the center
                      </p>
                    </>
                  )}
                </div>
                <Button onClick={startScanning} disabled={isScanning} className="w-full">
                  {isScanning ? "Scanning..." : `Scan ${scanMode === "qr" ? "QR Code" : "Barcode"}`}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Material Scanned Successfully</h3>
                <p className="text-sm text-muted-foreground">Material has been added to this traveler</p>
              </div>
            </div>

            <div className="border rounded-md p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Material ID:</span>
                <span className="text-sm font-medium">{scannedMaterial.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Type:</span>
                <span className="text-sm font-medium">{scannedMaterial.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Lot Number:</span>
                <span className="text-sm font-medium">{scannedMaterial.lotNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Quantity:</span>
                <span className="text-sm font-medium">{scannedMaterial.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Supplier:</span>
                <span className="text-sm font-medium">{scannedMaterial.supplier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Received Date:</span>
                <span className="text-sm font-medium">{scannedMaterial.receivedDate}</span>
              </div>
            </div>

            <Button variant="outline" onClick={resetScanner} className="w-full">
              Scan Another Material
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
