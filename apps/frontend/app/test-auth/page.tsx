import { cookies } from "next/headers"

export default async function TestAuthPage() {
  const cookieStore = await cookies()
  const authToken = cookieStore.get("auth_token")
  const userType = cookieStore.get("user_type")

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Test</h1>

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="font-bold">Current Cookies:</h2>
          <p>Auth Token: {authToken?.value || "None"}</p>
          <p>User Type: {userType?.value || "None"}</p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="font-bold">Test Links:</h2>
          <div className="space-y-2">
            <a href="/auth/login?callbackUrl=/quote" className="block text-blue-600 underline">
              Login with callback to /quote
            </a>
            <a href="/auth/login?callbackUrl=/test-auth" className="block text-blue-600 underline">
              Login with callback to /test-auth
            </a>
            <a href="/quote" className="block text-blue-600 underline">
              Direct link to /quote
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
