import type { SignOptions } from 'jsonwebtoken'
import type { SessionOptions } from 'express-session'
import type { ClientOpts } from 'redis'

export default () => ({
  proxy: false,
  allowedHosts: [],
  jwt: <SignOptions>{
    expiresIn: '30m'
  },
  redis: <ClientOpts>{
    host: '127.0.0.1',
    port: 6379,
    db: 0
  },
  wechat: {
    client: 'wechat',
    scope: 'snsapi_userinfo'
  },
  session: <SessionOptions>{
    resave: false,
    saveUninitialized: false
  }
})
