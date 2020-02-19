import axios from '~/plugins/axios'

export const state = () => {
  return {
    data: null
  }
}

export const mutations = {
  SET_USER (state, data) {
    state.data = data || null
  }
}

export const getters = {
  data (state) {
    return state.data
  }
}

export const actions = {
  async login ({ commit }, { email, password }) {
    const params = {
      email,
      password
    }
    try {
      const res = await axios.post('/auth/login', params)

      // accessToken, refreshToken 제거
      delete res.data.accessToken
      delete res.data.refreshToken

      commit('SET_USER', res.data)
    } catch (error) {
      commit('SET_USER', null)
    }
  }
}
