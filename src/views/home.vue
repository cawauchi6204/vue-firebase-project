<template>
  <div class="home">
    <h1>Home</h1>
    <img alt="Vue logo" src="../assets/logo.png" />
    <Home :lists="this.lists" />
    <Logout />
  </div>
</template>

<script>
import Home from '@/components/Home.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'home',
  data() {
    return {
      lists: [
        { id: 1, name: 'スタッフ一覧', url: '/staff' },
        { id: 2, name: 'タスク一覧', url: '/task' },
        { id: 3, name: 'ストレージ', url: '/storage' },
      ],
    }
  },
  components: {
    Home,
    Logout,
  },
}
</script>
