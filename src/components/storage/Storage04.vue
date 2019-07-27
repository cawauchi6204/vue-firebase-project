<template>
  <div class="storage04">
    <div style="margin-bottom: 20px;">
      <input type="text" v-model="formData.fname" />
    </div>
    <div>
      <button @click="getMetadata()">Metadata</button>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  name: 'Storage04',
  data() {
    return {
      storage: null,
      ref: null,
      formData: {
        fname: null,
      },
    }
  },
  methods: {
    getMetadata() {
      this.ref = this.storage.ref(this.formData.fname)
      this.ref
        .getMetadata()
        .then(metadata => {
          console.log(metadata)
          alert('Get metadata')
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
  created() {
    this.storage = firebase.storage()
  },
}
</script>
