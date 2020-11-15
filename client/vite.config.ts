import type { UserConfig } from 'vite'

export default <UserConfig>{
  optimizeDeps: {
    include: ['tinycolor2'],
    exclude: ['lodash-es']
  },
  proxy: {
    '/auth': 'http://127.0.0.1:7300'
  },
  port: 7301
}
