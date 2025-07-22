export interface User {
  _id?: string
  email: string
  password: string
  createdAt: Date
}

export interface ShortenedUrl {
  _id?: string
  userId: string
  originalUrl: string
  shortKey: string
  startTime?: Date
  expireTime?: Date
  createdAt: Date
  clicks: number
}

// Add global mongoose type
declare global {
  var mongoose: {
    conn: any
    promise: any
  }
}
