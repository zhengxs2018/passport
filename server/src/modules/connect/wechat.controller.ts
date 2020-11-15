import { Controller, Get, UseGuards, Req } from '@nestjs/common'

import { AuthService } from '../auth/auth.service'

import { WeChatAuthGuard } from './guards/wechat.guard'

@Controller('connect')
export class WeChatController {
  constructor(private readonly authService: AuthService) {}

  @Get('wechat')
  @UseGuards(WeChatAuthGuard)
  authorize(@Req() req) {
    return this.authService.genToken(req.user)
  }

  @Get('wechat/callback')
  @UseGuards(WeChatAuthGuard)
  callback(@Req() req) {
    return this.authService.genToken(req.user)
  }
}
