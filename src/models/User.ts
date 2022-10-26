import mongoose from 'mongoose'

export interface IUser {
  username: string
  token: string
  password: string
  groups: mongoose.Types.ObjectId[]
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // * required
  token: { type: String, required: true, unique: true }, // * required
  password: { type: String, required: true }, // * required
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'group'
    }
  ],
})

export default mongoose.model('user', userSchema)
