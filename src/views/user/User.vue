<template>
    <div class="user">
        <div class="user-header">
            <img alt="avatar" src="http://118.31.77.247/static/logo.png" class="avatar" />
            <span class="nickname">{{userInfo.username}}</span>
        </div>
        <van-row class="user-links">
            <van-col span="6">
                <van-icon name="pending-payment" />待付款
            </van-col>
            <van-col span="6">
                <van-icon name="records" />待接单
            </van-col>
            <van-col span="6">
                <van-icon name="tosend" />待发货
            </van-col>
            <van-col span="6">
                <van-icon name="logistics" />已发货
            </van-col>
        </van-row>

        <van-cell-group class="user-group">
            <van-cell icon="records" is-link title="全部订单" />
        </van-cell-group>

        <van-cell-group>
            <van-cell icon="user-o" is-link title="我的信息" to="/profile" />
            <van-cell icon="location-o" is-link title="我的地址" to="/address" />
            <van-cell icon="info-o" is-link title="关于" to="/about" />
        </van-cell-group>
        <tabbar></tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'User',
    components: {
        Tabbar
    },
    computed:{
        ...mapGetters(['userInfo']),
    }
};
</script>

<style lang="scss">
.user {
    background: #ededed;
    &-header {
        width: 100%;
        height: 35vw;
        background-color: #ab956d;
        color: #fff;
        display: flex;
        align-items: center;
        padding: 15px;
        font-size: 14px;
    }
    &-header .avatar {
        height: 100px;
        width: 100px;
        border-radius: 50%;
    }
    &-header .nickname {
        margin-left: 10px;
    }
    &-group {
        margin-bottom: 10px;
    }
    &-links {
        padding: 15px 0;
        font-size: 12px;
        text-align: center;
        background-color: #fff;
        .van-icon {
            display: block;
            font-size: 24px;
        }
    }
}
</style>
