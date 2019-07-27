<template>
  <div class="storage01">
    <div v-for="(item, index) in items" :key="index" style="margin-bottom: 10px;">
      {{ item }}
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  name: 'Storage01',
  data() {
    return {
      storage: null,
      txtRef: null,
      items: [],
    }
  },
  created() {
    this.storage = firebase.storage()
    this.txtRef = this.storage.ref('upload/sample.txt')
    this.txtRef
      .getDownloadURL()
      .then(url => {
        console.log(url)
        const xhr = new XMLHttpRequest()
        xhr.responseType = 'text'
        xhr.onload = event => {
          const data = xhr.responseText
          const array = data.split('\r\n')
          for (const index in array) {
            this.items.push(array[index])
          }
          console.log(this.items)
        }
        xhr.open('GET', url)
        xhr.send()
      })
      .catch(error => {
        console.log(error)
      })
  },
}
</script>
