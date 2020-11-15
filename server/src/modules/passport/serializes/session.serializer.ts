import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { User } from '../../../../prisma/client'

import { AuthInfo } from '../../../interfaces/jwt'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: User, done) {
    done(null, SessionSerializer.createAuthInfo(user))
  }

  deserializeUser(payload: User, done) {
    done(null, payload)
  }

  static createAuthInfo(user: User): AuthInfo {
    return {
      uid: user.uid,
      picture: user.avatar,
      nickname: user.nickname,
      sex: user.sex,
      isAdmin: user.isAdmin
    }
  }
}
