<template>
  <div class="page-title">登录</div>

  <div class="form-wrapper">
    <PasswdLoginForm :onFinish="handleFinish" />

    <div class="user-login-other">
      <span>其他登录方式</span>
      <QrcodeOutlined class="item-icon" />
      <WechatOutlined class="item-icon" />

      <router-link class="link" to="/register" style="float: right">注册账户</router-link>
    </div>
  </div>
</template>

<script>
import { WechatOutlined, QrcodeOutlined } from '@ant-design/icons-vue'

import PasswdLoginForm from '../components/PasswdLoginForm.vue'

import { redirect } from '../lib/session'

export default {
  name: 'Login',
  methods: {
    handleFinish: redirect
  },
  components: {
    QrcodeOutlined,
    WechatOutlined,
    PasswdLoginForm
  }
}
</script>

<style lang="scss" scoped>
.user-login-other {
  text-align: left;
  margin-top: 24px;
  line-height: 22px;

  .item-icon {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.2);
    margin-left: 16px;
    vertical-align: middle;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }
}
</style>
