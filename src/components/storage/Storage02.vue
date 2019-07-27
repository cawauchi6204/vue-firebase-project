<template>
  <div class="storage02">
    <img :src="img.url" :alt="img.alt" />
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  name: 'Storage02',
  data() {
    return {
      storage: null,
      imgRef: null,
      img: {
        url: null,
        alt: null,
      },
    }
  },
  created() {
    this.storage = firebase.storage()
    this.imgRef = this.storage.ref('image.jpg')
    this.imgRef
      .getDownloadURL()
      .then(url => {
        console.log(url)
        this.img.url = url
      })
      .catch(error => {
        console.log(error)
      })
  },
}
</script>
