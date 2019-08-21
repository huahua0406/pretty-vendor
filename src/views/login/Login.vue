<template>
    <div class="login-wrapper">
        <div class="logo-wrap">
            <img alt="logo" class="app-logo" src="@/assets/logo.png" />
            <h2 class="app-name">零食商贩</h2>
        </div>
        <van-cell-group>
            <van-field clearable label="用户名" placeholder="请输入用户名" v-model="loginForm.username" />

            <van-field clearable label="密码" placeholder="请输入密码" type="password" v-model="loginForm.password" />
        </van-cell-group>
        <div class="btn-wrap">
            <van-button :loading="loading" @click="onSubmit" block hairline loading-text="加载中..." round size="normal" type="primary">登录</van-button>
        </div>

        <div class="reg-link">
            <router-link to="/register">注册</router-link>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';
import { mapActions } from 'vuex';
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
            loading: false
        };
    },
    methods: {
        ...mapActions('user', ['updateUserInfo']),
        onSubmit() {
            this.loading = true;
            this.$api
                .login({
                    username: this.loginForm.username,
                    password: md5(this.loginForm.password)
                })
                .then(res => {
                    this.loading = false;
                    if (res.data.code == 0) {
                        this.$toast('登录成功');
                        localStorage.setItem('token', res.data.token);
                        this.$api
                            .getUserInfo()
                            .then(res => {
                                this.updateUserInfo(res.data.data);
                                this.$router.replace('/home');
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    } else {
                        this.$toast(res.data.msg);
                    }
                })
                .catch(err => {
                    this.loading = false;
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.login-wrapper {
    height: 100%;
    background: #fff;
}
.logo-wrap {
    padding: 50px 0;
}
.logo-wrap .app-logo {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: auto;
    margin-bottom: 15px;
}
.logo-wrap .app-name {
    font-size: 18px;
    color: #ab956d;
    font-weight: normal;
    line-height: 25px;
    text-align: center;
}

.btn-wrap {
    padding: 15px;
    margin-top: 30px;
}

.reg-link {
    text-align: center;
    text-decoration: underline;
    color: #000;
}
</style>
