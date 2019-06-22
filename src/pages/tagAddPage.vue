<template>
  <div class="add_tag">
    <Input v-model="tagName"  placeholder="标签名称" style="width: auto" />
    <Button type="success" :disabled="!tagName" v-on:click="addTag">添加标签</Button>
  </div>
</template>

<script>
export default {
  name: 'tagAddPage',
  data () {
    return {
      tagName: ''
    }
  },
  methods: {
    addTag: function (event) {
      console.log('调用添加标签按钮')
      let params = new URLSearchParams()
      params.append('tagName', this.tagName)

      let self = this
      this.$ajax({
        method: 'post',
        url: '/api/blog/tag/addTag',
        data: params
      }).then(function (response) {
        if (response.data.code === 0) {
          alert('添加成功')
          self.tagName = ''
        } else {
          alert('添加失败')
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }

}
</script>

<style scoped>
.add_tag {
  width: 250px;
  margin: 60px auto;
}
</style>
