// Types
import { Request, Response } from 'express'

// Models
import Users from '../models/User'

// Utils
import bcrypt from 'bcrypt'
import generateUniqueToken from '../scripts/generateUniqueToken'
import createWelcomeGroup from '../scripts/createWelcomeGroup'

class userController {
  async signUp(req: Request, res: Response) {
    try {
      const username: string = req.body.username
      const password: string = await bcrypt.hash(req.body.password, 10)
      const token: string = await generateUniqueToken()
      await Users.create({
        username,
        password,
        token,
        groups: [await createWelcomeGroup()],
      })
      res.status(201).json({ token })
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
  async signIn(req: Request, res: Response) {
    const user = await Users.findOne({ username: req.body.username })
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = await generateUniqueToken()
        user.token = token
        await user.save()
        res.status(200).json({ token })
      } else {
        res.status(403).send('Invalid password')
      }
    } else {
      res.status(404).send('User with this username does not exist')
    }
  }
  async tokenRefresh(req: Request, res: Response) {
    const user = await Users.findOne({ token: res.locals.token }).exec()
    if (user) {
      const token = await generateUniqueToken()
      user.token = token
      await user.save()
      res.status(200).json({ token })
    } else {
      res.status(404).send('User with this token not found')
    }
  }
  async getTasks(req: Request, res: Response) {
    const user = await Users.findOne({ token: res.locals.token }).exec()
    console.log(user)
  }
}

export default new userController()
