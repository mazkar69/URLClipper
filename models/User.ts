import mongoose, { type Document, Schema } from "mongoose"

export interface IUser extends Document {
  email: string
  password: string
  createdAt: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
