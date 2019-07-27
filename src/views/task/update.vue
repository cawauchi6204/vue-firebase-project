<template>
  <div class="task-update">
    <h1>Task Update</h1>
    <TaskUpdateForm />
    <Logout />
  </div>
</template>

<script>
import TaskUpdateForm from '@/components/task/TaskUpdateForm.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'staff-update-form',
  components: {
    TaskUpdateForm,
    Logout,
  },
}
</script>
