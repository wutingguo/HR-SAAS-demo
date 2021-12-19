import { reqGetProfile, reqLogin } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
// import { reject, resolve } from 'core-js/fn/promise'
const state = {
  token: getToken() || '',
  userInfo: {}
}
const mutations = {
  setToken(state, newtoken) {
    state.token = newtoken
    setToken(newtoken)
  },
  setProfile(state, newInfo) {
    state.userInfo = newInfo
  }
}
const actions = {
  getToken(context, data) {
    return new Promise((resolve, reject) => {
      reqLogin(data).then((res) => {
        // console.log(res, 957)
        context.commit('setToken', res.data)
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  getProfile(context) {
    return new Promise((resolve, reject) => {
      reqGetProfile().then((res) => {
        // console.log(res)
        context.commit('setProfile', res.data)
        resolve(res)
      }).catch(() => {
        reject()
      })
    })
  }
}
const getters = {}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
