<template>
    <div class="detail">
        <div class="detail-main"
             v-if="product">
            <div class="fixed-cart-box"
                 @click="linkToCart"
                 :class="[isShake ?'animate':'']">
                <img src="~@/assets/icon/cart@top.png"
                     alt="icon-cart"
                     ref="topCart">
                <span class="total-count"
                      v-if="this.totalCount>0">{{this.totalCount}}</span>
            </div>
            <div class="detail-img">
                <img :src="product.main_img_url"
                     alt="image">
            </div>
            <div class="cart-box">
                <div class="product-counts">
                    <span class="counts-tips">数量</span>
                    <popup-picker :data="countsArray"
                                  v-model="count"
                                  class="picker"
                                  popup-title="请选择数量"
                                  value-text-align="left"></popup-picker>
                </div>
                <div class="middle-border"></div>
                <div class="add-cart-btn"
                     @touchstart="onAddToCart">
                    <span class="add-cart">加入购物车</span>
                    <i class="icon-cart"></i>
                    <img class="small-top-img"
                         ref="smallTopImg"
                         :src="product.main_img_url"
                         :class="[isFly ?'animate':'']"
                         alt="image">
                </div>
            </div>
            <div class="product-info-box">
                <div class="stock"
                     v-if="product.stock>0">有货</div>
                <div class="stock no"
                     v-else>缺货</div>
                <div class="name">{{product.name}}</div>
                <div class="price">￥{{product.price}}</div>
            </div>
        </div>
        <div class="detail-bottom">
            <tab :line-width=2
                 active-color='#AB956D'
                 v-model="index">
                <tab-item class="vux-center"
                          :selected="selectd === item"
                          v-for="(item, index) in list"
                          @click="selectd = item"
                          :key="index">{{item}}</tab-item>
            </tab>
            <swiper v-model="index"
                    height="auto"
                    :show-dots="false">
                <swiper-item v-for="(item, index) in list"
                             :key="index">
                    <div class="tab-swiper vux-center">{{item}}</div>
                </swiper-item>
            </swiper>
        </div>
    </div>
</template>

<script>
import { PopupPicker, Tab, TabItem, Swiper, SwiperItem } from 'vux'
import { mapState, mapMutations, mapGetters } from 'vuex'
const tabList = () => ['商品详情', '产品参数', '售后保障']
export default {
    name: 'detail',
    data() {
        return {
            product: null,
            countsArray: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
            count: ['1'],
            list: tabList(),
            selectd: '商品详情',
            index: 0,
            isFly: false,
            isShake: false
        }
    },
    computed: {
        ...mapState(['userInfo']),
        ...mapGetters(['totalCount']),
        isDisabled() {
            return this.product.stock > 0
        }
    },
    created() {},
    activated() {
        this.getAllProducts()
    },
    methods: {
        ...mapMutations(['ADD_TO_CART']),
        linkToCart() {
            this.$router.push({ path: '/page/cart' })
        },
        getAllProducts() {
            this.$http
                .get(
                    '/product/all'
                )
                .then(res => {
                    let detailData = res.data.data.filter(item => {
                        return item.id === +this.$route.query.id
                    })
                    this.product = detailData[0]
                })
        },
        onAddToCart() {
            // 如果没登录，先去登录
            if (!this.userInfo) {
                this.$router.push({ path: '/login' })
                return
            }
            // 缺货时禁止点击
            if (!this.isDisabled) {
                this.$vux.toast.text('暂时缺货哦~', 'middle')
                return
            }
            // 防止过快点击
            if (this.isFly) return
            // 移动距离
            let rect1 = this.$refs.smallTopImg.getBoundingClientRect()
            let rect2 = this.$refs.topCart.getBoundingClientRect()
            let x = rect1.right - rect2.right + (40 - 16)
            let y = rect2.top - rect1.top - 20
            this.isFly = true
            this.$nextTick(() => {
                this.$refs.smallTopImg.style.transform = `translate(${x}px,${y}px) rotate(350deg) scale(0)`
            })
            setTimeout(() => {
                // 飞入购物车动画恢复到最初状态
                this.isFly = false
                this.$refs.smallTopImg.style.transform = 'none'
                // 右侧购物车图标放大
                this.isShake = true
                setTimeout(() => {
                    let count = +this.count // 字符串类型数字转为数字
                    if (this.product.isChecked === undefined) {
                        this.$set(this.product, 'isChecked', true)
                    }
                    this.ADD_TO_CART(
                        Object.assign({}, this.product, { count: count })
                    )
                    this.isShake = false
                }, 200)
            }, 1000)
        }
    },
    components: {
        PopupPicker,
        Tab,
        TabItem,
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped lang="less">
@import '~vux/src/styles/center.less';
.detail {
    background-color: #f9f9f9;
    .detail-main {
        background: #fff;
        .fixed-cart-box {
            position: fixed;
            z-index: 10;
            top: 71px;
            right: 12px;
            width: 40px;
            height: 32px;
            img {
                width: 32px;
                height: 32px;
            }
            .total-count {
                font-size: 12px;
                background-color: #ab956d;
                color: #fff;
                position: absolute;
                right: 32px;
                top: 0;
                height: 18px;
                width: 18px;
                line-height: 18px;
                border-radius: 18px;
                text-align: center;
            }
            &.animate {
                animation: animateCartScale 200ms
                    cubic-bezier(0.17, 0.67, 0.83, 0.67);
                animation-fill-mode: backwards;
            }
        }
        .detail-img {
            position: relative;
            height: 0;
            padding-top: 100%;
            img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                vertical-align: top;
            }
        }
        .cart-box {
            height: 50px;
            margin: 15px;
            border-radius: 50px;
            background-color: #ab956d;
            color: #fff;
            display: flex;
            align-items: center;
            .product-counts {
                width: 50%;
                height: 100%;
                display: flex;
                font-size: 12px;
                align-items: center;
                justify-content: center;
                .picker {
                    margin: 0 10px;
                    width: 35%;
                    background: url(~@/assets/icon/arrow@down.png) no-repeat
                        right center;
                }
                .counts-tips {
                    width: 30%;
                    text-align: center;
                    margin-left: 15px;
                }
            }
            .middle-border {
                width: 1px;
                height: 15px;
                border-right: 1px #fff dotted;
            }
            .add-cart-btn {
                height: 100%;
                display: flex;
                font-size: 12px;
                align-items: center;
                justify-content: center;
                position: relative;
                flex: 1;
                &:active {
                    color: #fff;
                }
                &.disabled {
                    color: #d5d5db;
                }
                .icon-cart {
                    margin-left: 20px;
                    height: 16px;
                    width: 16px;
                    background: url(~@/assets/icon/cart.png) no-repeat;
                    background-size: 100% 100%;
                }
                .small-top-img {
                    width: 80px;
                    height: 80px;
                    right: 5px;
                    position: absolute;
                    // opacity: 0;
                    visibility: hidden;

                    &.animate {
                        // opacity: 1;
                        visibility: visible;
                        transition: all 1000ms
                            cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    }
                }
            }
        }
        .product-info-box {
            padding: 8px 0;
            color: #454552;
            text-align: center;
            div {
                margin: 10px auto;
                &.stock {
                    font-size: 12px;
                    &.no {
                        color: #b42f2d;
                    }
                }
                &.name {
                    font-size: 20px;
                }
                &.price {
                    font-size: 18px;
                }
            }
        }
    }
    .detail-bottom {
        background: #fff;
        margin-top: 15px;
        .tab-swiper {
            background-color: #fff;
            height: 180px;
        }
    }
}

@keyframes animateCartScale {
    0% {
        -webkit-transform: scale(1.2);
    }
    100% {
        -webkit-transform: scale(1);
    }
}
</style>
