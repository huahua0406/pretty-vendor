<template>
    <div class="detail" v-if="goodsInfo">
        <div class="goods-img">
            <img :alt="goodsInfo.name" :src="goodsInfo.main_img_url" />
        </div>
        <div :class="{'animate':isShake}" @click="linkToCart" class="top-cart-wrapper" ref="topCart">
            <img alt="icon-cart" src="@/assets/icon/cart@top.png" />
            <span class="total-count" v-if="totalCount>0">{{totalCount}}</span>
        </div>
        <div class="add-cart-wrapper">
            <div @click="showPicker = true" class="product-counts">
                <span class="select-title">数量</span>
                <span class="select-count">{{count}}</span>
                <van-icon class="select-arrow" name="arrow-down" />
            </div>
            <div class="middle-border"></div>
            <div @click="onAddToCart" class="add-cart-wrapper">
                <span class="add-cart-text">加入购物车</span>
                <i class="icon-cart"></i>
                <transition @after-enter="afterFly" @before-enter="beforeFly" @enter="flying" @leave="leave">
                    <img :src="goodsInfo.main_img_url" alt="image" class="small-fly-img" ref="smallFlyImg" v-show="isFly" />
                </transition>
            </div>
        </div>
        <div class="product-info-box">
            <div class="stock">{{goodsInfo.stock>0?'有货':'缺货'}}</div>
            <div class="name">{{goodsInfo.name}}</div>
            <div class="price">&yen; {{goodsInfo.price}}</div>
        </div>

        <van-tabs class="tabs-wrapper" v-model="activeIndex" animated>
            <van-tab title="商品详情">商品详情</van-tab>
            <van-tab title="产品参数">产品参数</van-tab>
            <van-tab title="售后保障">售后保障</van-tab>
        </van-tabs>
        <!-- popup -->
        <van-popup position="bottom" v-model="showPicker" type="card">
            <van-picker :columns="columns" :default-index="0" @cancel="showPicker = false" @confirm="onConfirm" show-toolbar title="请选择数量" />
        </van-popup>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Detail',
    data() {
        return {
            goodsInfo: null,
            count: 1,
            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            showPicker: false,
            isFly: false,
            isShake: false,
            activeIndex: 0
        };
    },
    computed: {
        // 通过`store.js` 的`getters`暴露出的属性
        ...mapGetters(['totalCount'])
    },
    created() {
        this.getProductDetail();
    },
    methods: {
        linkToCart() {
            this.$router.push({ path: '/cart' });
        },
        ...mapActions(['addToCart', 'deleteGoods', 'updateGoods']),
        onConfirm(value, index) {
            this.$toast(`当前值：${value}, 当前索引：${index}`);
            this.count = value;
            this.showPicker = false;
        },
        getProductDetail() {
            this.$api.getProductDetail(this.$route.query.id).then(res => {
                this.goodsInfo = res.data.data;
            });
        },
        onAddToCart() {
            this.isFly = true;
            this.$store.dispatch('cart/addToCart', Object.assign({}, this.goodsInfo, { count: this.count }));
        },
        // 开始动画之前
        beforeFly(el) {
            // 起始位置
            el.style.opacity = 0;
            el.style.transformOrigin = 'center center';
            el.style.transform = 'translate(0,0) rotate(0deg) scale(1)';
        },
        flying(el, done) {
            // 移动距离
            let rect1 = el.getBoundingClientRect();
            let rect2 = this.$refs.topCart.getBoundingClientRect();
            // 16 top-cart-wrapper 宽度32/2,  smallFlyImg 宽度 80/2，debug 2px 向左偏移2 购物车图表中心箭头没居中
            let x = rect2.right - 16 - (rect1.right - 40) - 4;
            let y = rect2.top - 40 - (rect1.top - 16);
            // 动画完成后的样式
            // 使用触发动画重绘 setTimeout/el.offsetWidth
            setTimeout(() => {
                el.style.opacity = 1;
                el.style.transform = `translate(${x}px,${y}px)  rotate(350deg) scale(0)`;
                el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                // done是enter方法的原生的引用函数名，这里表示是回调函数，也就是接下来执行的操作afterFly（），消灭延迟效果。
                el.addEventListener('transitionend', done);
            }, 20);
        },
        afterFly(el) {
            el.style.transform = 'none';
            el.style.transition = 'none';
            el.style.display = 'none';
            el.style.opacity = 0;
            this.isFly = false;
            this.isShake = true;
        },
        leave(el, done) {
            setTimeout(() => {
                this.isShake = false;
            }, 1000);
        }
    }
};
</script>

<style lang="scss" scoped>
.detail {
    .goods-img {
        position: relative;
        height: 0;
        padding-top: 100%;
        background: #fff;
        img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
    .top-cart-wrapper {
        position: fixed;
        z-index: 10;
        top: 50px;
        right: 20px;
        width: 32px;
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
            right: 26px;
            top: 0;
            height: 18px;
            width: 18px;
            line-height: 18px;
            border-radius: 18px;
            text-align: center;
        }
        &.animate {
            animation: animateCartScale 200ms cubic-bezier(0.17, 0.67, 0.83, 0.67);
            animation-fill-mode: backwards;
        }
    }
    .add-cart-wrapper {
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
            .select-title {
                width: 30%;
                text-align: center;
                margin-left: 15px;
            }
            .select-count {
                width: 20px;
                text-align: center;
            }
            .select-arrow {
                font-size: 16px;
                margin-left: 10px;
            }
        }
        .middle-border {
            width: 1px;
            height: 15px;
            border-right: 1px #fff dotted;
        }
        .add-cart-wrapper {
            height: 100%;
            display: flex;
            font-size: 12px;
            align-items: center;
            justify-content: center;
            position: relative;
            flex: 1;
            .add-cart-text {
                color: #fff;
            }
            .icon-cart {
                margin-left: 20px;
                height: 16px;
                width: 16px;
                background: url(~@/assets/icon/cart.png) no-repeat;
                background-size: 100% 100%;
            }
            .small-fly-img {
                width: 80px;
                height: 80px;
                right: 5px;
                position: absolute;
            }
        }
    }

    .product-info-box {
        background: #fff;
        padding: 8px 0;
        color: #454552;
        text-align: center;
        .stock {
            font-size: 12px;
            margin-bottom: 10px;
        }
        .name {
            font-size: 20px;
            margin-bottom: 10px;
        }
        .price{
            font-size: 16px;
            margin-bottom: 10px;
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

.tabs-wrapper {
    margin-top: 20px;
    background: #fff;
    height: 180px;
    text-align: center;
    line-height:180px;
}
</style>
