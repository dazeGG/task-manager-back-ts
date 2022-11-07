import { Request, Response, NextFunction } from 'express'

import Users from '../models/User'

const usernameAvailabeCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789-'

export default {
  usernameAndPasswordCheck: (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = []
    if (!req.body.username) errors.push('username: the field must be filled')
    if (!req.body.password) errors.push('password: the field must be filled')
    if (errors.length) res.status(400).send(errors)
    else next()
  },
  usernameCheck: async (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = []
    if (await Users.findOne({ username: req.body.username }).exec())
      errors.push('this username is already taken')
    for (const character of req.body.username) {
      if (!usernameAvailabeCharacters.includes(character)) {
        errors.push('the username must consist only of lowercase latin letters, numbers and a sign "-"')
        break
      }
    }
    if (errors.length) res.status(400).send(errors)
    else next()
  },
  passwordCheck: (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = []
    if (req.body.password.length < 8)
      errors.push('password must be at least 8 characters long')
    if (errors.length) res.status(400).send(errors)
    else next()
  }
}
