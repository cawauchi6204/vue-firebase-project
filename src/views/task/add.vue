<template>
  <div class="task-add">
    <h1>Task Add</h1>
    <TaskAddForm />
    <Logout />
  </div>
</template>

<script>
import TaskAddForm from '@/components/task/TaskAddForm.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'staff-add-form',
  components: {
    TaskAddForm,
    Logout,
  },
}
</script>
