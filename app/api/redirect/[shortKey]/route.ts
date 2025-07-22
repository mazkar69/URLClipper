import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongoose"
import ShortenedUrl from "@/models/ShortenedUrl"

export async function GET(request: NextRequest, { params }: { params: { shortKey: string } }) {
  try {
    await connectDB()

    const url = await ShortenedUrl.findOne({ shortKey: params.shortKey })

    if (!url) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 })
    }

    // Check if URL is active
    const now = new Date()
    const startTime = url.startTime ? new Date(url.startTime) : null
    const expireTime = url.expireTime ? new Date(url.expireTime) : null

    if (startTime && now < startTime) {
      return NextResponse.json({ error: "URL is not yet active" }, { status: 403 })
    }

    if (expireTime && now > expireTime) {
      return NextResponse.json({ error: "URL has expired" }, { status: 410 })
    }

    // Increment click count
    await ShortenedUrl.findOneAndUpdate({ shortKey: params.shortKey }, { $inc: { clicks: 1 } })

    return NextResponse.redirect(url.originalUrl, 302)
  } catch (error) {
    console.error("Redirect error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
