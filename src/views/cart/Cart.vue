<template>
    <div class="cart-wrapper">
        <div v-if="cartList.length">
            <div class="cart-box">
                <div :key="index" class="cart-item van-hairline--bottom" v-for="(item,index) in cartList">
                    <div class="cart-item-main">
                        <div @click="_toggleSingleChecked(item.id)" class="cart-item-checkbox">
                            <i class="icon_checkbox" v-if="item.isChecked"></i>
                            <i class="icon_checkbox checked" v-else></i>
                        </div>
                        <div @click="linkToDetail(item.id)" class="cart-item-image">
                            <img :src="item.main_img_url" alt="img" />
                        </div>
                        <div class="cart-item-ctrl">
                            <div class="title-box">
                                <span class="title">{{item.name}}</span>
                                <span class="price">{{item.price | formatPrice}}</span>
                            </div>
                            <div class="bottom-box">
                                <div class="cart-item-counts">
                                    <!-- btn-ctrl -->
                                    <a :class="item.count===1?'disabled':''" @click="cutItem(item.id)" class="btn cut" data-type="cut" href="javascript:;">-</a>
                                    <a class="count" href="javascript:;">{{item.count}}</a>
                                    <a @click="addItem(item.id)" class="btn add" data-type="add" href="javascript:;">+</a>
                                </div>
                                <span @click="delItem(item.id)" class="delete">×</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart-footer">
                <div @click="_toggleAllChecked" class="all-select">
                    <img alt="all" src="@/assets/icon/all@selected.png" v-if="isAllChecked" />
                    <img alt="all" src="@/assets/icon/all.png" v-else />
                    <span>{{allCheckedText}}</span>
                </div>
                <div :class="tolalPrice===0?'disabled':''" @click="onSubmit" class="all-price-cutmit">
                    <!-- // pointer-events: none; -->
                    <span class="accounts-btn">下单</span>
                    <span class="price-text">{{tolalPrice | formatPrice}}</span>
                    <span class="arrow-icon">
                        <img src="@/assets/icon/arrow@grey.png" v-if="tolalPrice===0" />
                        <img src="@/assets/icon/arrow.png" v-else />
                    </span>
                </div>
            </div>
        </div>
        <div class="no-data" v-else>您的购物车空空如也。</div>
        <div style="height:50px;"></div>
        <tabbar></tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'Cart',
    components: {
        Tabbar
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['cartList', 'checkedGoodsList', 'tolalPrice', 'totalCount']),
        allCheckedText() {
            const count = this.checkedGoodsList.length;
            return '全选' + (count ? `(${count})` : '');
        },
        isAllChecked() {
            return this.checkedGoodsList.length === this.cartList.length;
        }
    },
    filters: {
        formatPrice(value) {
            return '￥' + value;
        }
    },
    methods: {
        ...mapActions('cart', ['addProduct', 'cutProduct', 'delProduct', 'toggleSingleChecked', 'toggleAllChecked']),
        onSubmit() {
            this.$toast(`总价：￥ ${this.tolalPrice}`);
        },
        findIndexById(id) {
            return this.cartList.findIndex(item => {
                return item.id === id;
            });
        },
        linkToDetail(id) {
            this.$router.push({ path: '/detail', query: { id } });
        },
        addItem(id) {
            let index = this.findIndexById(id);
            // this.$store.dispatch('cart/addProduct', index) OR this.addProduct(index)
            this.addProduct(index);
        },
        cutItem(id) {
            let index = this.findIndexById(id);
            this.cutProduct(index);
        },
        delItem(id) {
            let index = this.findIndexById(id);
            this.delProduct(index);
        },
        _toggleSingleChecked(id) {
            let index = this.findIndexById(id);
            this.toggleSingleChecked(index);
        },
        _toggleAllChecked() {
            console.log(this.isAllChecked)
            this.toggleAllChecked(this.isAllChecked);
        }
    }
};
</script>

<style lang="scss">
.cart-wrapper {
    .cart-box {
        // overflow: hidden;
        margin-bottom: 46px;
        background: #fff;
        .cart-item {
            display: flex;
            padding: 10px 10px 10px 0;
            height: 113px;
            // &:last-child {
            //   margin-bottom: 0;
            // }
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
                        background: url(~@/assets/icon/circle@selected.png) no-repeat;
                        background-size: 100% 100%;
                        &.checked {
                            background: url(~@/assets/icon/circle@noselected.png) no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
                .cart-item-image {
                    width: 93px;
                    height: 93px;
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
                            font-size: 14px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        }
                    }
                    .bottom-box {
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .cart-item-counts {
                            width: 110px;
                            display: flex;
                            justify-content: space-between;
                            text-align: center;
                            .btn {
                                min-width: 25px;
                                line-height: 1;
                                color: #454553;
                                font-size: 25px;
                                padding: 0 5px;
                                border-radius: 2px;
                                background: #f5f5f5;
                                &.disabled {
                                    color: #d5d5db;
                                    pointer-events: none;
                                }
                            }
                            .count {
                                color: #454553;
                                font-size: 14px;
                                line-height: 25px;
                                box-sizing: border-box;
                            }
                        }
                        .delete {
                            font-size: 25px;
                            padding: 0 5px;
                        }
                    }
                }
            }
        }
    }
    .cart-footer {
        position: fixed;
        z-index: 100;
        bottom: 50px;
        height: 46px;
        width: 100%;
        display: flex;
        background-color: #ab956d;
        color: #fff;
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
