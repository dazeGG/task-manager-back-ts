import Users from '../models/User'

const generatePartOfToken = (): string => Math.random().toString(36).substr(2)
const generateToken = (): string => {
  let token = ''
  for (let i = 0; i < 4; i++) token += generatePartOfToken()
  return token
}

export default async (): Promise<string> => {
  let token: string = generateToken()
  while (await Users.findOne({ token }).exec()) token = generateToken()
  return token
}
