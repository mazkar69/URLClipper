"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Trash2, Copy, ExternalLink, Plus, Edit } from "lucide-react"
import { EditUrlModal } from "@/components/edit-url-modal"
import { isValidUrl } from "@/lib/utils"

export default function DashboardPage() {
  const [urls, setUrls] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUrl, setEditingUrl] = useState<any>(null)
  const [formData, setFormData] = useState({
    url: "",
    startTime: "",
    expireTime: "",
  })
  const [error, setError] = useState("")
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }
    fetchUrls()
  }, [])

  const fetchUrls = async () => {
    try {
      const response = await fetch("/api/urls", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUrls(data.urls)
      } else if (response.status === 401) {
        router.push("/login")
      }
    } catch (err) {
      console.error("Failed to fetch URLs:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidUrl(formData.url)) {
      setError("Please enter a valid URL")
      return
    }

    setError("")

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          url: formData.url,
          startTime: formData.startTime || undefined,
          expireTime: formData.expireTime || undefined,
        }),
      })

      if (response.ok) {
        setFormData({ url: "", startTime: "", expireTime: "" })
        setShowForm(false)
        fetchUrls()
      } else {
        const data = await response.json()
        setError(data.error || "Failed to shorten URL")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this URL?")) {
      return
    }

    try {
      const response = await fetch(`/api/urls/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        fetchUrls()
      }
    } catch (err) {
      console.error("Failed to delete URL:", err)
    }
  }

  const copyToClipboard = async (shortKey: string) => {
    try {
      await navigator.clipboard.writeText(`https://infjc.com/${shortKey}`)
      setCopySuccess(shortKey)
      setTimeout(() => setCopySuccess(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleEdit = (url: any) => {
    setEditingUrl(url)
  }

  const handleEditClose = () => {
    setEditingUrl(null)
  }

  const handleEditUpdate = () => {
    fetchUrls()
    setEditingUrl(null)
  }

  const isUrlActive = (url: any) => {
    const now = new Date()
    const startTime = url.startTime ? new Date(url.startTime) : null
    const expireTime = url.expireTime ? new Date(url.expireTime) : null

    if (startTime && now < startTime) return false
    if (expireTime && now > expireTime) return false
    return true
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your URLs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your shortened URLs</p>
        </div>

        {/* Add New URL Button */}
        <div className="mb-6">
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New URL
          </Button>
        </div>

        {/* Add URL Form */}
        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Shorten New URL</CardTitle>
              <CardDescription>Create a new shortened URL with optional timing controls</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="url">URL to Shorten</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time (Optional)</Label>
                    <Input
                      id="startTime"
                      type="datetime-local"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expireTime">Expire Time (Optional)</Label>
                    <Input
                      id="expireTime"
                      type="datetime-local"
                      value={formData.expireTime}
                      onChange={(e) => setFormData({ ...formData, expireTime: e.target.value })}
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-2">
                  <Button type="submit">Create Short URL</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* URLs List */}
        <div className="space-y-4">
          {urls.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No URLs found. Create your first shortened URL!</p>
              </CardContent>
            </Card>
          ) : (
            urls.map((url) => (
              <Card key={url._id.toString()}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={isUrlActive(url) ? "default" : "secondary"}>
                          {isUrlActive(url) ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-sm text-gray-500">{url.clicks} clicks</span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-blue-600">https://infjc.com/{url.shortKey}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(url.shortKey)}
                            className={copySuccess === url.shortKey ? "text-green-600" : ""}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(`https://infjc.com/${url.shortKey}`, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          {copySuccess === url.shortKey && <span className="text-xs text-green-600">Copied!</span>}
                        </div>

                        <p className="text-sm text-gray-600 truncate">→ {url.originalUrl}</p>

                        {(url.startTime || url.expireTime) && (
                          <div className="text-xs text-gray-500 space-y-1">
                            {url.startTime && <div>Start: {new Date(url.startTime).toLocaleString()}</div>}
                            {url.expireTime && <div>Expires: {new Date(url.expireTime).toLocaleString()}</div>}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(url)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(url._id!)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Edit URL Modal */}
        <EditUrlModal isOpen={!!editingUrl} onClose={handleEditClose} url={editingUrl} onUpdate={handleEditUpdate} />
      </div>
    </div>
  )
}
