import { Injectable } from '@nestjs/common'

import { ThirdUserDelegate, User } from  '../../../prisma/client'
import { WeChatUser } from '../../interfaces/wechat'

import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ConnectService {
  private readonly thirdUserRepo: ThirdUserDelegate

  constructor(prismaService: PrismaService) {
    this.thirdUserRepo = prismaService.thirdUser
  }

  async updateOrInsertWeChatUser(profile: WeChatUser): Promise<User> {
    const thirdUserRepo = this.thirdUserRepo
    const oldThirdUser = await thirdUserRepo.findFirst({
      where: {
        openId: profile.openid,
        provider: 'wechat'
      },
      include: { User: true }
    })

    const {
      openid: openId,
      headimgurl: avatar,
      nickname,
      sex,
      language,
      country,
      province,
      city,
      ...details
    } = profile
    const data = {
      openId,
      avatar,
      nickname,
      sex,
      language,
      country,
      province,
      city,
      details: JSON.stringify(details)
    }
    if (oldThirdUser) {
      await thirdUserRepo.update({ data, where: { id: oldThirdUser.id } })
      return oldThirdUser.User
    }

    const newThirdUser = await thirdUserRepo.create({
      data: {
        ...data,
        provider: 'wechat',
        User: { create: { avatar, nickname, sex } }
      },
      include: { User: true }
    })
    return newThirdUser.User
  }
}
