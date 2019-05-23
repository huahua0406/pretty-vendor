<template>
    <div class="user">
        <div class="user-header">
            <img class="avatar"
                 :src="userInfo.avatarUrl"
                 alt="">
            <span class="nickname">{{userInfo.mobile}}</span>
        </div>
        <div class="user-address"
             @click="editAddress()">
            <div class="address-info"
                 v-if="userInfo.addressInfo">
                <h5 class="address-title">地址管理
                    <i class="icon-arrow"></i>
                </h5>
                <div class="address-main">
                    <div class="text-row">
                        {{userInfo.addressInfo.name}}
                    </div>
                    <div class="text-row">
                        {{userInfo.addressInfo.mobile}}
                    </div>
                    <div class="text-row">
                        {{totalDetail}}
                    </div>
                </div>
            </div>
            <div class="add-new-address"
                 v-else>
                <i class="icon-add">+</i>
                <span>添加地址</span>
            </div>
        </div>
        <div class="user-order">
            <h5 class="order-title">我的订单</h5>
            <div class="order-list"
                 v-if="userInfo.orderInfo.length>0">
                <div class="order-item"
                     v-for="(item,index) in userInfo.orderInfo"
                     :key="index">
                    <div class="order-header">
                        订单编号:
                        <span class="order-no">{{item.order_no}}</span>
                    </div>
                    <div class="order-main">
                        <div class="item-left">
                            <img :src="item.snap_img">
                        </div>
                        <div class="item-middle">
                            <div>{{item.snap_name}}</div>
                            <div>{{item.total_count}}件商品</div>
                        </div>
                        <div class="item-right">
                            <p class="order-status-txt unpay"
                               v-if="item.status==1">待付款</p>
                            <p class="order-status-txt payed"
                               v-else-if="item.status==2">已付款</p>
                            <p class="order-status-txt done"
                               v-else-if="item.status==3">已发货</p>
                        </div>
                    </div>
                    <div class="order-footer"
                         v-if="item.status==1">
                        <span>实付:{{item.total_price | formatMoney}}</span>
                        <button class="pay">付款</button>
                    </div>
                </div>
            </div>
            <div class="no-data"
                 v-else>
                您还没有订单哦~
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'user',
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['userInfo']),
        totalDetail() {
            return this.userInfo.addressInfo.cityVal + ' ' + this.userInfo.addressInfo.detail
        }
    },
    mounted() {},
    methods: {
        editAddress() {
            this.$router.push({ path: '/page/address' })
        }
    },
    filters: {
        formatMoney(value) {
            return '￥' + value
        }
    }
}
</script>

<style scoped lang="less">
.user {
    background-color: #ededed;
    .user-header {
        background-color: #ab956d;
        color: #fff;
        display: flex;
        align-items: center;
        padding: 15px;
        font-size: 14px;
        .avatar {
            height: 50px;
            width: 50px;
            border-radius: 50px;
        }
        .nickname {
            margin-left: 10px;
        }
    }
    .user-address {
        background-color: #fff;
        .add-new-address {
            padding: 10px 0;
            width: 100%;
            color: #989898;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            .icon-add {
                font-style: normal;
                margin-right: 5px;
            }
        }
        .address-info {
            .address-title {
                font-weight: normal;
                padding: 10px 0;
                color: #999999;
                text-align: center;
                border-bottom: 1px solid #ededed;
                font-size: 14px;
                background-color: #fff;
                position: relative;
                .icon-arrow {
                    position: absolute;
                    transform: rotate(270deg);
                    height: 24px;
                    width: 24px;
                    right: 5px;
                    top: 10px;
                    background: url(~@/assets/icon/arrow@right.png) no-repeat;
                    background-size: 100% 100%;
                    display: block;
                }
            }
            .address-main {
                .text-row {
                    padding: 10px 15px 10px 0;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #e9e9e9;
                    margin-left: 15px;
                    height: 45px;
                    font-size: 14px;
                    color: #7c7c7c;
                    box-sizing: border-box;
                    &:last-child {
                        border-bottom: none;
                    }
                }
            }
        }
    }
    .user-order {
        margin-top: 10px;
        .order-title {
            font-weight: normal;
            padding: 10px 0;
            color: #999999;
            text-align: center;
            border-bottom: 1px solid #ededed;
            font-size: 14px;
            background-color: #fff;
            position: relative;
        }
        .order-item {
            margin-bottom: 10px;
            color: #777777;
            background-color: #fff;
            font-size: 14px;
            &:last-child {
                margin-bottom: 0;
            }
            .order-header {
                margin-left: 15px;
                border-bottom: 1px solid #ededed;
                padding: 10px 0;
                .order-no {
                    margin-left: 5px;
                }
            }
            .order-main {
                display: flex;
                height: 75px;
                color: #6d6d6d;
                padding: 10px 15px;
                .item-left {
                    flex-basis: 75px;
                    height: 100%;
                    background-color: #f5f6f5;
                    border-radius: 2px;
                    img {
                        height: 100%;
                        width: 100%;
                    }
                }
                .item-middle {
                    flex: 1;
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    div {
                        margin: 5px 0;
                    }
                }
                .item-right {
                    display: flex;
                    flex-basis: 60px;
                    align-items: center;
                    justify-content: flex-end;
                    color: #b42f2d;
                }
            }
            .order-footer {
                margin-left: 15px;
                border-top: 1px solid #ededed;
                height: 45px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #2f2f2f;
                .pay {
                    width: 85px;
                    height: 30px;
                    margin-right: 15px;
                    background-color: #b42f2d;
                    border-radius: 2px;
                    color: #fff;
                    text-align: center;
                    line-height: 30px;
                    border: none;
                    outline: none;
                    &:active {
                        background-color: #9a211f;
                    }
                }
            }
        }
        .no-data {
            display: flex;
            height: 40px;
            font-size: 13px;
            color: #ccc;
            align-items: center;
            justify-content: center;
            background: #fff;
        }
    }
}
</style>
