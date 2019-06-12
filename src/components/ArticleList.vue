<template>
  <div>
    <div class="entry_article" v-for="item in articleList" :key="item.articleId">
      <div class="entry_pic">
        <router-link :to="{path: '/articleDetail', query: {articleId: item.articleId}}">
        <img :src="item.imgPath"/>
        </router-link>
      </div>
      <div class="entry_txt">
        <router-link :to="{path: '/articleDetail', query: {articleId: item.articleId}}">
          <h2 class="title">{{item.title}}</h2>
        </router-link>

        <div class="content" v-html="item.summary"></div>
          <Icon type="ios-contact"/>{{item.realname}} {{item.issueTime}}
          <Icon type="ios-pricetag" />
          <router-link :to="{path: '/', query: {tagId: tag.tagId}}" v-for="tag in item.tagList" :key="tag.tagId" >
            <label>{{tag.tagName}}</label>  </router-link>
      </div>
    </div>
    <div>
      <Page :total="totalNumOfArticle" :current="currentPageNum" @on-change="turnPage"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: ['categoryId', 'tagId'],
  data () {
    return {
      articleList: [],
      totalNumOfArticle: 1,
      currentPageNum: 1
    }
  },
  created () {
    this.init()
  },
  methods: {
    init: function () {
      console.log(this.categoryId)
      console.log(this.tagId)

      if (this.categoryId != null) {
        let params = new URLSearchParams()
        params.append('categoryId', this.categoryId)
        let url = 'http://10.161.10.144:8080/blog/category/'

        this.getArticle(url, params)
      } else if (this.tagId != null) {
        let params = new URLSearchParams()
        params.append('tagId', this.tagId)
        let url = 'http://10.161.10.144:8080/blog/tag/'

        this.getArticle(url, params)
      } else {
        let url = 'http://10.161.10.144:8080/blog/'

        this.getArticle(url, null)
      }

      this.getNumOfArticle()
    },
    getArticle: function (url, params) {
      this.$ajax({
        method: 'post',
        url: url,
        data: params
      }).then(response => {
        if (response.data.code === 0) {
          this.articleList = response.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getNumOfArticle: function () {
      let params = new URLSearchParams()
      if (this.categoryId) {
        params.append('categoryId', this.categoryId)
      }
      if (this.tagId) {
        params.append('tagId', this.tagId)
      }

      this.$ajax({
        method: 'post',
        url: 'http://10.161.10.144:8080/blog/getTotalNumOfArticle',
        data: params
      }).then(response => {
        if (response.data.code === 0) {
          console.log(response.data.data)
          this.totalNumOfArticle = response.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    turnPage: function (value) {
      this.currentPageNum = value
      let params = new URLSearchParams()
      let url = ''
      if (this.categoryId) {
        params.append('categoryId', this.categoryId)
        params.append('pageNo', this.currentPageNum)
        url = 'http://10.161.10.144:8080/blog/category/'
      } else if (this.tagId) {
        params.append('tagId', this.tagId)
        params.append('pageNo', this.currentPageNum)
        url = 'http://10.161.10.144:8080/blog/category/'
      }

      this.$ajax.post(url, params)
        .then((response) => {
          this.articleList = response.data.data
          console.log(this.currentPageNum)
          console.log(this.articleList)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  watch: {
    // 监听相同路由下参数变化的时候，从而实现异步刷新
    '$route' (to, from) {
      this.init()
    }
  }
}
</script>

<style scoped>
  .title {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .content {
    height: 100%;
  }
  .entry_article {
    width: 100%;
    float: left;
  }
  .entry_pic {
    width: 200px;
    height: 120px;
    margin: 0 20px;
  }
  .entry_txt {
    margin: 0 20px;
  }
</style>
