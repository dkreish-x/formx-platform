"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Copy } from "lucide-react"

interface ShareableLinkProps {
  username: string
}

export function ShareableLink({ username }: ShareableLinkProps) {
  const [copied, setCopied] = useState(false)
  const bookingUrl = `${window.location.origin}/booking/${username}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(bookingUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Input value={bookingUrl} readOnly className="flex-1" />
        <Button size="icon" onClick={copyToClipboard} variant="outline">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <a
            href={`mailto:?subject=Book a meeting with me&body=You can book a meeting with me using this link: ${bookingUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share via Email
          </a>
        </Button>
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <a
            href={`https://twitter.com/intent/tweet?text=Book a meeting with me: ${bookingUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on Twitter
          </a>
        </Button>
      </div>
    </div>
  )
}
