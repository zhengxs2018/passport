import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { RedisModule } from 'nestjs-redis'

import { AuthModule } from './modules/auth/auth.module'
import { ConnectModule } from './modules/connect/connect.module'
import { MeModule } from './modules/me/me.module'

import { loadConfigsFiles } from './lib/utils'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: loadConfigsFiles(__dirname)
    }),
    RedisModule.forRootAsync({
      useFactory(configService: ConfigService) {
        const config = configService.get('redis')

        return {
          ...config,
          host: configService.get('REDIS_HOST') || config.host,
          password: configService.get('REDIS_PASSWD') || config.password
        }
      },
      inject: [ConfigService]
    }),
    AuthModule,
    ConnectModule,
    MeModule
  ]
})
export class AppModule {
  // pass
}
