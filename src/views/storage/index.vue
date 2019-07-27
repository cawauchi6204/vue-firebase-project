<template>
  <div class="storage-index">
    <h1>Storage</h1>
    <div style="margin-bottom: 30px;">
      <div style="margin-bottom: 20px;"><router-link to="/">Home</router-link></div>
      <div style="margin-bottom: 20px;"><router-link to="/storage/01">Storage01</router-link></div>
      <div style="margin-bottom: 20px;"><router-link to="/storage/02">Storage02</router-link></div>
      <div style="margin-bottom: 20px;"><router-link to="/storage/03">Storage03</router-link></div>
      <div style="margin-bottom: 20px;"><router-link to="/storage/04">Storage04</router-link></div>
      <div style="margin-bottom: 20px;"><router-link to="/storage/05">Storage05</router-link></div>
    </div>
    <Logout />
  </div>
</template>

<script>
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'storage-index',
  components: {
    Logout,
  },
}
</script>
