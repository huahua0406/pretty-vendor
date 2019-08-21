export default {
    namespaced: true,
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
        addressInfo: {}
    },

    mutations: {
        UPDATE_USERINFO(state, user) {
            state.userInfo = user;
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        }
    },

    actions: {
        updateUserInfo(context, user) {
            context.commit('UPDATE_USERINFO', user);
        }
    }
};
