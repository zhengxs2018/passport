import { Controller, Post, Request, Body, UseGuards } from '@nestjs/common'
import { ApiTags, ApiOperation } from '@nestjs/swagger'

import { LocalAuthGuard } from './guards/local-auth.guard'
import { ClassValidationPipe } from '../../pips/class-validator.pip'

import { AuthService } from './auth.service'
import { RegisterPwdDto } from './dtos/register-pwd.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    summary: '登录',
    description: '使用账号和密码登录',
    requestBody: {
      description: '表单数据',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                description: '用户名',
                example: 'admin'
              },
              password: {
                type: 'string',
                description: '密码',
                example: '123456'
              }
            },
            required: ['username', 'password']
          }
        },
        'application/x-www-form-urlencoded': {
          schema: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                description: '用户名',
                example: 'admin'
              },
              password: {
                type: 'string',
                description: '密码',
                example: '123456'
              }
            },
            required: ['username', 'password']
          }
        }
      }
    }
  })
  async login(@Request() req) {
    return this.authService.genToken(req.user)
  }

  @Post('register')
  @ApiOperation({
    summary: '注册',
    description: '使用用户名和密码进行注册'
  })
  async register(@Body(ClassValidationPipe) payload: RegisterPwdDto) {
    return this.authService.register(payload)
  }
}
