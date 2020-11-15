import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { RedisService } from 'nestjs-redis'

import passport from 'passport'

import session from 'express-session'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

import createRedisStore from 'connect-redis'

import { AppModule } from './app.module'

const RedisStore = createRedisStore(session)

function showBanner(url: string) {
  const banner = `
App running at:
- HTTP:       ${url}
- Swagger UI: ${url}/api
`
  console.log(banner)
}

export async function createApp() {
  const app = await await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      credentials: true,
      origin(origin, cb) {
        /**
         * @todo 需要做 host 检查
         */
        return cb(null, true)
      },
      methods: 'GET,OPTIONS',
      allowedHeaders: 'Accept, Content-Type, X-Requested-With, X-HTTP-Method-Override'
    }
  })
  const redisService = app.get(RedisService)

  const config = app.get(ConfigService)

  if (config.get('proxy')) {
    app.set('trust proxy', 1)
  }

  app.use(
    session({
      ...config.get('session'),
      secret: config.get('SESSION_SECRET'),
      store: new RedisStore({
        client: redisService.getClient()
      })
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  return app
}

export async function dev() {
  const app = await createApp()
  const config = app.get(ConfigService)

  const swaggerConfig = config.get('swagger')
  if (swaggerConfig) {
    // eslint-disable-next-line
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setVersion(swaggerConfig.version)
      .setDescription(swaggerConfig.description)
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup(swaggerConfig.path, app, document)
  }

  await app.listen(
    config.get<number>('PORT', 3000),
    config.get<string>('HOST', '0.0.0.0')
  )
  showBanner(await app.getUrl())
}

export async function prod() {
  const app = await createApp()
  const config = app.get(ConfigService)

  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))
  app.use(helmet())

  await app.listen(
    config.get<number>('PORT', 3000),
    config.get<string>('HOST', '0.0.0.0')
  )
}

if (require.main === module) {
  dev()
}
