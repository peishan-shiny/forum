import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  //state類似data()存放資料的地方
  state: {
    currentUser: {
      id: -1,
      name: "",
      email: "",
      image: "",
      isAdmin: false,
    },
    isAuthenticated: false,
    token: ''
  },
  //mutations裡面基本上是function，用來更改state資料的function
  //第2個參數 currentUser 是指下面actions裡commit('setCurrentUser'{})中大括號裡帶的資料
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    //登出需要移除localStorage的token，將state帶入
    revokeAuthentication(state) {
      //將state裡的currentUser變為空物件
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    // 在 actions 中可以透過參數的方式取得 commit 的方法
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()

        const { id, name, email, image, isAdmin } = data

        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })

        //當 token 是有效的情況下，這個函式會為傳 true，否則會回傳 false
        return true
      } catch (error) {
        console.error(error.message)
        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  },
  getters: {
  },
})
