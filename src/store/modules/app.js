export default {
  namespaced: true,
  state: {
    titel: 'title',
    loading: false
  },

  mutations: {
    UPDATE_TITLE (state, title) {
      state.titel = title
    },
    UPDATE_LOADING (state, flag) {
      state.loading = flag
    }
  },

  actions: {
    updateTitle ({ commit }, title) {
      commit('UPDATE_TITLE', title)
    },
    updateLoading ({ commit }, title) {
      commit('UPDATE_LOADING', title)
    }
  }
}
