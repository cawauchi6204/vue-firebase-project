import Vue from 'vue'
import Router from 'vue-router'
import firebase from '@/plugins/firebase'
import Login from './views/auth/login.vue'
import Error from './views/auth/error.vue'
import Home from './views/home.vue'
import StaffIndex from './views/staff/index.vue'
import StaffAdd from './views/staff/add.vue'
import StaffUpdate from './views/staff/update.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/auth/login',
      name: 'auth/login',
      component: Login,
    },
    {
      path: '/auth/error',
      name: 'auth/error',
      component: Error,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/staff',
      name: 'staff',
      component: StaffIndex,
    },
    {
      path: '/staff/add',
      name: 'staff/add',
      component: StaffAdd,
    },
    {
      path: '/staff/update/:id',
      name: 'staff/update',
      component: StaffUpdate,
    },
  ],
})

router.beforeResolve((to, from, next) => {
  const funcLoginAuthentication = firebase.functions().httpsCallable('funcLoginAuthentication')

  funcLoginAuthentication()
    .then(res => {
      const user = res.data
      // Googleログインしている場合
      if (user.isLogin) {
        // xxxxx.comドメインの場合
        if (to.name === 'auth/login') {
          next({ name: 'home' })
        } else {
          next()
        }
      } else {
        // xxxxx.comドメイン以外の場合
        if (to.name === 'auth/error') {
          next()
        } else {
          next({ name: 'auth/error' })
        }
      }
    })
    .catch(() => {
      // Googleログインしていない場合
      if (to.name === 'auth/login') {
        next()
      } else {
        next({ name: 'auth/login' })
      }
    })
})

export default router
