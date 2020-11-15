import { Module } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'

import { MeController } from './me.controller'

@Module({
  providers: [PrismaService],
  controllers: [MeController]
})
export class MeModule {}
