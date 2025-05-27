"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export default function LaserCuttingConfigurator() {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Select defaultValue="stainless304">
              <SelectTrigger id="material">
                <SelectValue placeholder="Select material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stainless304">Stainless Steel 304</SelectItem>
                <SelectItem value="stainless316">Stainless Steel 316</SelectItem>
                <SelectItem value="aluminum">Aluminum</SelectItem>
                <SelectItem value="mildSteel">Mild Steel</SelectItem>
                <SelectItem value="brass">Brass</SelectItem>
                <SelectItem value="copper">Copper</SelectItem>
                <SelectItem value="acrylic">Acrylic</SelectItem>
                <SelectItem value="wood">Wood</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="thickness">Thickness (mm)</Label>
            <Select defaultValue="3">
              <SelectTrigger id="thickness">
                <SelectValue placeholder="Select thickness" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1mm</SelectItem>
                <SelectItem value="1.5">1.5mm</SelectItem>
                <SelectItem value="2">2mm</SelectItem>
                <SelectItem value="3">3mm</SelectItem>
                <SelectItem value="4">4mm</SelectItem>
                <SelectItem value="5">5mm</SelectItem>
                <SelectItem value="6">6mm</SelectItem>
                <SelectItem value="8">8mm</SelectItem>
                <SelectItem value="10">10mm</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="quantity"
                min={1}
                max={100}
                step={1}
                value={[quantity]}
                onValueChange={(value) => setQuantity(value[0])}
                className="flex-1"
              />
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                className="w-20"
                min={1}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Cutting Type</Label>
            <RadioGroup defaultValue="flat">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="flat" id="flat" />
                <Label htmlFor="flat">Flat Cutting</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tube" id="tube" />
                <Label htmlFor="tube">Tube Cutting</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="finish">Finish</Label>
            <Select defaultValue="deburred">
              <SelectTrigger id="finish">
                <SelectValue placeholder="Select finish" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ascut">As Cut</SelectItem>
                <SelectItem value="deburred">Deburred</SelectItem>
                <SelectItem value="polished">Polished</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="leadTime">Lead Time</Label>
            <Select defaultValue="standard">
              <SelectTrigger id="leadTime">
                <SelectValue placeholder="Select lead time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard (5-7 business days)</SelectItem>
                <SelectItem value="expedited">Expedited (3-4 business days)</SelectItem>
                <SelectItem value="rush">Rush (1-2 business days)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t pt-6">
        <h3 className="font-medium">Additional Options</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="tapping">Tapping</Label>
              <p className="text-sm text-muted-foreground">Add threaded holes to your parts</p>
            </div>
            <Switch id="tapping" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="countersink">Countersink</Label>
              <p className="text-sm text-muted-foreground">Add countersink holes for flush mounting</p>
            </div>
            <Switch id="countersink" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="bending">Bending</Label>
              <p className="text-sm text-muted-foreground">Add bends to your sheet metal parts</p>
            </div>
            <Switch id="bending" />
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline">Back</Button>
        <Button>Calculate Quote</Button>
      </div>
    </div>
  )
}
