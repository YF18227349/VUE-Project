import Vue from 'vue'
import Router from 'vue-router'
//移动端
import index from '../pages/index'
import home from '../pages/home'
import classify from '../pages/classify'
import cart from '../pages/cart'
import my from '../pages/my'
import details from '../pages/details'
import login from '../pages/login'
import register from '../pages/register'
import succeed from "../components/my/succeed"

//后台
import admin_index from "../pages/admin/admin_index"
import adminuser from "../pages/admin/adminuser"
import banners from "../pages/admin/banners"
import vip from "../pages/admin/vip"
import goods from "../pages/admin/goods"
import classification from "../pages/admin/classification"
import admin_login from "../pages/admin/admin_login"
import goodsChange from "../pages/admin/goodsChange"
import bannersChange from "../pages/admin/bannersChange"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect: "/index"
    },
    {
      path:"/index",
      redirect: "/index/home",
      component:index,
      children:[
        {
          path:"home",
          component:home
        },
        {
          path:"classify",
          component:classify,
        },
        {
          path:"cart",
          component:cart,
          beforeEnter(to,from,next){
            if(localStorage.getItem('id')){
              next()
            }else{
              next("/login")
            }
          }
        },
        {
          path:"my",
          component:my,
          children:[
            {
              path:"succeed",
              component:succeed
            }
          ]
        }
      ]
    },
    {
      path:"/details",
      component:details
    },
    {
      path:"/login",
      component:login
    },
    {
      path:"/register",
      component:register
    },
    {
      path:"/admin",
      component:admin_index,
      children:[
        {
          path:"adminuser",
          component:adminuser
        },
        {
          path:"banners",
          component:banners
        },
        {
          path:"classification",
          component:classification
        },
        {
          path:"vip",
          component:vip
        },
        {
          path:"goods",
          component:goods
        },
        {
          path:"goodsChange",
          component:goodsChange
        },
        {
          path:"bannersChange",
          component:bannersChange
        }
      ]
    },
    {
      path:"/admin_login",
      component:admin_login
    }
  ]
})
