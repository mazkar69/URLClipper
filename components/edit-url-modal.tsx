"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { isValidUrl } from "@/lib/utils"

interface EditUrlModalProps {
  isOpen: boolean
  onClose: () => void
  url: any
  onUpdate: () => void
}

export function EditUrlModal({ isOpen, onClose, url, onUpdate }: EditUrlModalProps) {
  const [formData, setFormData] = useState({
    originalUrl: "",
    startTime: "",
    expireTime: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (url && isOpen) {
      setFormData({
        originalUrl: url.originalUrl || "",
        startTime: url.startTime ? new Date(url.startTime).toISOString().slice(0, 16) : "",
        expireTime: url.expireTime ? new Date(url.expireTime).toISOString().slice(0, 16) : "",
      })
      setError("")
    }
  }, [url, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidUrl(formData.originalUrl)) {
      setError("Please enter a valid URL")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/urls/${url._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          originalUrl: formData.originalUrl,
          startTime: formData.startTime || null,
          expireTime: formData.expireTime || null,
        }),
      })

      if (response.ok) {
        onUpdate()
        onClose()
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update URL")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setError("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit URL</DialogTitle>
          <DialogDescription>Update the destination URL and timing settings for your shortened link.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="originalUrl">Destination URL</Label>
            <Input
              id="originalUrl"
              type="url"
              placeholder="https://example.com"
              value={formData.originalUrl}
              onChange={(e) => setFormData({ ...formData, originalUrl: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update URL"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
