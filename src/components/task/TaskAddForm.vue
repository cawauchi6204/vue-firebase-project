<template>
  <div class="staff-add-form">
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
            <button @click="doAdd()">Add</button>
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
  name: 'TaskAddForm',
  data() {
    return {
      formData: {
        name: null,
        description: null,
        done: null,
      },
    }
  },
  methods: {
    doAdd() {
      const funcAddTask = firebase.functions().httpsCallable('funcAddTask')
      this.formData.done = this.formData.done === 'true'
      funcAddTask({
        task: this.formData,
      })
        .then(res => {
          alert(`Complete document add: ${res.id}`)
          console.log(res)
        })
        .catch(error => {
          alert(`Error document add: ${error}`)
        })
      this.$router.push({ name: 'task' })
    },
    doCancel() {
      this.$router.push({ name: 'task' })
    },
  },
  created() {
    this.db = firebase.firestore()
    this.people = this.db.collection('people')
  },
}
</script>
