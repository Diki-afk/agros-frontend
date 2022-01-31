import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import alert from '@/store/alert'//import module alert 
import dialog from '@/store/dialog'//import module dialog
import auth from '@/store/auth'//import module auth
import users from '@/store/users'//import module auth
const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: localStorage
})
Vue.use(Vuex)



export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {//dklarasi module yang sudah diimport agar bisa digunakan
    alert,
    dialog,
    auth,
    users
  }
})