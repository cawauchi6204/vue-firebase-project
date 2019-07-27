<template>
  <div class="storage04">
    <h1>Storage04</h1>
    <div style="margin-bottom: 30px;">
      <router-link to="/">Home</router-link>
    </div>
    <Storage04 />
    <Logout />
  </div>
</template>

<script>
import Storage04 from '@/components/storage/Storage04.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'storage04',
  components: {
    Logout,
    Storage04,
  },
}
</script>
