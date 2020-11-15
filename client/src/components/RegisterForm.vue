<template>
  <a-form :hideRequiredMark="true" :model="formData" :rules="formRules" @finish="handleSubmit" ref="form">
    <a-form-item name="username">
      <a-input v-model:value.trim="formData.username" :readonly="loading" size="large" placeholder="请输入用户名" />
    </a-form-item>

    <a-form-item name="password">
      <a-input-password
        v-model:value.trim="formData.password"
        :readonly="loading"
        size="large"
        placeholder="至少6位密码，区分大小写"
      />
    </a-form-item>

    <a-form-item>
      <a-row>
        <a-col span="12">
          <span>已有账号? </span>
          <router-link class="link" to="/login">立即登录</router-link>
        </a-col>
        <a-col span="12" style="text-align: right">
          <a-button type="primary" htmlType="submit" :loading="loading"> 注册 </a-button>
        </a-col>
      </a-row>
    </a-form-item>
  </a-form>
</template>

<script>
import { Row, Col, Form, Input, Button, message } from 'ant-design-vue'

import { doPost } from '../lib/http'

export default {
  name: 'PasswdLoginForm',
  props: {
    onFinish: Function
  },
  data() {
    return {
      loading: false,
      formData: {
        username: '',
        password: ''
      },
      formRules: {
        username: [
          { required: true, message: '用户名必填', trigger: 'blur' },
          { min: 4, max: 16, message: '用户名长度必须为 4~16 个字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '秘密必填', trigger: 'blur' },
          { min: 4, max: 16, message: '密码长度必须为 4~16 个字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      try {
        const data = JSON.stringify(this.formData)
        const res = await doPost('/auth/register', data)
        await Promise.resolve(this.onFinish(res))
        this.loading = false
      } catch (err) {
        message.error(err.message)
      } finally {
        this.loading = false
      }
    }
  },
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-form': Form,
    'a-form-item': Form.Item,
    'a-input': Input,
    'a-input-password': Input.Password,
    'a-button': Button
  }
}
</script>
