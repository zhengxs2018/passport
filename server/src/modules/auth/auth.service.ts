import {
  Injectable,
  Scope,
  ConflictException,
  NotFoundException,
  BadRequestException,
  PreconditionFailedException
} from '@nestjs/common'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'

import { isEmail, isPhoneNumber, isNotEmpty } from 'class-validator'

import { User, UserDelegate, UserWhereInput, FindOneUserArgs } from '../../../prisma/client'

import { hashPasswd, comparePasswd } from '../../lib/password'

import { AuthInfo } from '../../interfaces/jwt'
import { PrismaService } from '../prisma/prisma.service'

import { SessionSerializer } from '../passport/serializes/session.serializer'

import { RegisterPwdDto } from './dtos/register-pwd.dto'

@Injectable({ scope: Scope.DEFAULT })
export class AuthService {
  private readonly userRepo: UserDelegate

  constructor(private readonly jwtService: JwtService, prismaService: PrismaService) {
    this.userRepo = prismaService.user
  }

  async register(payload: RegisterPwdDto) {
    const dbUser = await this.findUser(payload)
    if (dbUser) {
      const username = payload.username
      if (username && dbUser.username === username) {
        throw new ConflictException('用户名已被注册')
      }

      const email = payload.email
      if (email && dbUser.email === email) {
        throw new ConflictException('邮箱已被注册')
      }

      throw new ConflictException('昵称已被注册')
    }

    const password = await hashPasswd(payload.password)
    const newUser = await this.userRepo.create({
      data: { ...payload, password, verified: true }
    })

    return this.genToken(newUser)
  }

  async genToken(
    user: User,
    options?: JwtSignOptions
  ): Promise<{ uid: string; token: string }> {
    const authInfo: AuthInfo = SessionSerializer.createAuthInfo(user)
    const token = await this.jwtService.signAsync(authInfo, options)
    return { uid: user.uid, token }
  }

  async login(account: string, password: string) {
    const where: FindOneUserArgs['where'] = {}
    if (isEmail(account)) {
      where.email = account
    } else if (isPhoneNumber('+86 ' + account, 'CN')) {
      where.mobile = account
    } else {
      where.username = account
    }

    const user = await this.userRepo.findOne({ where })
    if (!user) throw new NotFoundException('用户不存在或密码错误')

    const ok = await comparePasswd(password, user.password)
    if (!ok) new BadRequestException('无效的密码')

    return user
  }

  findUser(query: Partial<Record<'username' | 'nickname' | 'email' | 'mobile', string>>) {
    const wheres: UserWhereInput[] = []

    const { username, nickname, email, mobile } = query
    if (isNotEmpty(nickname)) {
      wheres.push({ nickname })
    }

    if (isNotEmpty(username)) {
      wheres.push({ username })
    }

    if (isNotEmpty(mobile)) {
      wheres.push({ mobile })
    }

    if (isNotEmpty(email)) {
      wheres.push({ email })
    }

    if (wheres.length === 0) {
      throw new PreconditionFailedException()
    }

    return this.userRepo.findFirst({ where: { OR: wheres } })
  }
}
