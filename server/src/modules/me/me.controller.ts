import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'

import { UserDelegate } from '../../../prisma/client'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

import { PrismaService } from '../prisma/prisma.service'

@ApiTags('me')
@Controller('/me')
export class MeController {
  private readonly userRepo: UserDelegate

  constructor(prismaService: PrismaService) {
    this.userRepo = prismaService.user
  }

  @Get('/')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '个人资料',
    description: ''
  })
  @UseGuards(JwtAuthGuard)
  async personal(@Request() req) {
    const user = req.user
    return this.userRepo.findOne({
      select: {
        uid: true,
        nickname: true,
        avatar: true,
        sex: true,
        isAdmin: true
      },
      where: { uid: user.uid }
    })
  }
}
