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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { loginUser, loginPartner, registerUser } from "@/actions/auth-actions"
import { ArrowLeft, Loader2, Mail, Lock, Building, User } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Regular login state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Partner login state
  const [partnerEmail, setPartnerEmail] = useState("")
  const [partnerPassword, setPartnerPassword] = useState("")
  const [partnerCode, setPartnerCode] = useState("")

  // Register state
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerCompany, setRegisterCompany] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await loginUser({ email, password })

      if (result.success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Form(X)!",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Login failed",
          description: result.message || "Invalid email or password",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await registerUser({
        name: registerName,
        email: registerEmail,
        company: registerCompany,
        password: registerPassword,
      })

      if (result.success) {
        toast({
          title: "Registration successful",
          description: "Welcome to Form(X)!",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Registration failed",
          description: result.message || "Failed to create account",
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

  const handlePartnerLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await loginPartner({ email: partnerEmail, password: partnerPassword, partnerCode })

      if (result.success) {
        toast({
          title: "Partner login successful",
          description: "Welcome to the Form(X) Channel Partner Portal!",
        })
        router.push("/channel-partner")
      } else {
        toast({
          title: "Partner login failed",
          description: result.message || "Invalid credentials or partner code",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Partner login failed",
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
                Welcome to Form<span className="text-primary">X</span>
              </h1>
              <p className="text-muted-foreground">
                Your one-stop platform for precision manufacturing and rapid prototyping
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
                <p className="text-sm">Instant quotes for your manufacturing needs</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Track your orders in real-time</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <p className="text-sm">Access to premium materials and finishes</p>
              </div>
            </div>
          </div>

          <div>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
                <TabsTrigger value="partner">Channel Partner</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Login to your account</CardTitle>
                    <CardDescription>Enter your credentials to access your dashboard</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleLogin} className="space-y-4">
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
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4 border-t pt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 488 512">
                          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 448 512">
                          <path d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z" />
                        </svg>
                        Microsoft
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="register">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>Enter your information to get started</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-name"
                            type="text"
                            placeholder="John Doe"
                            className="pl-10"
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="name@example.com"
                            className="pl-10"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-company">Company (Optional)</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-company"
                            type="text"
                            placeholder="Your company name"
                            className="pl-10"
                            value={registerCompany}
                            onChange={(e) => setRegisterCompany(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-password"
                            type="password"
                            className="pl-10"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
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
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="partner">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl">Channel Partner Portal</CardTitle>
                    <CardDescription>Access your partner dashboard and referrals</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <form onSubmit={handlePartnerLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="partner-email">Partner Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="partner-email"
                            type="email"
                            placeholder="partner@company.com"
                            value={partnerEmail}
                            onChange={(e) => setPartnerEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partner-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="partner-password"
                            type="password"
                            value={partnerPassword}
                            onChange={(e) => setPartnerPassword(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="partner-code">Partner Code</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="partner-code"
                            type="text"
                            placeholder="Your unique partner code"
                            value={partnerCode}
                            onChange={(e) => setPartnerCode(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <Link href="/partner/apply" className="text-xs text-primary hover:underline">
                          Apply to become a partner
                        </Link>
                        <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                          </>
                        ) : (
                          "Access Partner Portal"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4 border-t pt-6">
                    <div className="text-xs text-center text-gray-500">
                      Need help with your partner account?{" "}
                      <Link href="/contact" className="text-primary hover:underline">
                        Contact our partner team
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
