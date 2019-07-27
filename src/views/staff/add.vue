<template>
  <div class="staff-add">
    <h1>Staff Add</h1>
    <StaffAddForm />
    <Logout />
  </div>
</template>

<script>
import StaffAddForm from '@/components/staff/StaffAddForm.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'staff-add-form',
  components: {
    StaffAddForm,
    Logout,
  },
}
</script>
