export default {
  namespaced: true,
  state: {
    userInfo: {},
    addrInfo: {}
  },

  mutations: { // 同步方法代替构造器
    UPDATE_USERINFO (state, user) {
      state.userInfo = user
    }
  },

  actions: {
    updateUserInfo (context, user) {
      context.commit('UPDATE_USERINFO', user)
    }
  }
}
