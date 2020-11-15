import { createRouter, createWebHistory } from 'vue-router'

import Login from './views/Login.vue'
import Register from './views/Register.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    }
  ]
})

router.addRoute({
  path: '/',
  redirect: '/login'
})

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.router = router
}

export default router
