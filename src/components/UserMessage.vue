<template lang="html">
  <div class="header">
    <div v-if="!isLogin" class="header">
      <Row>
        <i-col spac="2" offset="22">
          <router-link to="/loginPage">
            <div class="header_menu">登录</div>
          </router-link>
        </i-col>
      </Row>
    </div>
    <div v-else class="header">
      <Row>
        <i-col spac="2" offset="22">
      <router-link to="{path: '/userInfo', query: {id: id}}">
        <div class="header_menu">已登录：{{username}}</div>
      </router-link>
        </i-col>
      </Row>
    </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isLogin: false,
      username: '',
      id: ''
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      this.isLogin = true
      this.username = localStorage.getItem('username')
      this.id = localStorage.getItem('_id')
    } else {
      console.log('用户登录失败')
    }
  }
}
</script>
<style lang="css" scoped>
.header {
  width: 100%;
  height: 40px;
  left: 0;
  top: 0;
  color: #000;
  background-color: #C3bbbb;
}
.header_menu {
  padding-top: 6px;
  color: #fff;
  font-size: 16px;
}
</style>
