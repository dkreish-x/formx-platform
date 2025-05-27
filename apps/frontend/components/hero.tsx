"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[30%] -right-[10%] w-[500px] h-[500px] rounded-full bg-brand-light-gold/20 blur-3xl" />
          <div className="absolute top-[60%] -left-[10%] w-[400px] h-[400px] rounded-full bg-brand-light-gold/10 blur-3xl" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-brand-light-gold/30 text-brand-dark-gold">
                  Precision Manufacturing On Demand
                </span>
              </motion.div>
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-brand-dark-grey"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Instant Manufacturing Quotes
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-brand-light-grey md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Upload your CAD files, configure your parts, and get instant pricing for laser cutting, CNC machining,
                3D printing, and more.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white rounded-full px-8"
                asChild
              >
                <Link href="/quote">Get Started</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-brand-dark-gold text-brand-dark-gold hover:bg-brand-light-gold/10 rounded-full px-8"
                asChild
              >
                <Link href="/services">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative h-[450px] w-full overflow-hidden rounded-2xl bg-background shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-dark-gold/10 to-transparent z-10"></div>
              <Image
                src="/images/hero-manufacturing.png"
                alt="Manufacturing facility with CNC machines"
                fill
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-20">
                <p className="text-xs font-medium text-brand-dark-grey">Precision Manufacturing</p>
                <p className="text-xs text-brand-light-grey">24/7 Production Capacity</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
