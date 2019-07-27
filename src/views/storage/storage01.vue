<template>
  <div class="storage01">
    <h1>Storage01</h1>
    <div style="margin-bottom: 30px;">
      <router-link to="/">Home</router-link>
    </div>
    <Storage01 />
    <Logout />
  </div>
</template>

<script>
import Storage01 from '@/components/storage/Storage01.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'storage01',
  components: {
    Logout,
    Storage01,
  },
}
</script>
