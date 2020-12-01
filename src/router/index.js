import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Catagory = () => import('views/catagory/Catagory')
const Home = () => import('views/home/Home')
const Shopcart = () => import('views/shopcart/Shopcart')
const Profile = () => import('views/profile/Profile')
const Details = () => import('views/detail/Details') 
const routes = [
    {
        path:'',
        redirect:'/home'
      },
      {
        path:'/home',
        component:Home
      },
      {
        path:'/catagory',
        component:Catagory
      },
      {
        path:'/shopcart',
        component:Shopcart
      },
      {
        path:'/profile',
        component:Profile
      },
      {
        path:'/detail/:id',
        component: Details
      }

]
const router = new VueRouter({
    routes,
    mode:'history'
})
export default router