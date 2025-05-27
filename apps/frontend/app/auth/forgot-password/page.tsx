"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, Loader2, CheckCircle, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would send a password reset email
      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "Check your email for a link to reset your password.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset link. Please try again.",
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
          href="/auth/login"
          className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>

        <div className="grid w-full lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl">
          <div className="hidden lg:flex flex-col space-y-6 p-6">
            <div className="flex flex-col space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Reset your Form<span className="text-primary">X</span> password
              </h1>
              <p className="text-muted-foreground">We'll send you instructions to reset your password</p>
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
                <p className="text-sm">Check your email for a reset link</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Create a new secure password</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Log back in to access your account</p>
              </div>
            </div>
          </div>

          <div>
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Forgot Password</CardTitle>
                <CardDescription>We'll email you instructions to reset your password</CardDescription>
              </CardHeader>
              <CardContent>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-6 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-green-50 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-medium">Check your email</h3>
                      <p className="text-sm text-gray-500 mt-1">We've sent a password reset link to {email}</p>
                    </div>
                    <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
                      Try another email
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <div className="text-center text-sm">
                  Remember your password?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline">
                    Back to login
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
