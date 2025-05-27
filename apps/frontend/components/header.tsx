"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, ShoppingCart, Instagram, Linkedin, Facebook } from "lucide-react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { AuthStatus } from "@/components/auth/auth-status"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  // Update the navigation array - removed Channel Partner
  const navigation = [
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Showcase", href: "/showcase" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white shadow-sm" : "bg-white"}`}
    >
      <div className="container flex h-20 items-center justify-between max-w-7xl">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <span className="font-bold text-xl">
                    Form<span className="text-brand-dark-gold">X</span>
                  </span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-base font-medium transition-colors hover:text-brand-dark-gold ${
                      isActive(item.href) ? "text-brand-dark-gold" : "text-gray-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/quote"
                  className="text-base font-medium text-brand-dark-gold hover:text-brand-dark-gold/80"
                  onClick={() => setIsOpen(false)}
                >
                  Get Quote
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-baseline">
              <span className="font-bold text-2xl tracking-tight">Form</span>
              <span className="font-bold text-2xl tracking-tight text-brand-dark-gold">X</span>
            </div>
            <span className="text-xs text-gray-500 hidden sm:inline-block">Where ideas are formed.</span>
          </Link>
        </div>
        <nav className="hidden lg:flex gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-sm font-medium transition-colors hover:text-brand-dark-gold ${
                isActive(item.href) ? "text-brand-dark-gold" : "text-gray-700"
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-dark-gold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <Link href="https://instagram.com" className="text-gray-500 hover:text-brand-dark-gold">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://facebook.com" className="text-gray-500 hover:text-brand-dark-gold">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com" className="text-gray-500 hover:text-brand-dark-gold">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
          <Link href="/cart" className="text-gray-500 hover:text-brand-dark-gold">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          <AuthStatus />
        </div>
      </div>
    </header>
  )
}
