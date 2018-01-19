import Vue from 'vue'
import Router from 'vue-router'
import store from './../store'

const Login = r => require.ensure([], () => r(require('@/pages/login/login')), 'login')
const Page = r => require.ensure([], () => r(require('@/pages/page/page')), 'page')
const Home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const Theme = r => require.ensure([], () => r(require('@/pages/theme/theme')), 'theme')
const Category = r => require.ensure([], () => r(require('@/pages/category/category')), 'category')
const Detail = r => require.ensure([], () => r(require('@/pages/detail/detail')), 'detail')
const Cart = r => require.ensure([], () => r(require('@/pages/cart/cart')), 'cart')
const Order = r => require.ensure([], () => r(require('@/pages/order/order')), 'order')
const Address = r => require.ensure([], () => r(require('@/pages/address/address')), 'address')
const User = r => require.ensure([], () => r(require('@/pages/user/user')), 'user')
const About = r => require.ensure([], () => r(require('@/pages/about/about')), 'about')

Vue.use(Router)

const routes = [
    {
        path: '/',
        redirect: '/page'
    },
    {
        path: '/page',
        component: Page,
        children: [
            {
                path: '',
                redirect: '/page/home'
            },
            {
                path: 'home',
                name: 'home',
                meta: {
                    title: '零食商贩'
                },
                component: Home
            },
            {
                path: 'theme',
                name: 'theme',
                meta: {
                    title: '主题'
                },
                component: Theme
            },
            {
                path: 'category',
                name: 'category',
                meta: {
                    title: '分类'
                },
                component: Category
            },
            {
                path: 'detail',
                name: 'detail',
                meta: {
                    title: '商品详情'
                },
                component: Detail
            },
            {
                path: 'cart',
                name: 'cart',
                meta: {
                    title: '购物车',
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
                component: Cart
            },
            {
                path: 'order',
                name: 'order',
                meta: {
                    title: '订单',
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
                component: Order
            },
            {
                path: 'address',
                name: 'address',
                meta: {
                    title: '地址',
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
                component: Address
            },
            {
                path: 'user',
                name: 'user',
                meta: {
                    title: '我的',
                    requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
                },
                component: User
            },
            {
                path: 'about',
                name: 'about',
                meta: {
                    title: '关于'
                },
                component: About
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    { path: '*', component: Home }
]

const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    // 设置标题
    document.title = to.meta.title
    store.commit('UPDATE_TITLE', to.meta.title)
    // loading
    store.commit('UPDATE_LOADING', true)
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (localStorage.token) {
            next()
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

router.afterEach(function(to) {
    setTimeout(() => {
        store.commit('UPDATE_LOADING', false)
    }, 300)
})

export default router
