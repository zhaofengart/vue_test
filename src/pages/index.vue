<template lang="html">
  <div class="container">
    <div>
      <blog-index-header></blog-index-header>
    </div>
    <div class="userMessage">
      <user-message></user-message>
    </div>

    <div class="contentMain">
      <div class="first">
        <category-tab></category-tab>
        <article-list :category-id="categoryId" :tag-id="tagId"></article-list>
      </div>
      <div class="secondary">
        <div class="hot-tags">
          <p slot="title">
            热门标签
          </p>
          <popular-tag-list></popular-tag-list>
        </div>
        <div class="hot-article">
          <p slot="title">
            热门文章
          </p>
          <popular-article-list></popular-article-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BlogIndexHeader from '../components/BlogIndexHeader'
import UserMessage from '../components/UserMessage'
import ArticleDetail from '../components/ArticleDetail'
import PopularTagList from '../components/PopularTagList'
import PopularArticleList from '../components/PopularArticleList'
import ArticleList from '../components/ArticleList'
import CategoryTab from '../components/CategoryTab'

export default {
  data () {
    return {
      categoryId: null,
      tagId: null
    }
  },
  created () {
    this.categoryId = this.$route.query.categoryId
    this.tagId = this.$route.query.tagId
  },
  components: {
    BlogIndexHeader,
    UserMessage,
    ArticleDetail,
    PopularTagList,
    PopularArticleList,
    ArticleList,
    CategoryTab
  },
  watch: {
    // 监听相同路由下参数变化的时候，从而实现异步刷新
    '$route' (to, from) {
      this.categoryId = this.$route.query.categoryId
      this.tagId = this.$route.query.tagId
    }
  }
}
</script>

<style type="text/css" scoped>
.container {
  width: 1500px;
}
.contentMain {
}
.userMessage {
}
p {
  font-size: 20px;
  text-align: left;
}
.first {
  width: 700px;
  margin: 0 30px;
  float: left;
}
.secondary {
  width: 300px;
  margin: 20px;
  float: left;
}
.hot-article {
  margin-top: 50px;
}
</style>
