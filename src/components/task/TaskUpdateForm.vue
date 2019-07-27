<template>
  <div class="task-update-form">
    <table style="border: solid #333 1px; margin: 10px auto 0;">
      <tbody>
        <tr>
          <th>Name</th>
          <td>
            <input type="text" v-model="formData.name" />
          </td>
        </tr>
        <tr>
          <th>Description</th>
          <td>
            <textarea rows="3" v-model="formData.description" />
          </td>
        </tr>
        <tr>
          <th>Done</th>
          <td>
            <input type="radio" id="false" value="false" v-model="formData.done" />
            <label for="false">False</label>
            <input type="radio" id="true" value="true" v-model="formData.done" />
            <label for="true">True</label>
          </td>
        </tr>
        <tr>
          <th></th>
          <td>
            <button @click="doUpdate()">Update</button>
            <button @click="doCancel()">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  name: 'TaskUpdateForm',
  data() {
    return {
      id: null,
      taskData: null,
      formData: {
        name: null,
        description: null,
        done: null,
      },
    }
  },
  methods: {
    doUpdate() {
      const funcUpdateTask = firebase.functions().httpsCallable('funcUpdateTask')
      this.formData.done = this.formData.done === 'true'
      funcUpdateTask({
        id: this.id,
        task: this.formData,
      })
        .then(res => {
          alert('Complete document Update')
        })
        .catch(error => {
          alert(`Error document Update: ${error}`)
        })
      this.$router.push({ name: 'task' })
    },
    doCancel() {
      this.$router.push({ name: 'task' })
    },
  },
  created() {
    // Firebaseからデータ取得
    this.id = this.$route.params.id
    const funcGetTask = firebase.functions().httpsCallable('funcGetTask')
    funcGetTask({
      id: this.id,
    })
      .then(res => {
        this.taskData = res.data
        if (this.taskData.status) {
          // 取得したデータをFormへ表示
          this.formData.name = this.taskData.name
          this.formData.description = this.taskData.description
          this.formData.done = this.taskData.done
        } else {
          alert('Not Found Document')
          this.$router.push({ name: 'task' })
        }
      })
      .catch(error => {
        console.log(`Error: ${error}`)
        this.$router.push({ name: 'task' })
      })
  },
}
</script>
