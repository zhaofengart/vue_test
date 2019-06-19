<template>
  <div>
    <div class="entry_article" v-for="item in articleList" :key="item.articleId">
      <div class="entry_pic">
        <router-link :to="{path: '/articleDetail', query: {articleId: item.articleId}}">
        <img :src="item.imgPath" style="width: 200px; height: 100px;"/>
        </router-link>
      </div>
      <div class="entry_txt">
        <router-link :to="{path: '/articleDetail', query: {articleId: item.articleId}}">
          <h2 class="hd">{{item.title}}</h2>
        </router-link>

        <div class="bd" v-html="item.summary"></div>
        <div class="ft">
          <Icon type="ios-contact"/>{{item.realname}} {{item.issueTime}}
          <div class="tag">
            <Icon type="ios-pricetag" />
            <router-link :to="{path: '/', query: {tagId: tag.tagId}}" v-for="tag in item.tagList" :key="tag.tagId" >
              <label >{{tag.tagName}}</label>  </router-link>
          </div>
        </div>
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
        let url = '/api/blog/category/'

        this.getArticle(url, params)
      } else if (this.tagId != null) {
        let params = new URLSearchParams()
        params.append('tagId', this.tagId)
        let url = '/api/blog/tag/'

        this.getArticle(url, params)
      } else {
        let url = '/api/blog/'

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
        url: '/api/blog/getTotalNumOfArticle',
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
        url = '/api/blog/category/'
      } else if (this.tagId) {
        params.append('tagId', this.tagId)
        params.append('pageNo', this.currentPageNum)
        url = '/api/blog/category/'
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
  .entry_article {
    width: 100%;
    height: 167px;
    padding: 20px;
    margin-top: 10px;
    border-bottom: 1px solid #EFEFEF;
  }
  .entry_pic {
    width: 200px;
    height: 120px;
    float: left;
    cursor: pointer;
  }
  .entry_txt {
    width: 400px;
    height: 120px;
    margin: 0 20px;
    float: left;
  }
  .hd {
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    height: 28px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .bd {
    font-size: 14px;
    margin: 10px 0 5px 0;
    height: 45px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .ft {
    color: #999;
    height: 20px;
  }
  .tag {
    float: right;
    margin-left: 5px;
  }

</style>
