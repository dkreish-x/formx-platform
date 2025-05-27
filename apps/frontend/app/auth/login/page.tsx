"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { loginUser, loginPartner, registerUser } from "@/actions/auth-actions"
import Link from "next/link"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")

  const [loginError, setLoginError] = useState("")
  const [partnerError, setPartnerError] = useState("")
  const [registerError, setRegisterError] = useState("")
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isPartnerLoading, setIsPartnerLoading] = useState(false)
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)

  async function handleLogin(formData: FormData) {
    if (isLoginLoading) return // Prevent double submission

    setIsLoginLoading(true)
    setLoginError("")

    // Add callback URL to form data
    if (callbackUrl) {
      formData.append("callbackUrl", callbackUrl)
    }

    const result = await loginUser(formData)

    if (result && !result.success) {
      setLoginError(result.message)
      setIsLoginLoading(false)
    }
    // If successful, redirect() will be called and we won't reach here
  }

  async function handlePartnerLogin(formData: FormData) {
    if (isPartnerLoading) return // Prevent double submission

    setIsPartnerLoading(true)
    setPartnerError("")

    const result = await loginPartner(formData)

    if (result && !result.success) {
      setPartnerError(result.message)
      setIsPartnerLoading(false)
    }
    // If successful, redirect() will be called and we won't reach here
  }

  async function handleRegister(formData: FormData) {
    if (isRegisterLoading) return // Prevent double submission

    setIsRegisterLoading(true)
    setRegisterError("")

    // Add callback URL to form data
    if (callbackUrl) {
      formData.append("callbackUrl", callbackUrl)
    }

    const result = await registerUser(formData)

    if (result && !result.success) {
      setRegisterError(result.message)
      setIsRegisterLoading(false)
    }
    // If successful, redirect() will be called and we won't reach here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome to Form(X)</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account or create a new one</p>
          {callbackUrl && (
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
              <p className="text-xs text-blue-600">You'll be redirected to: {callbackUrl}</p>
            </div>
          )}
        </div>

        <Card>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="partner">Partner</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={handleLogin} className="space-y-4">
                  {loginError && (
                    <Alert variant="destructive">
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="demo@formx.com"
                      className="mt-1"
                      disabled={isLoginLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      placeholder="password123"
                      className="mt-1"
                      disabled={isLoginLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoginLoading}>
                    {isLoginLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="register">
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Sign up for a new Form(X) account</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={handleRegister} className="space-y-4">
                  {registerError && (
                    <Alert variant="destructive">
                      <AlertDescription>{registerError}</AlertDescription>
                    </Alert>
                  )}
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" type="text" required className="mt-1" disabled={isRegisterLoading} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1"
                      disabled={isRegisterLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" name="company" type="text" className="mt-1" disabled={isRegisterLoading} />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="mt-1"
                      disabled={isRegisterLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isRegisterLoading}>
                    {isRegisterLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="partner">
              <CardHeader>
                <CardTitle>Partner Login</CardTitle>
                <CardDescription>Access your Channel Partner Portal</CardDescription>
              </CardHeader>
              <CardContent>
                <form action={handlePartnerLogin} className="space-y-4">
                  {partnerError && (
                    <Alert variant="destructive">
                      <AlertDescription>{partnerError}</AlertDescription>
                    </Alert>
                  )}
                  <div>
                    <Label htmlFor="partner-email">Email</Label>
                    <Input
                      id="partner-email"
                      name="email"
                      type="email"
                      required
                      placeholder="partner@example.com"
                      className="mt-1"
                      disabled={isPartnerLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="partner-password">Password</Label>
                    <Input
                      id="partner-password"
                      name="password"
                      type="password"
                      required
                      placeholder="partner123"
                      className="mt-1"
                      disabled={isPartnerLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="partnerCode">Partner Code</Label>
                    <Input
                      id="partnerCode"
                      name="partnerCode"
                      type="text"
                      required
                      placeholder="PARTNER001"
                      className="mt-1"
                      disabled={isPartnerLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isPartnerLoading}>
                    {isPartnerLoading ? "Signing in..." : "Access Partner Portal"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="text-center">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
