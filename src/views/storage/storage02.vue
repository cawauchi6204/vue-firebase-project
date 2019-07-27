<template>
  <div class="storage02">
    <h1>Storage02</h1>
    <div style="margin-bottom: 30px;">
      <router-link to="/">Home</router-link>
    </div>
    <Storage02 />
    <Logout />
  </div>
</template>

<script>
import Storage02 from '@/components/storage/Storage02.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'storage02',
  components: {
    Logout,
    Storage02,
  },
}
</script>
