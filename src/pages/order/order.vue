<template>
    <div class="order">
        <div class="order-address-info"
             @click="editAddress()">
            <div class="address-box"
                 v-if="userInfo.addressInfo">
                <div class="contact-box">
                    <div class="contact">
                        <div class="name">
                            <img src="~@/assets/icon/user.png">
                            <span class="text">{{userInfo.addressInfo.name}}</span>
                        </div>
                        <div class="mobile">
                            <img src="~@/assets/icon/mobile.png">
                            <span class="text">{{userInfo.addressInfo.mobile}}</span>
                        </div>
                    </div>
                    <div class="detail">
                        {{totalDetail}}
                    </div>
                </div>
                <div class="contact-icon">
                    <img src="~@/assets/icon/arrow@right.png">
                </div>
            </div>
            <div class="add-address"
                 v-else>
                <i class="icon-add">+</i>
                <span>添加地址</span>
            </div>
        </div>
        <!-- 列表 -->
        <div class="order-main">
            <div class="product-item"
                 v-for="(item,index) in selectedArr"
                 :key="index">
                <div class="item-left">
                    <img :src="item.main_img_url">
                </div>
                <div class="item-middle">
                    <div>{{item.name}}</div>
                    <div>{{item.price|formatMoney}}</div>
                </div>
                <div class="item-right">
                    ×{{item.count}}
                </div>
            </div>
        </div>
        <!--结算-->
        <div class="footer-account-box">
            <div class="total-account">
                付款合计：{{account | formatMoney}}
            </div>
            <div class="pay"
                 :class="[!userInfo.addressInfo?'disabled':'']"
                 @click="pay">去付款</div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'order',
    data() {
        return {
            account: null
        }
    },
    computed: {
        ...mapGetters(['selectedArr', 'userInfo']),
        totalDetail() {
            return this.userInfo.addressInfo.cityVal + ' ' + this.userInfo.addressInfo.detail
        }
    },
    created() {
        this.account = this.$route.query.account
    },
    methods: {
        ...mapMutations(['PLACE_ORDER']),
        pay() {
            if (!this.userInfo.addressInfo) {
                this.$vux.alert.show({
                    title: '下单提示',
                    content: `请填写您的收货地址`
                })
                return
            }
            const orderItem = {
                productItem: this.selectedArr,
                account: this.account
            }
            /* 下单和付款 */
            this.PLACE_ORDER(orderItem)
            this.$router.push({ path: '/page/user' })
        },
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
.order {
    background-color: #f4f4f4;
    // overflow-x: hidden;
    // height: 100%;
    font-size: 14px;
    .order-address-info {
        padding: 10px 20px;
        margin-bottom: 10px;
        background: #fff;
        .address-box {
            display: flex;
            .contact-box {
                flex: 1;
                .contact {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 12px;
                    div {
                        display: flex;
                        align-items: center;
                        &.mobile {
                            flex-basis: 100px;
                        }
                        img {
                            height: 16px;
                            width: 16px;
                            margin-right: 5px;
                        }
                        .text {
                            color: #333;
                        }
                    }
                }
                .detail {
                    color: #999999;
                }
            }
            .contact-icon {
                flex-basis: 55px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                img {
                    transform: rotate(270deg);
                    height: 24px;
                    width: 24px;
                }
            }
        }
        .add-address {
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
    }
    .order-main {
        background-color: #fff;
        padding-bottom: 46px;
        .product-item {
            display: flex;
            justify-content: space-around;
            height: 90px;
            color: #6d6d6d;
            border-bottom: 1px solid #e9e9e9;
            padding: 10px;
            .item-left {
                flex-basis: 90px;
                height: 100%;
                background-color: #f5f6f5;
                border-radius: 2px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .item-middle {
                flex: 1;
                margin-left: 10px;
            }
            .item-right {
                flex-basis: 45px;
                text-align: center;
            }
        }
    }
    .footer-account-box {
        position: fixed;
        z-index: 100;
        bottom: 0;
        height: 46px;
        width: 100%;
        background: #fff;
        display: flex;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        div {
            display: flex;
            align-items: center;
            &.total-account {
                flex: 1;
                color: #93312e;
                padding-left: 10px;
            }
            &.pay {
                flex-basis: 120px;
                background-color: #ab956d;
                color: #fff;
                justify-content: center;
                &.active {
                    background: #84704d;
                }
                &.disabled {
                    background: rgba(171, 149, 109, 0.6);
                    pointer-events: auto;
                }
            }
        }
    }
}
</style>
