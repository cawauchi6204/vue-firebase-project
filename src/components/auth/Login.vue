<template>
  <div class="login">
    <button @click="doLogin()">Login</button>
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'Login',
  methods: {
    doLogin: () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      // Googleアカウントの選択を強制
      provider.setCustomParameters({ prompt: 'select_account consent' })
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then()
    },
  },
}
</script>
