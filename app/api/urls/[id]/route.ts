import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongoose"
import ShortenedUrl from "@/models/ShortenedUrl"
import { verifyToken } from "@/lib/auth"
import { isValidUrl } from "@/lib/utils"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const result = await ShortenedUrl.findOneAndDelete({
      _id: params.id,
      userId: decoded.userId,
    })

    if (!result) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "URL deleted successfully" })
  } catch (error) {
    console.error("Delete URL error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { originalUrl, startTime, expireTime } = await request.json()

    if (!originalUrl || !isValidUrl(originalUrl)) {
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

    await connectDB()

    const updateData: any = {
      originalUrl,
      startTime: startTime ? new Date(startTime) : null,
      expireTime: expireTime ? new Date(expireTime) : null,
    }

    const result = await ShortenedUrl.findOneAndUpdate(
      {
        _id: params.id,
        userId: decoded.userId,
      },
      updateData,
      { new: true },
    )

    if (!result) {
      return NextResponse.json({ error: "URL not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "URL updated successfully",
      url: result,
    })
  } catch (error) {
    console.error("Update URL error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
