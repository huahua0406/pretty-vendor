import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home/Home.vue'; // 首页不使用异步路由 影响首屏渲染

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/Login')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/login/Register')
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting  => 路由级代码拆分
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '@/views/user/About.vue')
    },
    {
        path: '/category',
        name: 'category',
        component: () => import('@/views/category/Category')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/cart/Cart')
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/User')
    },
    {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/detail/Detail')
    },
    {
        path: '/theme',
        name: 'theme',
        component: () => import('@/views/theme/Theme')
    },
    {
        path: '/address',
        name: 'address',
        component: () => import('@/views/user/Address')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/user/Profile')
    },
    {
        path: '/404',
        component: () => import('@/views/error/NotFound')
    },
    {
        path: '*',
        redirect: '/404'
    }
];

const router = new Router({
    routes
});

// router.beforeEach((to, from, next) => {
//     // 设置标题
//     document.title = to.meta.title
//     store.commit('UPDATE_TITLE', to.meta.title)
//     // loading
//     store.commit('UPDATE_LOADING', true)
//     if (to.matched.some(r => r.meta.requireAuth)) {
//         let token = window.localStorage.getItem('token')
//         if (token) {
//             next()
//         } else {
//             next({
//                 path: '/login',
//                 query: { redirect: to.fullPath }
//             })
//         }
//     } else {
//         next()
//     }
// })

export default router;
