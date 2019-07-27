<template>
  <div class="storage05">
    <div style="margin-bottom: 20px;">
      <input type="text" v-model="formData.name" placeholder="名前" />
    </div>
    <div style="margin-bottom: 20px;">
      <textarea v-model="formData.description" cols="50" rows="5" />
    </div>
    <div style="margin-bottom: 20px;">
      <input type="file" name="file" ref="file" @change="selectedFile" />
    </div>
    <div>
      <table style="border: solid #333 1px; margin: 30px auto 0;" v-if="formData.files.length">
        <thead>
          <tr>
            <th>Index</th>
            <th>ファイル名</th>
            <th>タイプ</th>
            <th>サイズ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in formData.files" :key="index">
            <td>{{ index }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.size }}</td>
            <td><button @click="doDelete(index)">Ｘ</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="margin-top: 30px;">
      <button @click="doUpload">Upload</button>
    </div>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import moment from 'moment'

export default {
  name: 'Storage05',
  data() {
    return {
      storage: null,
      db: null,
      ref: null,
      formData: {
        name: null,
        description: null,
        files: [],
      },
      files: [],
    }
  },
  methods: {
    // 選択されたファイルの情報を保存
    selectedFile(event) {
      event.preventDefault()
      this.formData.files.push({
        file: event.target.files[0],
        name: event.target.files[0].name,
        type: event.target.files[0].type,
        size: event.target.files[0].size,
      })
      // 選択したファイルをリセット
      this.$refs.file.type = 'text'
      this.$refs.file.type = 'file'
    },
    doDelete(index) {
      if (!confirm(`${this.formData.files[index].name} を削除します。よろしいですか？`)) {
        return
      }
      this.formData.files.splice(index, 1)
    },
    async doUpload(event) {
      const dir = moment().format('YYYYMMDDHHmmss')
      // Storageへファイルをアップロード
      await this.formData.files.forEach(async item => {
        // console.log(item.file)
        this.ref = this.storage.ref(`${dir}/${item.name}`)
        // ファイルをアップロード
        await this.ref
          .put(item.file)
          .then(snapshot => {
            console.log(snapshot)
          })
          .catch(error => {
            console.log(error)
          })
      })

      // Firestoreへデータを保存
      this.formData.files.forEach(item => {
        this.files.push({
          name: item.name,
          downloadUrl: `https://firebasestorage.googleapis.com/v0/b/vue-firebase-project-xxxxx.appspot.com/o/${encodeURIComponent(
            dir + '/' + item.name
          )}?alt=media`,
        })
      })
      this.db.collection('storage').add({
        user: firebase.auth().currentUser.displayName,
        name: this.formData.name,
        description: this.formData.description,
        files: this.files,
      })

      alert('Upload complete')
      this.formData.name = null
      this.formData.description = null
      this.formData.files = []
    },
  },
  created() {
    this.storage = firebase.storage()
    this.db = firebase.firestore()
    console.log(firebase.auth().currentUser)
  },
}
</script>
