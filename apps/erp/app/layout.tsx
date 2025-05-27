import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeInitializer } from "@/components/theme-initializer"
import { SideNav } from "@/components/side-nav"
import { TopNav } from "@/components/top-nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Form(X) Manufacturing System",
  description: "Advanced manufacturing management system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ThemeInitializer />
          <div className="flex min-h-screen flex-col">
            <TopNav />
            <div className="flex flex-1">
              <SideNav />
              <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
