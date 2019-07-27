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
  name: 'StaffUpdateForm',
  data() {
    return {
      db: null,
      people: null,
      id: null,
      peopleData: null,
      formData: {
        name: null,
        mail: null,
        age: null,
        createdAt: null,
      },
    }
  },
  methods: {
    doUpdate() {
      this.formData.createdAt = new Date()
      this.people
        .doc(this.id)
        .set(this.formData)
        .then(() => {
          alert('Complete document Update')
        })
        .catch(error => {
          alert(`Error document Update: ${error}`)
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

    // Firebaseからデータ取得
    this.id = this.$route.params.id
    this.people
      .doc(this.id)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.peopleData = doc.data()

          // 取得したデータをFormへ表示
          this.formData.name = this.peopleData.name
          this.formData.mail = this.peopleData.mail
          this.formData.age = this.peopleData.age
        } else {
          alert('Not Found Document')
          this.$router.push({ name: 'staff' })
        }
      })
      .catch(error => {
        console.log(`Error: ${error}`)
        this.$router.push({ name: 'staff' })
      })
  },
}
</script>
