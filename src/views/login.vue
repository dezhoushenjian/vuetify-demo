<template>
  <v-app id="app">
    <v-form class="pa-6" ref="form" v-model="valid" lazy-validation app>
      <v-text-field v-model="loginForm.username" :rules="usernameRules" label="账号" required></v-text-field>
      <v-text-field v-model="loginForm.password" :rules="passwordRules" label="密码" required autocomplete="off" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'"  @click:append="show2 = !show2"></v-text-field>
      <v-checkbox v-model="loginForm.rememberMe"  label="记住密码" ></v-checkbox>
      <v-btn block  :disabled="!valid"  color="success"  @click="handleLogin">登录</v-btn>
      <div style="display: flex;justify-content: center;">
        <v-btn class="mt-10" fab dark large color="purple" @click="weChatLogin">
          <v-icon dark>
            mdi-android
          </v-icon>
        </v-btn>
      </div>

    </v-form>
  </v-app>
</template>

<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'
import { Toast } from 'vant';

export default {
  name: "Login",
  data() {
    return {
      show2:false,
      valid:true,
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
      },
      usernameRules: [
        v => !!v || '请输入您的账号',
        v => (v && v.length >= 4) || '账号长度需大于4',
      ],
      passwordRules: [
        v => !!v || '请输入您的密码',
        v => (v && v.length >=6) || '密码长度需大于6',
      ],
    }
  },
  created() {
    // const query=this.$route.query;
    // const code = query.redirect.replaceAll("/index?code=", "")
    // if(query.redirect.indexOf("/index?code=") >= 0 && code) {
    //   this.$store.dispatch("WeChatLogin", code).then(() => {
    //     this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
    //     // this.$router.push({ path: "/userStoreList" }).catch(()=>{});
    //   }).catch((res) => {
    //       console.log('catch',res)
    //   });
    // } else {
    //   this.getCookie()
    // }
  },
  methods: {
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      if(this.$refs.form.validate()){
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
            // this.$router.push({ path: "/userStoreList" }).catch(()=>{});
          }).catch(() => {})
      }
    },
    weChatLogin(){
      console.log("企业微信授权登录")
      const query=this.$route.query;
      if(query.code){
        this.$store.dispatch("WeChatLogin", query.code).then(() => {
          this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
        }).catch((res) => {
          Toast(res)
        })
      }else {
        this.getCookie()
      }
      // const code = "4nLtZ6Y7D9yAUyL6BPvvAysT77a02nTwyXt9CR1iqdg"
      // this.$store.dispatch("WeChatLogin", code).then(() => {
      //   this.$router.push({ path: this.redirect || "/" }).catch(()=>{})
      // }).catch((res) => {
      //   console.log('catch',res)
      // })
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
