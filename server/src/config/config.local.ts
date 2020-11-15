import type { SwaggerDocumentOptions } from '@nestjs/swagger'

export default () => ({
  proxy: true,
  swagger: <SwaggerDocumentOptions>{
    title: 'API',
    version: '0.1.0',
    description: '',
    path: 'api'
  }
})
