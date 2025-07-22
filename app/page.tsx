"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Shield, Clock, BarChart3 } from "lucide-react"
import { isValidUrl } from "@/lib/utils"

export default function HomePage() {
  const [url, setUrl] = useState("")
  const [shortenedUrl, setShortenedUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidUrl(url)) {
      setError("Please enter a valid URL")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (response.ok) {
        setShortenedUrl(`https://infjc.com/${data.shortKey}`)
        setUrl("")
      } else {
        setError(data.error || "Failed to shorten URL")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Shorten Your URLs with
            <span className="text-blue-600 block">URLCliper</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Create clean, professional short links. Track clicks, set expiration times, and manage all your URLs from
            one dashboard. 100% ad-free experience.
          </p>

          {/* URL Shortening Form */}
          <Card className="max-w-2xl mx-auto mb-16">
            <CardHeader>
              <CardTitle>Shorten Your URL</CardTitle>
              <CardDescription>Enter a long URL to get a short, shareable link</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleShorten} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="https://example.com/very-long-url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={loading}>
                    {loading ? "Shortening..." : "Shorten"}
                  </Button>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {shortenedUrl && (
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <Input value={shortenedUrl} readOnly className="flex-1 bg-white" />
                    <Button type="button" variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose URLCliper?</h2>
          <p className="text-xl text-gray-600">Professional URL shortening with powerful features</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>100% Ad-Free</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Clean, professional experience without any advertisements or distractions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Custom Expiration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Set custom start and expiration times for your shortened URLs.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Analytics Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Track clicks and manage all your URLs from a personalized dashboard.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
