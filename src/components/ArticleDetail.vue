<template>
  <div>
    <div>
      <Input search enter-button  placeholder="Enter articleId..." style="width: 200px" v-model="inputArticleId" @click.native="search"/>
    </div>
    <label class="title">{{article.title}}</label>
    <Row>
      <i-col span="8" class="userAndTime">
        <Icon type="ios-contact"/>{{article.realname}} {{article.issueTime}}
      </i-col>
      <i-col class="tag">
        <Icon type="ios-pricetag" />
        <router-link :to="{path: '/', query: {tagId: item.tagId}}" v-for="item in article.tagList" :key="item.tagId" >{{item.tagName}}  </router-link>
      </i-col>
    </Row>
    <div class="article-cnt" v-html="article.content"></div>
    <div class="article-ft">
      <div class="article-last">
        <div v-if="previous != null">
          <label class="label">上一篇：</label><a class="a" v-on:click="getPrevious">{{previous.title}}</a>
        </div>
        <div v-else>
          <label class="a">已是最新文章</label>
        </div>
      </div>
      <div class="article-next">
        <div v-if="next != null">
          <label class="label">下一篇：</label><a class="a" v-on:click="getNext">{{next.title}}</a>
        </div>
        <div v-else>
          <label class="a">已是最后文章</label>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  data () {
    return {
      article: '',
      previous: {},
      next: {},
      inputArticleId: ''
    }
  },
  props: ['articleId'],
  created () {
    this.getArticle(this.articleId)
  },
  methods: {
    getArticle: function (articleId) {
      let params = new URLSearchParams()
      params.append('articleId', articleId)

      this.$ajax({
        method: 'post',
        url: 'http://10.161.10.144:8080/blog/getArticle',
        data: params
      }).then((response) => {
        this.article = response.data.data.article
        this.previous = response.data.data.previous
        this.next = response.data.data.next
      }).catch(function (error) {
        console.log(error)
      })
    },
    getPrevious: function () {
      this.getArticle(this.previous.articleId)
    },
    getNext: function () {
      this.getArticle(this.next.articleId)
    },
    search: function (event) {
      console.log(this.inputArticleId)
      this.getArticle(this.inputArticleId)
      this.inputArticleId = ''
    }
  },
  watch: {
    // 监听相同路由下参数变化的时候，从而实现异步刷新
    '$route' (to, from) {
      this.getArticle(this.articleId)
      console.log('监听路由')
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
.article-cnt {
  height: 100%;
}
.tag {
  height: 100px;
  text-align: right;
}
.userAndTime {
  text-align: left;
}
.label {
  font-size: 12px;
  color: lightskyblue;
}
.a {
  font-size: 12px;
  color: black;
}
.article-ft {
  margin: 20px 0;
  padding-bottom: 20px;
}
.article-last {
  float: left;
}
.article-next {
  float: right;
}
</style>
