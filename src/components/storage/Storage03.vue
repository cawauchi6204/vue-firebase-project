<template>
  <div class="storage03">
    <div style="margin-bottom: 20px;">ファイル名：<input type="text" v-model="formData.fname" /></div>
    <div style="margin-bottom: 20px;">内容：<textarea v-model="formData.text" cols="40" rows="5" /></div>
    <div style="margin-bottom: 20px;">キャッシュ：<input type="text" v-model="formData.cache_control" /></div>
    <div style="margin-bottom: 20px;">ファイルタイプ：<input type="text" v-model="formData.content_type" /></div>
    <div>
      <button @click="doUpload()">Upload</button>
    </div>
    <hr />
    <div style="margin-bottom: 20px;">
      <input type="text" v-model="formData.fname_del" />
    </div>
    <div>
      <button @click="doDelete()">Delete</button>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  name: 'Storage03',
  data() {
    return {
      storage: null,
      ref: null,
      formData: {
        fname: null,
        text: null,
        cache_control: 'max-age=300',
        content_type: 'text/plain',
        fname_del: null,
      },
    }
  },
  methods: {
    async doUpload() {
      this.ref = this.storage.ref(this.formData.fname)
      await this.ref
        .putString(this.formData.text)
        .then(snapshot => {
          console.log(snapshot)
          alert('Upload complete!')
        })
        .catch(error => {
          console.log(error)
        })
      const metaData = {
        cacheControl: this.formData.cache_control,
        contentType: this.formData.content_type,
      }
      await this.ref
        .updateMetadata(metaData)
        .then(res => {
          console.log(res)
          alert('Metadata complete')
        })
        .catch(error => {
          console.log(error)
        })
      this.ref = null
      this.formData.fname = null
      this.formData.text = null
      this.formData.cache_control = 'max-age=300'
      this.formData.content_type = 'text/plain'
    },
    doDelete() {
      this.ref = this.storage.ref(this.formData.fname_del)
      this.ref
        .delete()
        .then(() => {
          alert('Delete complete!')
          this.ref = null
          this.formData.fname_del = null
        })
        .catch(error => {
          alert(error)
        })
    },
  },
  created() {
    this.storage = firebase.storage()
  },
}
</script>
