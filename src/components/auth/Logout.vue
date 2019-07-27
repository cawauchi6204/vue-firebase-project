<template>
  <div class="footer" style="margin-top: 50px;">
    <button @click="doLogout()">Logout</button>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  methods: {
    doLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('ログアウトしました。')
          this.$router.push({ name: 'auth/login' })
        })
        .catch(error => {
          alert(error)
        })
    },
  },
}
</script>
