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
          <th>Mail</th>
          <td>
            <input type="text" v-model="formData.mail" />
          </td>
        </tr>
        <tr>
          <th>Age</th>
          <td>
            <input type="number" v-model="formData.age" />
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
  name: 'StaffAddForm',
  data() {
    return {
      db: null,
      people: null,
      formData: {
        name: null,
        mail: null,
        age: null,
        createdAt: null,
      },
    }
  },
  methods: {
    doAdd() {
      this.formData.createdAt = new Date()
      this.people
        .add(this.formData)
        .then(res => {
          alert(`Complete document add: ${res.id}`)
        })
        .catch(error => {
          alert(`Error document add: ${error}`)
        })
      this.$router.push({ name: 'staff' })
    },
    doCancel() {
      this.$router.push({ name: 'staff' })
    },
  },
  created() {
    this.db = firebase.firestore()
    this.people = this.db.collection('people')
  },
}
</script>
