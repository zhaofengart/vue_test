<template>
  <div class="header">
    <router-link to="/">首页</router-link>
    <router-link to="/articlePublish">文章发布</router-link>
  </div>
</template>

<script>
export default {
  name: 'BlogIndexHeader'
}
</script>

<style scoped>
.header {
  width: 100%;
  text-align: center;
}
</style>
