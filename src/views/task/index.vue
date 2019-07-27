<template>
  <div class="task-index">
    <h1>Task</h1>
    <div style="margin-bottom: 30px;">
      <router-link to="/">Home</router-link>
    </div>
    <TaskLists />
    <Logout />
  </div>
</template>

<script>
import TaskLists from '@/components/task/TaskLists.vue'
import Logout from '@/components/auth/Logout.vue'

export default {
  name: 'task-index',
  components: {
    TaskLists,
    Logout,
  },
}
</script>
