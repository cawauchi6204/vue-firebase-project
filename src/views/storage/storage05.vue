<template>
  <div class="storage05">
    <h1>Storage05</h1>
    <div style="margin-bottom: 30px;">
      <router-link to="/">Home</router-link>
    </div>
    <Storage05 />
    <Logout />
  </div>
</template>

<script>
import Storage05 from '@/components/storage/Storage05.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'storage05',
  components: {
    Logout,
    Storage05,
  },
}
</script>
