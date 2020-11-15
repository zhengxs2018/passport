import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { PrismaService } from '../prisma/prisma.service'

import { LocalStrategy } from '../passport/strategies/local.strategy'
import { JwtStrategy } from '../passport/strategies/jwt.strategy'

import { SessionSerializer } from '../passport/serializes/session.serializer'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    PassportModule.register({
      session: true,
      defaultStrategy: 'jwt'
    }),
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
  providers: [PrismaService, LocalStrategy, JwtStrategy, SessionSerializer, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
