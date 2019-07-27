import Vue from 'vue'
import Router from 'vue-router'
import firebase from '@/plugins/firebase'
import Login from './views/auth/login.vue'
import Error from './views/auth/error.vue'
import Home from './views/home.vue'
import StaffIndex from './views/staff/index.vue'
import StaffAdd from './views/staff/add.vue'
import StaffUpdate from './views/staff/update.vue'
import TaskIndex from './views/task/index.vue'
import TaskAdd from './views/task/add.vue'
import TaskUpdate from './views/task/update.vue'
import StorageIndex from './views/storage/index.vue'
import Storage01 from './views/storage/storage01.vue'
import Storage02 from './views/storage/storage02.vue'
import Storage03 from './views/storage/storage03.vue'
import Storage04 from './views/storage/storage04.vue'
import Storage05 from './views/storage/storage05.vue'

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
    {
      path: '/task',
      name: 'task',
      component: TaskIndex,
    },
    {
      path: '/task/add',
      name: 'task/add',
      component: TaskAdd,
    },
    {
      path: '/task/update/:id',
      name: 'task/update',
      component: TaskUpdate,
    },
    {
      path: '/storage',
      name: 'storage',
      component: StorageIndex,
    },
    {
      path: '/storage/01',
      name: 'storage/01',
      component: Storage01,
    },
    {
      path: '/storage/02',
      name: 'storage/02',
      component: Storage02,
    },
    {
      path: '/storage/03',
      name: 'storage/03',
      component: Storage03,
    },
    {
      path: '/storage/04',
      name: 'storage/04',
      component: Storage04,
    },
    {
      path: '/storage/05',
      name: 'storage/05',
      component: Storage05,
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
