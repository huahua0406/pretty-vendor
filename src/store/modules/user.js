export default {
    namespaced: true,
    state: {
        userInfo: {},
        addressInfo: {}
    },

    mutations: {
        UPDATE_USERINFO(state, user) {
            state.userInfo = user;
        }
    },

    actions: {
        updateUserInfo(context, user) {
            context.commit('UPDATE_USERINFO', user);
        }
    }
};
