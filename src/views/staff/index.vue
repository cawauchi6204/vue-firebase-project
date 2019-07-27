<template>
  <div class="staff-index">
    <h1>Staff</h1>
    <div style="margin-bottom: 30px;">
      <router-link to="/">Home</router-link>
    </div>
    <StaffLists />
    <Logout />
  </div>
</template>

<script>
import StaffLists from '@/components/staff/StaffLists.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'staff-index',
  components: {
    StaffLists,
    Logout,
  },
}
</script>
