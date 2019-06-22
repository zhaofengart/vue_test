<template>
  <div class="login">
    <Input v-model="username" size="large" prefix="ios-contact" placeholder="用户名" style="width: auto" />
    <br><br>
    <Input v-model="password" size="large" prefix="ios-contact" placeholder="密码" style="width: auto" />
    <br><br>
    <div class="btn">
      <Button type="success" size="large" :disabled="!username || !password" v-on:click="login">登录</Button>
      <Button type="default" size="large" v-on:click="register">注册</Button>
    </div>

    <Layout>
      <Sider hide-trigger :style="{background: '#fff'}">
        <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>Item 1
            </template>
            <MenuItem name="1-1">Option 1</MenuItem>
            <MenuItem name="1-2">Option 2</MenuItem>
            <MenuItem name="1-3">Option 3</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>Item 2
            </template>
            <MenuItem name="2-1">Option 1</MenuItem>
            <MenuItem name="2-2">Option 2</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>Item 3
            </template>
            <MenuItem name="3-1">Option 1</MenuItem>
            <MenuItem name="3-2">Option 2</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
    </Layout>
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
.login {
  width: 250px;
  padding: 0 20px;
  margin: 60px auto;
}
.btn {
  width: 200px;
  margin: auto;
}
</style>
