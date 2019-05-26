<template>
    <div class="cart">
        <div v-if="cartData.length>0">
            <div class="cart-box">
                <div class="cart-item vux-1px-b"
                     v-for="(item,index) in cartData"
                     :key="index">
                    <div class="cart-item-main">
                        <div class="cart-item-checkbox"
                             @click="toggleSelect(item.id)">
                            <i class="icon_checkbox"
                               v-if="item.isChecked"></i>
                            <i class="icon_checkbox checked"
                               v-else></i>
                        </div>
                        <div class="cart-item-image"
                             @click="linkToDetail(item.id)">
                            <img :src="item.main_img_url"
                                 alt="img">
                        </div>
                        <div class="cart-item-ctrl">
                            <div class="title-box">
                                <span class="title">{{item.name}}</span>
                                <span class="price">{{item.price|formatMoney}}</span>
                            </div>
                            <div class="bottom-box">
                                <div class="cart-item-counts">
                                    <a href="javascript:;"
                                       class="btns cut"
                                       :class="[item.count===1?'disabled':'']"
                                       data-type="cut"
                                       @click="cut(item.id)">-</a>
                                    <a href="javascript:;"
                                       class="counts">{{item.count}}</a>
                                    <a href="javascript:;"
                                       class="btns add"
                                       data-type="add"
                                       @click="add(item.id)">+</a>
                                </div>
                                <span class="delete"
                                      @click="del(item.id)">×</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-footer">
                <div class="all-select"
                     @click="toggleAllCheck">
                    <img src="~@/assets/icon/all@selected.png"
                         v-if="cartData.length===selectedArr.length"
                         alt="all">
                    <img src="~@/assets/icon/all.png"
                         alt=""
                         v-else>
                    <span>全选({{selectedArr.length}})</span>
                </div>
                <div class="all-price-cutmit"
                     :class="[tolalPrice===0?'disabled':'']">
                    <span class="accounts-btn"
                          @click="submitOrder">下单</span>
                    <span class="price-text">{{tolalPrice | formatMoney}}</span>
                    <span class="arrow-icon">
                        <img src="~@/assets/icon/arrow@grey.png"
                             v-if="tolalPrice===0">
                        <img src="~@/assets/icon/arrow.png"
                             v-else>
                    </span>
                </div>
            </div>
        </div>
        <div class="no-data"
             v-else>
            您的购物车空空如也。
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'cart',
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['cartData', 'tolalPrice', 'selectedArr']),
        allChecked() {
            return this.selectedArr.length === this.cartData.length
        }
    },
    created() {},
    methods: {
        ...mapMutations([
            'TOGGLE_STATUS',
            'DELETE_PRODUCT',
            'ADD_PRODUCT',
            'CUT_PRODUCT',
            'TOGGLE_ALLCHECK'
        ]),
        linkToDetail(id) {
            this.$router.push({ path: '/page/detail', query: { id: id } })
        },
        findIndexById(id) {
            return this.cartData.findIndex(item => {
                return item.id === id
            })
        },
        toggleSelect(id) {
            let index = this.findIndexById(id)
            this.TOGGLE_STATUS({ index: index })
        },
        del(id) {
            let index = this.findIndexById(id)
            this.DELETE_PRODUCT({ index: index })
        },
        add(id) {
            let index = this.findIndexById(id)
            this.ADD_PRODUCT({ index: index })
        },
        cut(id) {
            let index = this.findIndexById(id)
            this.CUT_PRODUCT({ index: index })
        },
        toggleAllCheck() {
            this.TOGGLE_ALLCHEK({ flag: this.allChecked })
        },
        submitOrder() {
            this.$router.push({
                path: '/page/order',
                query: { account: this.tolalPrice }
            })
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
.cart {
    .cart-box {
        overflow: hidden;
        margin-bottom: 46px;
        font-size: 15px;
        line-height: 21px;
        .cart-item {
            display: flex;
            padding: 10px;
            padding-left: 0;
            background-color: #fff;
            height: 93px;
            &:last-child {
                margin-bottom: 0;
            }
            .cart-item-main {
                width: 100%;
                display: flex;
                .cart-item-checkbox {
                    width: 42px;
                    height: 100%;
                    height: 93px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .icon_checkbox {
                        height: 22px;
                        width: 22px;
                        background: url(~@/assets/icon/circle@selected.png)
                            no-repeat;
                        background-size: 100% 100%;
                        &.checked {
                            background: url(~@/assets/icon/circle@noselected.png)
                                no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
                .cart-item-image {
                    width: 93px;
                    height: 100%;
                    background-color: #f5f6f5;
                    border-radius: 2px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .cart-item-ctrl {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 4px 0;
                    margin: 0 10px;
                    box-sizing: border-box;
                    color: #454553;
                    .title-box {
                        display: flex;
                        justify-content: space-between;
                        .title,
                        .price {
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }
                    }
                    .bottom-box {
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .cart-item-counts {
                            width: 110px;
                            display: flex;
                            justify-content: space-between;
                            text-align: center;
                            .btns {
                                color: #454553;
                                font-size: 25px;
                                padding: 0 5px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                &.disabled {
                                    color: #d5d5db;
                                    pointer-events: none;
                                }
                            }
                            .counts {
                                color: #454553;
                                font-size: 12px;
                                padding-top: 6px;
                                box-sizing: border-box;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                        .delete {
                            font-size: 20px;
                            padding: 0 5px;
                        }
                    }
                }
            }
        }
    }
    .cart-footer {
        position: fixed;
        bottom: 53px;
        height: 46px;
        width: 100%;
        display: flex;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        background-color: #ab956d;
        color: #fff;
        z-index: 100;
        div {
            display: flex;
            align-items: center;
            &.all-select {
                font-size: 14px;
                width: 40%;
                img {
                    height: 24px;
                    width: 24px;
                    margin: 0 10px;
                }
            }
            &.all-price-cutmit {
                width: 60%;
                .accounts-btn,
                .price-text,
                .arrow-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 16px;
                }
                .accounts-btn {
                    width: 50%;
                    font-size: 14px;
                    border-right: 1px dotted #fff;
                }
                .price-text {
                    width: 20%;
                    font-size: 14px;
                    margin-left: 5px;
                }
                .arrow-icon {
                    width: 30%;
                    img {
                        width: 16px;
                        height: 16px;
                    }
                }
                &.disabled {
                    color: #e6e6e6;
                    pointer-events: none;
                }
            }
        }
    }
    .no-data {
        display: flex;
        height: 70px;
        font-size: 13px;
        color: #ccc;
        align-items: center;
        justify-content: center;
    }
}
</style>
