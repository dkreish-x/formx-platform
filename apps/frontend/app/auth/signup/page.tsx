"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { registerUser } from "@/actions/auth-actions"
import { ArrowLeft, Loader2, Mail, Lock, User, Building } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would create a user in the database
      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        password: formData.password,
      })

      if (result.success) {
        toast({
          title: "Account created",
          description: "Your account has been created successfully!",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Registration failed",
          description: result.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-50 flex flex-col">
      <div className="container flex-1 flex items-center justify-center py-12">
        <Link
          href="/"
          className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>

        <div className="grid w-full lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl">
          <div className="hidden lg:flex flex-col space-y-6 p-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Join Form<span className="text-primary">X</span> Today
              </h1>
              <p className="text-muted-foreground">
                Create an account to access our full range of manufacturing services
              </p>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src="/abstract-geometric-shapes.png"
                alt="Manufacturing abstract shapes"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Get instant quotes for your projects</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Access to premium materials and finishes</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Track your orders in real-time</p>
              </div>
            </div>
          </div>

          <div>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Create your account</CardTitle>
                <CardDescription>Fill out the form below to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t pt-6">
                <div className="text-xs text-center text-gray-500">
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
