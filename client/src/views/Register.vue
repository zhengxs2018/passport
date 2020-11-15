<template>
  <div class="page-title">注册</div>
  <RegisterForm :onFinish="handleFinish" />
</template>

<script>
import RegisterForm from '../components/RegisterForm.vue'

import { redirect } from '../lib/session'

export default {
  name: 'Register',
  methods: {
    handleFinish: redirect
  },
  components: {
    RegisterForm
  }
}
</script>
