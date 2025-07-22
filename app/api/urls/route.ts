import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongoose"
import ShortenedUrl from "@/models/ShortenedUrl"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization required" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    await connectDB()

    const userUrls = await ShortenedUrl.find({ userId: decoded.userId }).sort({ createdAt: -1 }).lean()

    return NextResponse.json({ urls: userUrls })
  } catch (error) {
    console.error("Get URLs error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
