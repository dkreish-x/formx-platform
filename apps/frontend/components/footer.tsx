import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-4">
        <div className="space-y-4">
          <h3 className="text-xl font-bold">
            Form<span className="text-brand-dark-gold">X</span>
          </h3>
          <p className="text-sm text-gray-600">
            Instant manufacturing quotes for laser cutting, CNC machining, 3D printing, and more.
          </p>
          <div className="flex space-x-3">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-gray-200">
              <Facebook className="h-4 w-4 text-gray-600" />
              <span className="sr-only">Facebook</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-gray-200">
              <Twitter className="h-4 w-4 text-gray-600" />
              <span className="sr-only">Twitter</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-gray-200">
              <Instagram className="h-4 w-4 text-gray-600" />
              <span className="sr-only">Instagram</span>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-gray-200">
              <Linkedin className="h-4 w-4 text-gray-600" />
              <span className="sr-only">LinkedIn</span>
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-900">Services</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/quote/laser-cutting" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                Laser Cutting
              </Link>
            </li>
            <li>
              <Link href="/quote/cnc-routing" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                CNC Routing
              </Link>
            </li>
            <li>
              <Link href="/quote/cnc-milling" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                CNC Milling
              </Link>
            </li>
            <li>
              <Link href="/quote/3d-printing" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                3D Printing
              </Link>
            </li>
            <li>
              <Link href="/quote/welding" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                Welding
              </Link>
            </li>
            <li>
              <Link href="/quote/sheet-metal" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                Sheet Metal
              </Link>
            </li>
            <li>
              <Link href="/quote/coatings" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                Coatings
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-900">Company</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/about" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-gray-600 hover:text-brand-dark-gold transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-900">Subscribe</h3>
          <p className="text-sm text-gray-600">Stay updated with our latest news and offers.</p>
          <div className="flex">
            <Input
              placeholder="Enter your email"
              className="rounded-l-md rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button className="rounded-l-none rounded-r-md bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="bg-brand-light-gold/10 rounded-lg p-3 text-xs text-gray-700 border border-brand-light-gold/20">
            <p className="font-medium">Get 10% off your first order</p>
            <p className="mt-1">Subscribe to our newsletter and receive a discount code.</p>
          </div>
        </div>
      </div>
      <div className="container max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} FormX. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/sitemap" className="text-xs text-gray-500 hover:text-brand-dark-gold transition-colors">
              Sitemap
            </Link>
            <Link href="/accessibility" className="text-xs text-gray-500 hover:text-brand-dark-gold transition-colors">
              Accessibility
            </Link>
            <Link href="/cookies" className="text-xs text-gray-500 hover:text-brand-dark-gold transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
