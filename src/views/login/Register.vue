<template>
    <div>
        <van-cell-group>
            <van-field @click-right-icon="$toast('用户名必填')" clearable label="用户名" placeholder="请输入用户名" required right-icon="question-o" v-model="form.username" />

            <van-field label="密码" placeholder="请输入密码" required type="password" v-model="form.password" />
        </van-cell-group>
        <div class="btn-wrap">
            <van-button :loading="loading" @click="onSubmit" block hairline loading-text="加载中..." round size="normal" type="primary">注册</van-button>
        </div>
    </div>
</template>

<script>
import md5 from 'js-md5';
export default {
    name: 'register',
    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            loading: false
        };
    },
    methods: {
        onSubmit() {
            this.loading = true;
            this.$api
                .register({
                    username: this.form.username,
                    password: md5(this.form.password) // 密码md5加密存储
                })
                .then(res => {
                    this.loading = false;
                    this.$toast('注册成功');
                    this.$router.push('/login');
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.btn-wrap {
    padding: 15px;
    margin-top: 30px;
}
</style>
