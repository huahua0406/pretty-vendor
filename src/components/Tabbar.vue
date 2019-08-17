<template>
    <van-tabbar :z-index="99" active-color="#AB956D" class="tabbar" fixed inactive-color="#999" v-model="active">
        <van-tabbar-item :key="index" :to="item.path" v-for="(item,index) in tabbars">
            <span>{{item.title}}</span>
            <template slot="icon" slot-scope="props">
                <span :class="props.active ? item.active : item.normal" class="icon"></span>
            </template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    data() {
        return {
            active: 0,
            tabbars: [
                {
                    name: 'home',
                    path: '/',
                    title: '首页',
                    normal: 'icon-home',
                    active: 'icon-home-active'
                },
                {
                    name: 'category',
                    path: '/category',
                    title: '分类',
                    normal: 'icon-category',
                    active: 'icon-category-active'
                },
                {
                    name: 'cart',
                    path: '/cart',
                    title: '购物车',
                    normal: 'icon-cart',
                    active: 'icon-cart-active'
                },
                {
                    name: 'user',
                    path: '/user',
                    title: '我的',
                    normal: 'icon-user',
                    active: 'icon-user-active'
                }
            ]
        };
    },
    watch: {
        $route: {
            handler(newRoute) {
                this.setActive();
            },
            immediate: true
        }
    },
    methods: {
        setActive() {
            const tabbars = [...this.tabbars];
            const { name } = this.$route;
            const index = tabbars.findIndex(tab => tab.name === name);
            this.active = index;
        }
    }
};
</script>

<style lang="scss">
// https://youzan.github.io/vant/#/zh-CN/tabbar
.tabbar {
    background-color: #f7f7fa !important;
    &:before {
        content: ' ';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #c0bfc4;
        color: #c0bfc4;
        transform-origin: 0 0;
        transform: scaleY(0.5);
    }
    .van-tabbar-item__icon {
        margin-bottom: 2px;
    }
    .icon {
        width: 27px;
        height: 27px;
        display: inline-block;
        vertical-align: top;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &.icon-home {
            background-image: url(~@/assets/toolbar/home.png);
        }
        &.icon-home-active {
            background-image: url(~@/assets/toolbar/home@selected.png) !important;
        }
        &.icon-category {
            background-image: url(~@/assets/toolbar/category.png);
        }
        &.icon-category-active {
            background-image: url(~@/assets/toolbar/category@selected.png) !important;
        }
        &.icon-cart {
            background-image: url(~@/assets/toolbar/cart.png);
        }
        &.icon-cart-active {
            background-image: url(~@/assets/toolbar/cart@selected.png) !important;
        }
        &.icon-user {
            background-image: url(~@/assets/toolbar/my.png);
        }
        &.icon-user-active {
            background-image: url(~@/assets/toolbar/my@selected.png) !important;
        }
    }
}
</style>
