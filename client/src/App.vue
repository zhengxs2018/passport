<template>
  <header class="header">
    <h1 class="title">
      <!-- <img src="./assets/images/logo.svg" alt="logo" /> -->
      <span>嗷呜，超凶的~</span>
    </h1>
    <div class="desc">欢迎使用「前端小狮子」统一认证服务</div>
  </header>

  <div class="main">
    <router-view></router-view>
  </div>

  <footer class="footer">
    <div class="links">
      <ul>
        <li>
          <a href="https://github.com/zhengxs2018" target="__blank">Github</a>
        </li>
      </ul>
    </div>
    <div class="extra">
      <a class="copyright" href="//zhengxs.cn" target="__blank"> ©2020 小贤 </a>
      <a class="icp" href="http://www.beian.miit.gov.cn/" target="_blank"> 浙ICP备19001562号 </a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: url(./assets/images/background.svg) 50%/100% no-repeat #f0f2f5;
}

.header {
  padding-top: 36px;
  text-align: center;

  .title {
    margin: 0;
    height: 44px;
    line-height: 44px;

    img {
      height: 44px;
      vertical-align: top;
      margin-right: 16px;
      border-style: none;
    }

    span {
      font-size: 33px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
    }
  }

  .desc {
    margin-top: 12px;
    margin-bottom: 40px;
    text-align: center;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
  }
}

.main {
  flex: 1;
  padding: 24px 24px 36px;
  box-sizing: border-box;
}

.footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 12px;
  line-height: 1.4;
  padding: 0 24px 14px;

  a,
  span {
    color: #757575;
  }

  .extra {
    height: 16.8px;
    margin: 8px 0;
  }

  .icp {
    margin-left: 8px;
  }

  .links {
    margin: 8px 0;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      display: inline-block;
      margin: 0;

      a {
        padding-left: 8px;
        padding-right: 8px;
      }
    }
  }
}

.page-title {
  padding-bottom: 24px;
  color: #202124;
  font-size: 24px;
  font-weight: 400;
  line-height: 1.3333;
}

.link {
  color: #1890ff;
  font-weight: 500;
  letter-spacing: 0.25px;
}

@media all and (min-width: 450px) {
  .header {
    padding-top: 80px;
  }

  .main {
    width: 375px;
    margin: 0 auto;
  }

  .footer {
    padding: 8px 16px;
    // background-color: #fbfbfb;
  }

  .ant-col {
    width: 100%;
  }
}
</style>
