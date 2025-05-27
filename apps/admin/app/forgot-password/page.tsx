"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, ArrowLeft, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fefefe] to-[#e8dcaa]/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-[#fefefe] shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl font-bold text-[#525253] mb-2">Check Your Email</CardTitle>
            <CardDescription className="text-[#908d8d] mb-6">
              We've sent a password reset link to {email}
            </CardDescription>
            <Link href="/login">
              <Button className="w-full bg-[#d4c273] hover:bg-[#d4c273]/90 text-[#fefefe]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fefefe] to-[#e8dcaa]/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#fefefe] shadow-xl border-0 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#e8dcaa] to-[#fefefe] text-center pb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#d4c273] to-[#d4c273] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Building2 className="h-8 w-8 text-[#fefefe]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#525253]">Reset Password</CardTitle>
          <CardDescription className="text-[#908d8d] mt-2">Enter your email to receive a reset link</CardDescription>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#525253]">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273] h-12"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-[#d4c273] hover:bg-[#d4c273]/90 text-[#fefefe] font-medium shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#fefefe]/30 border-t-[#fefefe] rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Send Reset Link
                </div>
              )}
            </Button>

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-[#d4c273] hover:text-[#d4c273]/80 font-medium flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
