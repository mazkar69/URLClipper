import { redirect, notFound } from "next/navigation"
import connectDB from "@/lib/mongoose"
import ShortenedUrl from "@/models/ShortenedUrl"

interface Props {
  params: { shortKey: string }
}

export default async function RedirectPage({ params }: Props) {
  try {
    await connectDB()

    const url = await ShortenedUrl.findOne({ shortKey: params.shortKey })

    if (!url) {
      notFound()
    }

    // Check if URL is active
    const now = new Date()
    const startTime = url.startTime ? new Date(url.startTime) : null
    const expireTime = url.expireTime ? new Date(url.expireTime) : null

    if (startTime && now < startTime) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">URL Not Yet Active</h1>
            <p className="text-gray-600">This URL will be active on {startTime.toLocaleString()}</p>
          </div>
        </div>
      )
    }

    if (expireTime && now > expireTime) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">URL Expired</h1>
            <p className="text-gray-600">This URL expired on {expireTime.toLocaleString()}</p>
          </div>
        </div>
      )
    }

    // Increment click count
    await ShortenedUrl.findOneAndUpdate({ shortKey: params.shortKey }, { $inc: { clicks: 1 } })

    // Redirect to the original URL
    redirect(url.originalUrl)
  } catch (error) {
    console.error("Redirect error:", error)
    notFound()
  }
}
