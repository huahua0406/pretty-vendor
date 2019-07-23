<template>
  <div>
    <van-cell-group>
      <van-field
        v-model="form.username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('用户名必填')"
      />

      <van-field
        v-model="form.password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
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
                >注册</van-button>
    </div>

  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'register',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.loading = true
      this.$api.register({
        username: this.form.username,
        password: md5(this.form.password) // 密码md5加密存储
      }).then(res => {
        this.loading = false
        this.$toast('注册成功')
        this.$router.push('/login')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-wrap{
  padding: 15px;
  margin-top: 30px;
}
</style>
