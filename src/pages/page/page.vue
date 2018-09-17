<template>
    <div class="page-view">
        <div v-transfer-dom>
            <actionsheet :menus="menus"
                         v-model="showMenu"
                         show-cancel
                         @on-click-menu="onSelectMenu"></actionsheet>
        </div>
        <view-box ref="viewBox"
                  body-padding-top="46px"
                  :body-padding-bottom="isPaddingBottom">
            <x-header slot="header"
                      :left-options="leftOptions"
                      :right-options="rightOptions"
                      :title="title"
                      @on-click-more="onClickMore"
                      style="width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header>

            <keep-alive>
                <router-view class="router-view" />
            </keep-alive>

            <tabbar slot="bottom"
                    v-if="!isShowTabbar">
                <tabbar-item link="/page/home"
                             :selected="$route.path === '/page/home'">
                    <span class="icon icon-home"
                          slot="icon"></span>
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item link="/page/category"
                             :selected="$route.path === '/page/category'">
                    <span class="icon icon-category"
                          slot="icon"></span>
                    <span slot="label">分类</span>
                </tabbar-item>
                <tabbar-item link="/page/cart"
                             :selected="$route.path === '/page/cart'">
                    <span class="icon icon-cart"
                          slot="icon"></span>
                    <span slot="label">购物车</span>
                </tabbar-item>
                <tabbar-item link="/page/user"
                             :selected="$route.path === '/page/user'">
                    <span class="icon icon-user"
                          slot="icon"></span>
                    <span slot="label">我的</span>
                </tabbar-item>
            </tabbar>
        </view-box>
    </div>
</template>

<script>
import {
    Tabbar,
    TabbarItem,
    ViewBox,
    XHeader,
    Actionsheet,
    TransferDom
} from 'vux'
import { mapState } from 'vuex'
export default {
    name: 'page',
    directives: {
        TransferDom
    },
    data() {
        return {
            showMenu: false,
            menus: {
                menu1: '关于 Pretty Vendor ',
                menu2: '退出登录'
            }
        }
    },
    created() {},
    computed: {
        ...mapState(['title']),
        leftOptions() {
            return {
                showBack: this.$route.path !== '/page/home'
            }
        },
        rightOptions() {
            return {
                showMore: true
            }
        },
        isShowTabbar() {
            if (/detail|theme|order|address|about/.test(this.$route.path)) {
                return true
            }
            return false
        },
        isPaddingBottom() {
            if (/detail|theme|order|address|about/.test(this.$route.path)) {
                return '0'
            }
            return '53px'
        }
    },
    methods: {
        onClickMore() {
            this.showMenu = true
        },
        onSelectMenu(key, item) {
            if (key === 'menu1') {
                this.$router.push({ path: '/page/about' })
            } else if (key === 'menu2') {
                this.$router.push({ path: '/login' })
            }
        }
    },
    components: {
        Tabbar,
        TabbarItem,
        ViewBox,
        XHeader,
        Actionsheet,
        TransferDom
    }
}
</script>

<style scoped lang="less">
.page-view {
    height: 100%;
    .weui-tabbar__item {
        .icon {
            width: 27px;
            height: 27px;
            display: inline-block;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            &.icon-home {
                background-image: url(~@/assets/toolbar/home.png);
            }
            &.icon-category {
                background-image: url(~@/assets/toolbar/category.png);
            }
            &.icon-cart {
                background-image: url(~@/assets/toolbar/cart.png);
            }
            &.icon-user {
                background-image: url(~@/assets/toolbar/my.png);
            }
        }
        &.weui-bar__item_on {
            .icon {
                &.icon-home {
                    background-image: url(~@/assets/toolbar/home@selected.png) !important;
                }
                &.icon-category {
                    background-image: url(~@/assets/toolbar/category@selected.png) !important;
                }
                &.icon-cart {
                    background-image: url(~@/assets/toolbar/cart@selected.png) !important;
                }
                &.icon-user {
                    background-image: url(~@/assets/toolbar/my@selected.png) !important;
                }
            }
        }
    }
}
</style>
