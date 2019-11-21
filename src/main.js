// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';

import echarts from "echarts"
Vue.prototype.$echarts = echarts

Vue.use(Vant);
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false

var arrs = ['/admin',"/admin/adminuser","/admin/classification","/admin/banners","/admin/goods","/admin/vip"]
router.beforeEach((to, from, next) => {
  if (arrs.indexOf(to.path) != -1) {
    if (sessionStorage.getItem('adminuser')) {
      next()
    } else {
      next('/admin_login')
    }
  } else {
    next()
  }
})

// var arr = ['/index/cart', '/index/my']
// var reg = /^\/admin/
// router.beforeEach((to, from, next) => {
//     if (arr.indexOf(to.path) != -1) {
//         if (localStorage.getItem('id')) {
//           next()
//         } else {
//           next('/login')
//         }
//     } else {
//       console.log('else')
//       if (reg.test(to.path)) {
//         console.log('pc端')
//         // 说明访问pc端
//         if (localStorage.getItem('uname')) {
//           next()
//         } else {
//           next('/adLogin')
//         }
//       } else {
//         next()
//       }
//     }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
