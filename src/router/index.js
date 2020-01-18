import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/home.vue'


Vue.use(VueRouter)

const routes = [
  
]

const router = new VueRouter({
  routes:[
	  {path:'/',redirect:'/login'},
	  {path:'/login',component:Login},
	  {path:'/home',component:Home}
	  
  ]
})

export default router
