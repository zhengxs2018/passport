import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { WeChatStrategy } from '../passport/strategies/wechat.strategy'
import { PrismaService } from '../prisma/prisma.service'
import { AuthService } from '../auth/auth.service'

import { WeChatController } from './wechat.controller'
import { ConnectService } from './connect.service'

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: configService.get('jwt')
        }
      }
    })
  ],
  providers: [PrismaService, AuthService, ConnectService, WeChatStrategy],
  controllers: [WeChatController]
})
export class ConnectModule {}
