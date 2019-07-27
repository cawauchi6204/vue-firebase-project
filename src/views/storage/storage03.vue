<template>
  <div class="storage03">
    <h1>Storage03</h1>
    <div style="margin-bottom: 30px;">
      <router-link to="/">Home</router-link>
    </div>
    <Storage03 />
    <Logout />
  </div>
</template>

<script>
import Storage03 from '@/components/storage/Storage03.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'storage03',
  components: {
    Logout,
    Storage03,
  },
}
</script>
