# Passport - 统一认证服务

可独立部署的 passport 服务，通过 session 实现 sso 单点登录，支持 jwt 和 第三方授权。

- [部署参考](https://github.com/zhengxs2018/passport-delos)
- [demo](https://passport.zhengxs.cn)

## 功能

- 登录 - 后续跳转待实现
  - [x] 密码登录
  - [ ] 验证码登录
  - [x] 微信登录
- 注册 - 后续跳转待实现
  - [x] 账号注册
  - [ ] 邮箱注册
  - [ ] 手机号注册
- SSO 单点登录
  - [ ] checkSession 检查会话
  - [ ] refreshToken 刷新 jwt 授权
- 个人资料
  - [x] 获取个人资料
  - [ ] 修改个人资料
  - [ ] 修改手机号
  - [ ] 修改邮箱
  - [ ] 修改密码
  - [ ] 解/绑定微信号

## 后续规划

- 尝试 nestjs 的微服务

## License

- MIT
