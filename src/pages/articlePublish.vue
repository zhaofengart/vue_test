<template lang="html">
  <div class="articlePublish">
    <blog-index-header></blog-index-header>
    <Row class="header">
      <i-col span="2" offset="2">
        <label class="description">文章标题: </label>
      </i-col>
      <i-col span="6">
        <Input type="text" class="title" v-model="title"/>
      </i-col>
      <i-col span="1" offset="1">
        <label class="description">分类: </label>
      </i-col>
      <i-col span="3">
        <Select v-model="selectedCategoryId" >
          <Option v-for="item in categoryList" :value="item.categoryId" :key="item.categoryId">{{ item.categoryName }}</Option>
        </Select>
      </i-col>
      <i-col span="1" offset="1">
        <label class="description">标签: </label>
      </i-col>
      <i-col span="5">
        <Select v-model="selectedTagIdList" multiple filterable max-tag-count=6 >
          <Option v-for="item in tagList" :value="item.tagId" :key="item.tagId">{{ item.tagName }}</Option>
        </Select>
      </i-col>
      <i-col span="2" >
        <Button type="success" v-on:click="addTag">添加标签</Button>
      </i-col>
    </Row>
    <Row>
      <i-col span="7">
        <label>摘要</label>
        <Input v-model="summary" type="textarea" :rows="15" placeholder="Enter summary..."/>
      </i-col>
      <i-col span="15">
        <label>正文</label>
        <div id="summernote"></div>
        <Button type="success" :disabled="!title" v-on:click="publish" style="width: 200px" >发布</Button>
      </i-col>
    </Row>
  </div>
</template>

<script>
import $ from 'jquery'
import BlogIndexHeader from '../components/BlogIndexHeader'

export default {
  data () {
    return {
      categoryList: [],
      tagList: [],
      title: '',
      content: '',
      summary: '',
      selectedCategoryId: '',
      selectedTagIdList: []
    }
  },
  components: {
    BlogIndexHeader
  },
  created () {
    this.$http.post('/api/blog/category/getAllCategory').then((data) => {
      this.categoryList = data.body.data
    })

    this.$http.post('/api/blog/tag/getAllTag').then((data) => {
      this.tagList = data.body.data
    })

    console.log(this.tagList)
    // this.init()
  },
  mounted () {
    let summer = $('#summernote')
    summer.summernote({
      placeholder: 'Hello bootstrap 4',
      tabsize: 2,
      height: 600,
      callbacks: {
        onImageUpload: function (files) {
          sendFile(files)
        }
      }
    })

    /** * 发送图片文件给服务器端 */
    function sendFile (files) {
      let imageData = new FormData()
      imageData.append('myFile', files[0])
      $.ajax({
        url: '/api/blog/uploadMultiPartFile', // 图片上传url
        type: 'POST',
        data: imageData,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        // 图片上传成功
        success: function ($result) {
          let imgNode = document.createElement('img')
          imgNode.src = $result.data[0]
          summer.summernote('insertNode', imgNode)
        },
        // 图片上传失败
        error: function () {
          console.log('图片上传失败')
        }
      })
    }
  },
  methods: {
    publish: function (event) {
      console.log(this.selectedCategoryId)
      console.log(this.selectedTagIdList)

      this.$http.post('/api/blog/publishArticle', {
        categoryId: this.selectedCategoryId,
        title: this.title,
        content: $('#summernote').summernote('code'),
        summary: this.summary,
        userId: 3,
        tagIdList: this.selectedTagIdList
      }).then((data) => {
        if (data.body.code === 0) {
          alert('发布成功')
        } else {
          alert(data.body.msg)
        }
      })
    },
    addTag: function () {
      this.$router.push({path: '/tagAddPage'})
    }
  }

}
</script>
<style lang="css" scoped>
  .articlePublish {
    margin: 20px;
    text-align: center;
  }
  .header {
    height: 100px;
  }
</style>
