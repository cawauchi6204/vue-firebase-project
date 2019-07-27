<template>
  <div class="staff-update">
    <h1>Staff Update</h1>
    <StaffUpdateForm />
    <Logout />
  </div>
</template>

<script>
import StaffUpdateForm from '@/components/staff/StaffUpdateForm.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'staff-update-form',
  components: {
    StaffUpdateForm,
    Logout,
  },
}
</script>
