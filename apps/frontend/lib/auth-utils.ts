// Utility function to get a cookie value by name
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift()
    return cookieValue || null
  }
  return null
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  const authToken = getCookie("auth_token")
  return !!(authToken && authToken !== "" && authToken !== "undefined")
}

// Check if user is a partner
export function isPartner(): boolean {
  const authToken = getCookie("auth_token")
  const partnerToken = getCookie("partner_token")

  return !!(
    authToken &&
    authToken !== "" &&
    authToken !== "undefined" &&
    partnerToken &&
    partnerToken !== "" &&
    partnerToken !== "undefined"
  )
}

// Get user type
export function getUserType(): "user" | "partner" | null {
  if (!isAuthenticated()) return null
  return isPartner() ? "partner" : "user"
}
