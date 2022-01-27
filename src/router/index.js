import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',//mendaftarkan view home pada vue-router
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  routes
})

export default router