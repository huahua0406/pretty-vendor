import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import cart from './modules/cart';
import getters from './getters';

// 开发模式下使用日志，和谷歌浏览器里面的vuedevtool插件类似
// 修改state的时候会在控制台打印一些信息
import createLogger from 'vuex/dist/logger';

// 开发模式开启严格模式，要使用mutations提交
const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        cart
    },
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});

export default store;
