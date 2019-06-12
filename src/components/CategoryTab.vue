<template>
  <div class="categoryTab">
      <router-link to="/" class="nav-menu">
        <label>最新文章 </label>
      </router-link>
      <div v-for="item in categoryList" :key="item.categoryId" class="nav-menu">
        <router-link :to="{path: '/', query: {categoryId: item.categoryId}}">
        <label>{{item.categoryName}} </label>
      </router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryTab',
  data () {
    return {
      categoryList: []
    }
  },
  created () {
    this.$http.post('http://10.161.10.144:8080/blog/category/getAllCategory').then((data) => {
      if (data.body.code === 0) {
        this.categoryList = data.body.data
        console.log(data.body.data)
      } else {
        console.log('获取热门标签失败')
      }
    })
  },
  methods: {
    getArticleByCategoryId (categoryId) {
      alert(categoryId)
    }
  }
}
</script>

<style scoped>
.categoryTab {
  width: 100%;
  margin: 20px 0;
  font-size: 20px;
}
.nav-menu {
  margin: 0 20px;
  float: left;
}
</style>
