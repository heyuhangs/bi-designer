const state = {
  navInfo: {
    title: '',
    icon: '',
    url: ''
  }
}

const mutations = {
  SET_NAVINFO: (state, navObj) => {
    state.navInfo = navObj
  }
}

const actions = {
  SET_NAVINFO({ commit }, navObj) {
    commit('SET_NAVINFO', navObj)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
