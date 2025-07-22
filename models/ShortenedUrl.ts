import mongoose, { type Document, Schema } from "mongoose"

export interface IShortenedUrl extends Document {
  userId: string
  originalUrl: string
  shortKey: string
  startTime?: Date
  expireTime?: Date
  createdAt: Date
  clicks: number
}

const ShortenedUrlSchema = new Schema<IShortenedUrl>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortKey: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  startTime: {
    type: Date,
    default: null,
  },
  expireTime: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clicks: {
    type: Number,
    default: 0,
  },
})

export default mongoose.models.ShortenedUrl || mongoose.model<IShortenedUrl>("ShortenedUrl", ShortenedUrlSchema)
