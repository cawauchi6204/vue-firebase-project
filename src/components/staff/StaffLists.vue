<template>
  <div class="staff-lists">
    <div>
      <button @click="doAdd()">Add</button>
    </div>
    <table style="border: solid #333 1px; margin: 30px auto 0;">
      <thead>
        <tr>
          <th>Index</th>
          <th>id</th>
          <th>name</th>
          <th>mail</th>
          <th>age</th>
          <th>createdAt</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <td>{{ index }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.mail }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.createdAt | format }}</td>
          <td>
            <button @click="doUpdate(item.id)">Update</button>
            <button @click="doDelete(item.id)">delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'
import moment from 'moment'

export default {
  name: 'StaffLists',
  data() {
    return {
      db: null,
      items: [],
    }
  },
  methods: {
    doAdd() {
      this.$router.push({ name: 'staff/add' })
    },
    doUpdate(modId) {
      this.$router.push({ name: 'staff/update', params: { id: modId } })
    },
    doDelete(delId) {
      if (!confirm('削除してよろしいですか？')) {
        return
      }
      this.db
        .collection('people')
        .doc(delId)
        .delete()
    },
  },
  created() {
    this.db = firebase.firestore()
    this.db
      .collection('people')
      // .orderBy('age')
      .orderBy('age', 'desc')
      .onSnapshot(querySnapshot => {
        this.items = [] // 取得結果を初期化
        querySnapshot.forEach(doc => {
          // console.log(doc.id) // 自動ID
          // console.log(doc.data()) // 各フィールド
          // ドキュメントの自動ID、各フィールドを連結して配列へ追加
          this.items.push(Object.assign({ id: doc.id }, doc.data()))
        })
      })
  },
  filters: {
    // 日付書式指定
    format: data => {
      return moment(data.toDate()).format('YYYY-MM-DD HH:mm:ss')
    },
  },
}
</script>
