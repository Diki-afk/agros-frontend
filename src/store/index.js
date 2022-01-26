import Vue from 'vue'
import Vuex from 'vuex'
import alert from '@/store/alert'//import module alert 
import dialog from '@/store/dialog'//import module dialog
import auth from '@/store/auth'//import module auth

Vue.use(Vuex)



export default new Vuex.Store({
  plugins: [],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {//dklarasi module yang sudah diimport agar bisa digunakan
    alert,
    dialog,
    auth
  }
})