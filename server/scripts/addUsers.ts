import { genSaltSync, hashSync } from 'bcrypt'

import { PrismaClient, UserWhereInput } from '../prisma/client'

const client = new PrismaClient()

export async function existsUser(where: UserWhereInput): Promise<boolean> {
  const users = await client.user.findMany({ where })
  return users.length > 0
}

export async function addAdmin() {
  if (await existsUser({ username: 'admin' })) return

  await client.user.create({
    data: {
      username: 'admin',
      nickname: '超级管理员',
      password: hashSync('123456', genSaltSync(10)),
      verified: true,
      isAdmin: true
    }
  })
}

export async function main() {
  try {
    await Promise.all([addAdmin()])
  } catch (err) {
    if (require.main === module) {
      console.error(err.message)
      process.exit(1)
    }
    throw err
  } finally {
    client.$disconnect()
  }
}

if (require.main === module) {
  main()
}
