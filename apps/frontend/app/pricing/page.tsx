import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <main className="container py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Transparent Pricing</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          Competitive rates for all your manufacturing needs
        </p>
      </div>

      <Tabs defaultValue="laser" className="w-full max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
          <TabsTrigger value="laser">Laser Cutting</TabsTrigger>
          <TabsTrigger value="cnc">CNC Routing</TabsTrigger>
          <TabsTrigger value="milling">CNC Milling</TabsTrigger>
          <TabsTrigger value="printing">3D Printing</TabsTrigger>
          <TabsTrigger value="welding">Welding</TabsTrigger>
          <TabsTrigger value="sheet">Sheet Metal</TabsTrigger>
          <TabsTrigger value="coating">Coatings</TabsTrigger>
        </TabsList>

        <TabsContent value="laser" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>For simple laser cutting projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-bold">
                  $5<span className="text-base font-normal text-muted-foreground">/minute</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Standard materials</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Up to 5mm thickness</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Standard lead time</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Basic DXF file support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Quote</Button>
              </CardFooter>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <CardDescription>For complex laser cutting needs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-bold">
                  $8<span className="text-base font-normal text-muted-foreground">/minute</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Premium materials</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Up to 12mm thickness</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Expedited lead time</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Advanced file support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Custom finishing options</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Quote</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For high-volume production</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-4xl font-bold">
                  Custom<span className="text-base font-normal text-muted-foreground"> pricing</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>All materials supported</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Maximum thickness capabilities</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Priority production</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Volume discounts</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>Dedicated account manager</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Contact Sales</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Material Pricing</h2>
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Material</th>
                    <th className="py-3 px-4 text-left font-medium">Thickness</th>
                    <th className="py-3 px-4 text-left font-medium">Price per sq. ft.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-3 px-4">Mild Steel</td>
                    <td className="py-3 px-4">1mm</td>
                    <td className="py-3 px-4">$5.00</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">Mild Steel</td>
                    <td className="py-3 px-4">3mm</td>
                    <td className="py-3 px-4">$7.50</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">Stainless Steel 304</td>
                    <td className="py-3 px-4">1mm</td>
                    <td className="py-3 px-4">$8.00</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">Stainless Steel 304</td>
                    <td className="py-3 px-4">3mm</td>
                    <td className="py-3 px-4">$12.00</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">Aluminum</td>
                    <td className="py-3 px-4">1mm</td>
                    <td className="py-3 px-4">$6.50</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">Aluminum</td>
                    <td className="py-3 px-4">3mm</td>
                    <td className="py-3 px-4">$9.00</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">Acrylic</td>
                    <td className="py-3 px-4">3mm</td>
                    <td className="py-3 px-4">$4.50</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-3 px-4">Acrylic</td>
                    <td className="py-3 px-4">5mm</td>
                    <td className="py-3 px-4">$6.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Similar content for other tabs */}
      </Tabs>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a Custom Quote?</h2>
        <p className="max-w-[600px] mx-auto text-muted-foreground mb-6">
          Our pricing is transparent and competitive. For custom projects or high-volume orders, contact us for a
          personalized quote.
        </p>
        <Button size="lg">Contact Us</Button>
      </div>
    </main>
  )
}
