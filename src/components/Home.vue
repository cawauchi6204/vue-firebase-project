<template>
  <div class="home">
    <div v-for="item in lists" :key="item.id" style="margin-top: 20px; margin-bottom: 20px;">
      <router-link :to="item.url">
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  props: ['lists'],
}
</script>
