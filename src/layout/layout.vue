<template>
  <v-app id="inspire">
    <v-app-bar height="40" app>
<!--  应用栏按钮-->
<!--      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>-->

      <v-toolbar-title  class="ma-auto" style="font-size: 1rem">{{title}}</v-toolbar-title>
    </v-app-bar>

    <v-main class="pb-10">
      <router-view></router-view>
<!--      消息通知弹出框-->
      <v-snackbar
          class="mb-10"
          v-model="this.$store.state.messageText.snackbar"
          :multi-line="multiLine"
          :timeout = 'timeout'

      >
          {{ this.$store.state.messageText.messageText }}
        <template v-slot:action="{ attrs }">
            <v-btn
                color="green"
                text
                v-bind="attrs"
                @click="goToLogin"
            >
              登录
            </v-btn>
            <v-btn
                color="red"
                text
                v-bind="attrs"
                @click="closMessageText"
            >
              关闭
            </v-btn>
        </template>
      </v-snackbar>
    </v-main>
<!--    底部导航-->
    <v-bottom-navigation
        :value='value'
        color="teal"
        grow
        class="pa-2"
        style="position: fixed"
    >

        <v-btn  style="background: none" @click="goToBottomNavigation('home')" >
          <span>首页</span>
          <v-icon>mdi-home-circle-outline</v-icon>
        </v-btn>

        <v-btn style="background: none" @click="goToBottomNavigation('chart')">
          <span>报表</span>
          <v-icon>mdi-chart-bell-curve</v-icon>
        </v-btn>

      <v-btn style="background: none" @click="goToBottomNavigation('message')">
        <span>消息</span>
        <v-icon>mdi-message-badge-outline</v-icon>
      </v-btn>

      <v-btn style="background: none" @click="goToBottomNavigation('info')">
        <span>设置</span>
        <v-icon>mdi-cellphone-cog</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>

import store from '../store/index'

export default {
  data: () => ({
    value: 0,
    title: '' ,
    links: [
      ['mdi-inbox-arrow-down', '收件箱'],
      ['mdi-send', '邮寄'],
      ['mdi-delete', '垃圾箱'],
    ],
    multiLine: true,
    timeout: 1000*60*60*24,
  }),
  mounted() {
    this.title = this.$store.state.settings.title
    this.value = parseInt(localStorage.getItem('bNavValue'))
  },
  beforeUpdate() {
    this.title = this.$store.state.settings.title
    this.value = parseInt(localStorage.getItem('bNavValue'))
  },
  methods:{
    async logout() {
      this.$store.dispatch('LogOut').then(() => {
        localStorage.clear()
        location.href = '/index';
      }).catch(res=>{

      })
      // this.$confirm('确定注销并退出系统吗？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$store.dispatch('LogOut').then(() => {
      //     localStorage.clear()
      //     location.href = '/index';
      //   })
      // }).catch(() => {})
    },
    closMessageText(){
      this.$store.state.messageText.messageText = ''
      this.$store.state.messageText.snackbar = false
    },
    goToLogin(){
        store.dispatch('LogOut').then(() => {location.href = '/index'})
    },
    goToBottomNavigation(pathName){
      let date = String(Date.now())
      this.$router.push({name:pathName,query:{date:date}})
    }
  }
}
</script>
<style scoped>

  .v-btn:before{
    background: none;
  }

  /*取消按钮点击时涟漪波纹*/

  /deep/ .v-ripple__container{
    color: #FFFFFF;
  }
</style>