import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { Request } from 'express'

@Injectable()
export class WeChatAuthGuard extends AuthGuard('wechat') {
  getAuthenticateOptions(context: ExecutionContext): any {
    const req = context.switchToHttp().getRequest() as Request
    const callbackURL = new URL(
      '/connect/wechat/callback',
      req.protocol + '://' + req.hostname
    )

    return {
      callbackURL: callbackURL.toString(),
      state: Math.random().toString(32).substr(2)
    }
  }
  // async canActivate(context: ExecutionContext) {
  //   const request = context.switchToHttp().getRequest();
  //   if (request.isAuthenticated()) return true
  //   return super.canActivate(context) as boolean
  // }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean
    const request = context.switchToHttp().getRequest()
    await super.logIn(request)
    return result
  }
}
