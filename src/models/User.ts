import mongoose from 'mongoose'

export interface IUser {
  username: string
  token: string
  password: string
  groups: mongoose.Types.ObjectId[]
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }]
})

export default mongoose.model<IUser>('User', userSchema)
