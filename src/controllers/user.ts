// Types
import { Request, Response } from 'express'
import mongoose, { HydratedDocument } from 'mongoose'
import { IUser } from '../models/User'
import { IGroup } from '../models/Group'

// Models
import Users from '../models/User'
import Groups from '../models/Group'

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
      await Users.create({ username, password, token, groups: [await createWelcomeGroup()] })
      res.status(201).json({ token })
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
  async signIn(req: Request, res: Response) {
    const user: HydratedDocument<IUser> | null = await Users.findOne({ username: req.body.username })
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token: string = await generateUniqueToken()
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
    const user: HydratedDocument<IUser> = res.locals.user
    const token: string = await generateUniqueToken()
    user.token = token
    await user.save()
    res.status(200).json({ token })
  }
  async getGroups(req: Request, res: Response) {
    const groups: { _id: mongoose.Types.ObjectId, title: string }[] = []
    for (const groupID of res.locals.user.groups || []) {
      const group: HydratedDocument<IGroup> | null = await Groups.findById(groupID)
      if (group) groups.push({ _id: group._id, title: group.title })
    }
    res.status(200).send(groups)
  }
}

export default new userController()
