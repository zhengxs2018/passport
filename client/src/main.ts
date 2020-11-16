import 'ant-design-vue/dist/antd.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import { init } from './lib/session'

/**
 * @todo 临时处理
 */
init()

const app = createApp(App)

app.use(router)
app.mount('#app')

if (import.meta.hot) {
  import.meta.hot.accept()
}
