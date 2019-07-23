<template>
  <div class="login-wrapper">
    <div class="logo-wrap">
      <img src="" class="app-logo" alt="logo">
      <h2 class="app-name">零食商贩</h2>
    </div>
    <van-cell-group>
      <van-field
        v-model="loginForm.username"
        clearable
        label="用户名"
        placeholder="请输入用户名"
      />

      <van-field
        v-model="loginForm.password"
        clearable
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <div class="btn-wrap">
      <van-button type="primary"
                  size="normal"
                  block
                  round
                  hairline
                  :loading="loading"
                  loading-text="加载中..."
                  @click="onSubmit"
                  >登录</van-button>
    </div>

    <div class="reg-link">
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.$api.login({
        username: this.loginForm.username,
        password: md5(this.loginForm.password)
      }).then(res => {
        this.loading = false
        this.$toast('登录成功')
        localStorage.setItem('token', res.data.token)
        this.$router.replace('/home')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrapper{
  height: 100%;
}
.logo-wrap {
  margin: 50px 0;
}
.logo-wrap .app-logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin:auto;
    margin-bottom: 15px;
    background: #000;
}
.logo-wrap .app-name{
  font-size: 18px;
  color: #AB956D;
  font-weight: normal;
  line-height: 25px;
  text-align: center;
}

.btn-wrap{
  padding: 15px;
  margin-top: 30px;
}

.reg-link {
    text-align: center;
}
</style>
