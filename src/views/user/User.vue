<template>
    <div class="user">
        <div class="user-header">
            <img alt="avatar" :src="userInfo.headimgurl||require('@/assets/avatar.png')" class="avatar" />
            <span class="nickname">{{userInfo.username}}</span>
        </div>
        <van-row class="user-links">
            <van-col span="6">
                <van-icon name="pending-payment" @click="$toast('暂时无法查看哦')"/>待付款
            </van-col>
            <van-col span="6">
                <van-icon name="records" @click="$toast('暂时无法查看哦')"/>待接单
            </van-col>
            <van-col span="6">
                <van-icon name="tosend" @click="$toast('暂时无法查看哦')"/>待发货
            </van-col>
            <van-col span="6">
                <van-icon name="logistics" @click="$toast('暂时无法查看哦')" />已发货
            </van-col>
        </van-row>

        <van-cell-group class="user-group" @click="$toast('暂时无法查看哦')">
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
        height: 30vw;
        background-color: #ab956d;
        color: #fff;
        display: flex;
        align-items: center;
        padding: 10px 15px;
        font-size: 14px;
    }
    &-header .avatar {
        height: 60px;
        width: 60px;
        background: #f5f5f5;
        border-radius: 50%;
    }
    &-header .nickname {
        margin-left: 10px;
        font-size: 18px;
        flex: 1;
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
