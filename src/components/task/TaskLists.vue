<template>
  <div class="task-lists">
    <button @click="doAdd()">Add</button>
    <table style="border: solid #333 1px; margin: 30px auto 0;">
      <thead>
        <tr>
          <th>Index</th>
          <th>id</th>
          <th>name</th>
          <th>description</th>
          <th>done</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <td>{{ index }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.done }}</td>
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

export default {
  name: 'TaskLists',
  data() {
    return {
      items: [],
    }
  },
  methods: {
    doAdd() {
      this.$router.push({ name: 'task/add' })
    },
    doUpdate(modId) {
      this.$router.push({ name: 'task/update', params: { id: modId } })
    },
    async doDelete(delId) {
      if (!confirm('削除してよろしいですか？')) {
        return
      }
      const funcDeleteTask = firebase.functions().httpsCallable('funcDeleteTask')
      await funcDeleteTask({
        id: delId,
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })

      // データ取得
      const funcGetTaskLists = firebase.functions().httpsCallable('funcGetTaskLists')
      await funcGetTaskLists()
        .then(res => {
          this.items = res.data.items
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  created() {
    // データ取得
    const funcGetTaskLists = firebase.functions().httpsCallable('funcGetTaskLists')
    funcGetTaskLists()
      .then(res => {
        this.items = res.data.items
      })
      .catch(err => {
        console.log(err)
      })
  },
}
</script>
