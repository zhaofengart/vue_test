<template>
  <div class="popularTag">
    <router-link :to="{path: '/', query: {tagId: item.tagId}}" v-for="item in tagList" :key="item.tagId" style="text-decoration: underline" >{{item.tagName}}  </router-link>
  </div>
</template>

<script>
export default {
  name: 'PopularTagList',
  data () {
    return {
      tagList: []
    }
  },
  created () {
    this.$http.post('/api/blog/tag/getPopularTag').then((data) => {
      if (data.body.code === 0) {
        this.tagList = data.body.data
        console.log(data.body.data)
      } else {
        console.log('获取热门标签失败')
      }
    })
  },
  methods: {
    searchByTagId: function (tagId) {
      alert(tagId)
    }
  }
}
</script>

<style scoped>

</style>
