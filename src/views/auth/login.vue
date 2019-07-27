<template>
  <div class="login">
    <h1>Login</h1>
    <img alt="Vue logo" src="../../assets/logo.png" />
    <Login />
  </div>
</template>

<script>
import Login from '@/components/auth/Login.vue'

export default {
  name: 'login',
  components: {
    Login,
  },
}
</script>
