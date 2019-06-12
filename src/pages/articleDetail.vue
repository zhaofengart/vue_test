<template lang="html">
  <div class="articleDetail">
    <div>
      <blog-index-header></blog-index-header>
    </div>
    <div class="userMessage">
      <user-message></user-message>
    </div>
    <div class="contentMain">
      <Row>
        <i-col span="15">
          <Card>
            <article-detail :article-id="articleId"></article-detail>
          </Card>
        </i-col>
        <i-col span="5" offset="1">
          <Card>
            <p slot="title">
              热门标签
            </p>
            <popular-tag-list></popular-tag-list>
          </Card>
          <Card style="margin-top: 20px">
            <p slot="title">
              热门文章
            </p>
            <popular-article-list></popular-article-list>
          </Card>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
import BlogIndexHeader from '../components/BlogIndexHeader'
import UserMessage from '../components/UserMessage'
import ArticleDetail from '../components/ArticleDetail'
import PopularTagList from '../components/PopularTagList'
import PopularArticleList from '../components/PopularArticleList'

export default {
  data () {
    return {
      articleId: ''
    }
  },
  components: {
    BlogIndexHeader,
    UserMessage,
    ArticleDetail,
    PopularTagList,
    PopularArticleList
  },
  created () {
    this.articleId = this.$route.query.articleId
    console.log(this.articleId)
  },
  watch: {
    // 监听相同路由下参数变化的时候，从而实现异步刷新
    '$route' (to, from) {
      this.articleId = this.$route.query.articleId
    }
  }
}
</script>

<style type="text/css" media="screen">
  .articleDetail {
    width: 100%;
    margin: 0 auto;
  }
  .contentMain {
    margin: 25px;
  }
  .userMessage {
    margin-top: 0px;
    margin-left: 0px;
  }
  p {
    font-size: 20px;
    text-align: left;
  }

</style>
