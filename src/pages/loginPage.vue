<template>
  <div class="box">
    <Input v-model="username" size="large" prefix="ios-contact" placeholder="用户名" style="width: auto" />
    <br><br>
    <Input v-model="password" size="large" prefix="ios-contact" placeholder="密码" style="width: auto" />
    <br><br>
    <Button type="success" size="large" :disabled="!username || !password" v-on:click="login">登录</Button>
    <Button type="default" size="large" v-on:click="register">注册</Button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login: function (event) {
      let params = new URLSearchParams()
      params.append('username', this.username)
      params.append('password', this.password)
      console.log(this.username, this.password)

      let self = this
      this.$ajax({
        method: 'post',
        url: '/api/blog/user/login',
        data: params
      }).then(function (response) {
        console.log(response.data.code)
        if (response.data.code === 0) {
          self.$router.push({path: '/articlePublish'})
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    register: function (event) {
      alert('你点击了注册按钮')
    }
  }
}
</script>

<style lang="css" scoped>
.box {
  margin-top: 60px;
}
</style>
