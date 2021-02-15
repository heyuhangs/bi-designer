const state = {
  status: false
}

const mutations = {
  SET_STATUS: (state, status) => {
    state.status = status
  }
}

const actions = {
  SET_STATUS({ commit }, status) {
    commit('SET_STATUS', status)
  }
}

export default {
  state,
  mutations,
  actions
}
