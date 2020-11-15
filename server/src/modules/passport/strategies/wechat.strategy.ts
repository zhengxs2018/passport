import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'

import { Strategy } from 'passport-wechat'

import { PrismaService } from '../../prisma/prisma.service'
import { ConnectService } from '../../connect/connect.service'

import { WeChatUser } from '../../../interfaces/wechat'

@Injectable()
export class WeChatStrategy extends PassportStrategy(Strategy, 'wechat') {
  connectService: ConnectService

  constructor(
    configService: ConfigService,
    prismaService: PrismaService,
    connectService: ConnectService
  ) {
    const Token = prismaService.weChatUserToken

    super({
      ...configService.get('wechat'),
      appID: configService.get('WECHAT_APP_ID'),
      appSecret: configService.get('WECHAT_APP_SECRET'),
      async getToken(openid: string, cb) {
        const token = await Token.findOne({
          where: { openid }
        })
        cb(null, token)
      },
      async saveToken(openid, token, cb) {
        await Token.upsert({
          create: token,
          update: token,
          where: { openid }
        })
        cb(null, token)
      }
    })

    this.connectService = connectService
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    wxUser: WeChatUser,
    _,
    done: (...args: unknown[]) => void
  ) {
    const user = await this.connectService.updateOrInsertWeChatUser(wxUser)
    done(null, user)
  }
}
