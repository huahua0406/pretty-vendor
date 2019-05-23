<template>
    <div class="login"
         @keyup.enter="onLogin">
        <div class="logo-wrap">
            <img src="~@/assets/logo.png"
                 class="app-logo">
            <h2 class="app-name">零食商贩</h2>
        </div>
        <group>
            <x-input placeholder="11位手机号"
                     :max="11"
                     type="tel"
                     v-model="phoneNumber"
                     is-type="china-mobile">
                <x-button slot="right"
                          type="primary"
                          mini
                          :text="btnText"
                          :disabled="disabled"
                          @click.native="sendCode"></x-button>
            </x-input>
            <x-input type="number"
                     placeholder="请输入验证码"
                     v-model="verifyCode"
                     @on-enter="onLogin">
            </x-input>
        </group>
        <div style="padding:15px;margin-top:30px;">
            <x-button @click.native="onLogin"
                      type="primary"> 登录 </x-button>
        </div>
    </div>
</template>

<script>
import { XInput, Group, XButton, Cell, Toast, base64 } from 'vux'
import { mapMutations } from 'vuex'
export default {
    name: 'Login',
    data() {
        return {
            btnText: '发送验证码',
            disabled: false,
            time: 0,
            phoneNumber: '',
            verifyCode: '',
            smsCode: ''
        }
    },
    created() {},
    activated() {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('cartData')
        this.UPDATE_USERINFO({
            userInfo: null
        })
    },
    methods: {
        ...mapMutations(['UPDATE_USERINFO']),
        sendCode() {
            const reg = /^1[3456789]\d{9}$/ // 手机号正则校验
            if (!this.phoneNumber) {
                this.$vux.toast.text('请输入手机号~', 'middle')
                return
            }
            if (!reg.test(this.phoneNumber)) {
                this.$vux.toast.text('手机号格式不正确~', 'middle')
                return
            }
            this.time = 60
            this.disabled = true
            this.timer()
            // 获取验证
            this.$http
                .post(
                    '/sendSms',
                    { phoneNumber: this.phoneNumber }
                )
                .then(res => {
                    let smsCode = res.data.data.verifCode
                    this.smsCode = smsCode
                    this.$vux.alert.show({
                        title: '验证码',
                        content: `验证码已发送,【${smsCode}】,10分钟有效`
                    })
                    setTimeout(() => {
                        this.$vux.alert.hide()
                    }, 3000)
                })
        },
        timer() {
            if (this.time > 0) {
                this.time--
                this.btnText = this.time + 's后重新获取'
                setTimeout(this.timer, 1000)
            } else {
                this.time = 0
                this.btnText = '获取验证码'
                this.disabled = false
            }
        },
        onLogin() {
            var reg = /^1[345789]\d{9}$/ // 手机号正则校验
            if (!this.phoneNumber) {
                this.$vux.toast.text('手机号不能为空~', 'middle')
                return
            }
            if (!reg.test(this.phoneNumber)) {
                this.$vux.toast.text('手机号格式不正确~', 'middle')
                return
            }
            if (!this.verifyCode) {
                this.$vux.toast.text('验证码不能为空~', 'middle')
                return
            }
            if (this.verifyCode !== this.smsCode) {
                this.$vux.toast.text('验证码不正确~', 'middle')
                return
            }
            const { phoneNumber, verifyCode } = this
            const data = {
                phoneNumber,
                verifyCode
            }
            this.$http
                .post(
                    '/login',
                    data
                )
                .then(res => {
                    // 登录成功
                    if (res.data.data.code === 0) {
                        this.$vux.toast.show({
                            text: '登录成功'
                        })
                        // 本地保存 token 和 userInfo
                        // vux 中提供的base64方法
                        // base64.encode('VUX')
                        // base64.decode('VlVY')
                        window.localStorage.setItem('token', base64.encode(res.data.data.token))
                        window.localStorage.setItem('userInfo', JSON.stringify(
                            res.data.data.userInfo
                        ))
                        this.UPDATE_USERINFO({
                            userInfo: res.data.data.userInfo
                        })
                        // 重定向到首页或者登录前的页面
                        let redirect = decodeURIComponent(
                            this.$route.query.redirect || '/'
                        )
                        setTimeout(() => {
                            this.$router.push({
                                path: redirect
                            })
                        }, 2000)
                    }
                })
        }
    },
    components: {
        XInput,
        XButton,
        Group,
        Cell,
        Toast
    }
}
</script>

<style scoped lang="less">
.login {
    height: 100%;
    text-align: center;
    overflow: hidden;
    .logo-wrap {
        margin:50px 0;
        .app-logo {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-bottom: 15px;
        }
        .app-name {
            font-size: 18px;
            color: #AB956D;
            font-weight: normal;
            line-height: 25px;
        }
    }
}
</style>
