import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongoose"
import ShortenedUrl from "@/models/ShortenedUrl"
import { verifyToken } from "@/lib/auth"
import { generateShortKey, isValidUrl } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    const { url, startTime, expireTime } = await request.json()

    if (!url || !isValidUrl(url)) {
      return NextResponse.json({ error: "Valid URL is required" }, { status: 400 })
    }

    // Validate dates if provided
    if (startTime && expireTime) {
      const start = new Date(startTime)
      const expire = new Date(expireTime)
      if (start >= expire) {
        return NextResponse.json({ error: "Start time must be before expiration time" }, { status: 400 })
      }
    }

    // Get user ID from token (optional for anonymous users)
    const authHeader = request.headers.get("authorization")
    let userId = "anonymous"

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.substring(7)
      const decoded = verifyToken(token)
      if (decoded) {
        userId = decoded.userId
      }
    }

    await connectDB()

    // Generate unique short key
    let shortKey: string
    let isUnique = false
    let attempts = 0

    do {
      shortKey = generateShortKey()
      const existing = await ShortenedUrl.findOne({ shortKey })
      isUnique = !existing
      attempts++
    } while (!isUnique && attempts < 10)

    if (!isUnique) {
      return NextResponse.json({ error: "Failed to generate unique key" }, { status: 500 })
    }

    // Create shortened URL
    const shortenedUrl = new ShortenedUrl({
      userId,
      originalUrl: url,
      shortKey: shortKey!,
      startTime: startTime ? new Date(startTime) : undefined,
      expireTime: expireTime ? new Date(expireTime) : undefined,
    })

    await shortenedUrl.save()

    return NextResponse.json({
      message: "URL shortened successfully",
      shortKey: shortKey!,
      shortenedUrl: `https://infjc.com/${shortKey!}`,
    })
  } catch (error) {
    console.error("Shorten error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
