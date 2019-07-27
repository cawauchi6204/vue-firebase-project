<template>
  <div class="error">
    <h1 style="color: tomato;">Error</h1>
    <p>指定したメールアドレスではログインできません。</p>
    <Logout />
  </div>
</template>

<script>
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'error',
  components: {
    Logout,
  },
}
</script>
