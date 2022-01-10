import storage from '@/utils/storage'

const getDefaultState = () => {
  return {
    token: storage.load('jwt') || '',
    info: storage.load('info') || null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.info = info
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { token, info } = userInfo
    commit('SET_TOKEN', token)
    storage.save('jwt', token)
    commit('SET_INFO', info)
    storage.save('info', info)
  },

  // user logout
  logout({ commit }) {
    commit('SET_TOKEN', '')
    storage.save('jwt', '')
    storage.save('info', null)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
