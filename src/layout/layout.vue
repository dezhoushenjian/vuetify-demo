<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        width="200px"
        app
    >
      <v-list>
        <v-list-item
            v-for="[icon, text] in links"
            :key="icon"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-broadcast-off</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>退出</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import {logout} from '@/api/login'
export default {
  data: () => ({
    drawer: null,
    title: '' ,
    links: [
      ['mdi-inbox-arrow-down', '收件箱'],
      ['mdi-send', '邮寄'],
      ['mdi-delete', '垃圾箱'],
    ],
  }),
  mounted() {
    this.title = this.$store.state.settings.title
  },
  methods:{
    async logout() {
      this.$store.dispatch('LogOut').then(() => {
        localStorage.clear()
        location.href = '/index';
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
    }
  }
}
</script>