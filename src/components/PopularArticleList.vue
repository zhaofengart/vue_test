<template>
  <div class="popularArticle">
    <div v-for="item in articleList" :key="item.articleId" >
      <router-link :to="{path: '/articleDetail', query: {articleId: item.articleId}}">
        <label>{{item.title}}</label><Divider/>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopularArticleList',
  data () {
    return {
      articleList: []
    }
  },
  created () {
    this.$http.post('/api/blog/getPopularArticle').then((data) => {
      if (data.body.code === 0) {
        this.articleList = data.body.data
        console.log(data.body.data)
      } else {
        console.log('获取热门文章失败')
      }
    })
  },
  methods: {
    searchByArticleId: function (articleId) {
      this.$router.push({path: '/articleDetail', query: {articleId: articleId}})
    }
  }
}
</script>

<style scoped>

</style>
