"use client"

import { useState, useEffect } from "react"

export function ShareableLink({ username }: { username: string }) {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const bookingUrl =
    mounted && typeof window !== "undefined"
      ? `${window.location.origin}/booking/${username}`
      : `https://yourdomain.com/booking/${username}`

  const copyToClipboard = async () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(bookingUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy: ", err)
      }
    }
  }

  return (
    <div>
      <p>Share this link to allow others to book a session with you:</p>
      <div className="flex items-center">
        <input type="text" value={bookingUrl} readOnly className="flex-grow mr-2 border rounded py-2 px-3" />
        <button
          onClick={copyToClipboard}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${copied ? "bg-green-500 hover:bg-green-700" : ""}`}
          disabled={copied}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}
