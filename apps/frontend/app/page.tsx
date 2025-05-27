import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileUp, Clock, CheckCircle, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { manufacturingProcesses } from "@/lib/manufacturing-processes"
import Image from "next/image"

export default function Home() {
  // Featured processes to show on the homepage
  const featuredProcessIds = ["flat-laser-cutting", "cnc-milling", "3d-printing", "sheet-metal-fabrication"]
  const featuredProcesses = manufacturingProcesses.filter((process) => featuredProcessIds.includes(process.id))

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section - Light, Modern Style */}
      <section className="relative bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-brand-light-gold/20 text-brand-dark-gold border-brand-light-gold/30 px-3 py-1 text-sm">
                Fast, Reliable Manufacturing
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                Custom Parts Manufactured On Demand
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Upload your CAD files and get instant quotes for CNC machining, 3D printing, laser cutting, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white rounded-md px-6 py-3"
                  asChild
                >
                  <Link href="/quote">
                    <FileUp className="mr-2 h-5 w-5" />
                    Upload & Get Quote
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md px-6 py-3"
                  asChild
                >
                  <Link href="/services">
                    View Services
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-dark-gold" />
                  <span className="text-sm text-gray-600">Fast Turnaround</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-dark-gold" />
                  <span className="text-sm text-gray-600">Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-brand-dark-gold" />
                  <span className="text-sm text-gray-600">Instant Quotes</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/manufacturing-facility.png"
                alt="Manufacturing facility with CNC machines"
                width={600}
                height={400}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section - Light, Modern Style */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Materials We Work With</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from a wide range of high-quality materials for your manufacturing needs
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Material Cards */}
            {[
              {
                name: "Aluminum",
                image: "/images/aluminum-texture.png",
              },
              {
                name: "Steel",
                image: "/images/steel-texture.png",
              },
              {
                name: "Stainless Steel",
                image: "/images/stainless-steel-texture.png",
              },
              {
                name: "Brass",
                image: "/images/brass-texture.png",
              },
              {
                name: "Copper",
                image: "/images/copper-texture.png",
              },
              {
                name: "Titanium",
                image: "/images/titanium-texture.png",
              },
            ].map((material) => (
              <div
                key={material.name}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow hover:scale-105 transition-transform duration-200"
              >
                <div className="h-32 bg-gray-100 relative">
                  <Image src={material.image || "/placeholder.svg"} alt={material.name} fill className="object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-medium text-gray-900">{material.name}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-gray-300" asChild>
              <Link href="/materials">View All Materials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Manufacturing Processes Section - Enhanced with Brand Colors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Manufacturing Processes</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select from our comprehensive range of manufacturing processes for your custom parts
            </p>
          </div>

          {/* Process Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Cutting Category */}
            <div className="bg-gradient-to-br from-brand-light-gold/10 to-brand-light-gold/5 rounded-xl p-6 shadow-sm border border-brand-light-gold/30">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-light-gold/30 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-dark-gold"
                  >
                    <path d="M12 22v-5"></path>
                    <path d="M9 8V2"></path>
                    <path d="M15 8V2"></path>
                    <path d="M6 8h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z"></path>
                    <path d="M6 17h12"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Cutting Processes</h3>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                  <span className="text-gray-700">Flat Laser Cutting</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                  <span className="text-gray-700">Tube Laser Cutting</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                  <span className="text-gray-700">CNC Routing</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="border-brand-dark-gold text-brand-dark-gold hover:bg-brand-light-gold/10"
                asChild
              >
                <Link href="/process/flat-laser-cutting">
                  Explore Cutting
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Machining Category */}
            <div className="bg-gradient-to-br from-brand-light-gold/15 to-brand-light-gold/10 rounded-xl p-6 shadow-sm border border-brand-light-gold/30">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-light-gold/30 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-dark-gold"
                  >
                    <path d="M3 7h5l2 3h6l2-3h3"></path>
                    <path d="M3 17h5l2-3h6l2 3h3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Machining Processes</h3>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                  <span className="text-gray-700">CNC Milling</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                  <span className="text-gray-700">CNC Turning</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                  <span className="text-gray-700">Multi-Axis Machining</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="border-brand-dark-gold text-brand-dark-gold hover:bg-brand-light-gold/10"
                asChild
              >
                <Link href="/process/cnc-milling">
                  Explore Machining
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* 3D Printing Category */}
            <div className="bg-gradient-to-br from-brand-light-gold/20 to-brand-light-gold/15 rounded-xl p-6 shadow-sm border border-brand-light-gold/30">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-light-gold/30 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-dark-gold"
                  >
                    <path d="M19 8v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8"></path>
                    <path d="m12 10 4-4-4-4-4 4 4 4Z"></path>
                    <path d="M9 18h6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">3D Printing</h3>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                  <span className="text-gray-700">FDM (Fused Deposition Modeling)</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                  <span className="text-gray-700">SLA (Stereolithography)</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                  <span className="text-gray-700">SLS (Selective Laser Sintering)</span>
                </li>
              </ul>
              <Button
                variant="outline"
                className="border-brand-dark-gold text-brand-dark-gold hover:bg-brand-light-gold/10"
                asChild
              >
                <Link href="/process/3d-printing">
                  Explore 3D Printing
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Second Row of Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Fabrication Category */}
            <div className="bg-gradient-to-br from-brand-light-gold/25 to-brand-light-gold/20 rounded-xl p-6 shadow-sm border border-brand-light-gold/30">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-light-gold/30 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-dark-gold"
                  >
                    <path d="M19 7h-3a2 2 0 0 0-2 2"></path>
                    <path d="M5 7h3a2 2 0 0 1 2 2"></path>
                    <path d="M12 22v-3"></path>
                    <path d="M5 22h14"></path>
                    <path d="M18 12v1"></path>
                    <path d="M6 12v1"></path>
                    <path d="M12 9v6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Fabrication Processes</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                    <span className="text-gray-700">Sheet Metal Bending</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                    <span className="text-gray-700">Welding</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                    <span className="text-gray-700">Metal Forming</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                    <span className="text-gray-700">Assembly</span>
                  </li>
                </ul>
              </div>
              <Button
                variant="outline"
                className="border-brand-dark-gold text-brand-dark-gold hover:bg-brand-light-gold/10"
                asChild
              >
                <Link href="/process/sheet-metal-fabrication">
                  Explore Fabrication
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Finishing Category */}
            <div className="bg-gradient-to-br from-brand-light-gold/30 to-brand-light-gold/25 rounded-xl p-6 shadow-sm border border-brand-light-gold/30">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-light-gold/30 flex items-center justify-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-brand-dark-gold"
                  >
                    <path d="M21.64 3.64a1.35 1.35 0 0 0-1.94 0L16 7.34a2 2 0 0 0-.59 1.42V10a2 2 0 0 1-2 2h-1.24a2 2 0 0 0-1.42.59l-3.7 3.71a1.35 1.35 0 0 0 0 1.94l1.42 1.42a1.35 1.35 0 0 0 1.94 0l3.7-3.71a2 2 0 0 0 .59-1.42V13a2 2 0 0 1 2-2h1.24a2 2 0 0 0 1.42-.59l3.7-3.71a1.35 1.35 0 0 0 0-1.94Z"></path>
                    <path d="M14 14.5a3 3 0 1 0-5 2.5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Finishing Processes</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                    <span className="text-gray-700">Powder Coating</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                    <span className="text-gray-700">Painting</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                    <span className="text-gray-700">Anodizing</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-brand-dark-gold rounded-full mr-2"></span>
                    <span className="text-gray-700">Surface Treatments</span>
                  </li>
                </ul>
              </div>
              <Button
                variant="outline"
                className="border-brand-dark-gold text-brand-dark-gold hover:bg-brand-light-gold/10"
                asChild
              >
                <Link href="/process/coatings">
                  Explore Finishing
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Featured Process Highlight */}
          <div className="bg-gradient-to-r from-brand-light-gold/20 to-brand-light-gold/5 rounded-xl p-8 shadow-sm border border-brand-light-gold/30 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="mb-4 bg-brand-light-gold/30 text-brand-dark-gold border-brand-light-gold/40 px-3 py-1">
                  Featured Process
                </Badge>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">FDM 3D Printing</h3>
                <p className="text-gray-600 mb-6">
                  Fused Deposition Modeling (FDM) is an additive manufacturing process that builds parts layer-by-layer
                  by heating and extruding thermoplastic filament. Perfect for prototypes, functional parts, and
                  low-volume production.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-brand-dark-gold mr-2" />
                    <span className="text-gray-700">Wide range of materials: PLA, ABS, PETG, TPU, Nylon</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-brand-dark-gold mr-2" />
                    <span className="text-gray-700">Cost-effective for prototyping and small production runs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-brand-dark-gold mr-2" />
                    <span className="text-gray-700">Quick turnaround times as fast as 1-2 days</span>
                  </div>
                </div>
                <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white" asChild>
                  <Link href="/process/3d-printing">
                    Learn More About FDM
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                <Image
                  src="/fdm-3d-printer-complex-part.png"
                  alt="FDM 3D Printing Process"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white px-6" size="lg" asChild>
              <Link href="/quote">Get Instant Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works - Light, Modern Style */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our simple 4-step process makes getting custom parts quick and easy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Upload Your Files",
                description: "Upload your CAD files in STEP, STL, or DXF format",
                icon: "📤",
              },
              {
                step: "2",
                title: "Configure Options",
                description: "Select material, finish, quantity, and other specifications",
                icon: "⚙️",
              },
              {
                step: "3",
                title: "Get Instant Quote",
                description: "Receive an instant quote based on your specifications",
                icon: "💰",
              },
              {
                step: "4",
                title: "Receive Your Parts",
                description: "We manufacture and ship your parts directly to you",
                icon: "📦",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 rounded-full bg-brand-light-gold/20 text-brand-dark-gold flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Light, Modern Style */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-brand-light-gold/10 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Upload your CAD files now and get an instant quote for your custom parts
            </p>
            <Button size="lg" className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white px-6 py-3" asChild>
              <Link href="/quote">
                <FileUp className="mr-2 h-5 w-5" />
                Upload & Get Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
