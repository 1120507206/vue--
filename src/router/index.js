import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'


Vue.use(VueRouter)

const routes = [
  
]

const router = new VueRouter({
  routes:[
	  {path:'/',redirect:'/login'},
	  {path:'/login',component:Login},
	  {path:'/home',
	  component:Home ,
	  redirect:'/welcome',
	  children:[
		  {path:'/welcome',component:Welcome, },
		  {path:'/users',component:Users},
	  ]}
	  
  ]
})
//挂在路由导航守卫
router.beforeEach((to,from,next)=>{
	//to: Route: 即将要进入的目标 路由对象

//from: Route: 当前导航正要离开的路由
//next是一个函数,表示放行,next() 放行 next('/login')强制跳转
if (to.path === '/login') return next()
const tokenStr = window.sessionStorage.getItem('token')
if (!tokenStr) return next('/login')
next()
})

export default router
