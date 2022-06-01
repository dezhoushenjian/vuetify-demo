<template>
  <v-app id="app">
    <v-form ref="form" v-model="valid" lazy-validation app>
      <v-text-field v-model="loginForm.username" :rules="usernameRules" label="账号" required></v-text-field>
      <v-text-field v-model="loginForm.password" :rules="passwordRules" label="密码" required></v-text-field>
      <v-checkbox v-model="loginForm.rememberMe"  label="记住密码" ></v-checkbox>
      <v-btn block :loading="loading" :disabled="!valid"  color="success"  @click="handleLogin">登录</v-btn>
    </v-form>
  </v-app>
</template>

<script>
import Cookies from "js-cookie";
import { encrypt, decrypt } from '@/utils/jsencrypt'

export default {
  name: "Login",
  data() {
    return {
      valid:true,
      loading:false,
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
    const query=this.$route.query;
    const code = query.redirect.replaceAll("/index?code=", "")
    if(query.redirect.indexOf("/index?code=") >= 0 && code) {
      this.loading = true;
      this.$store.dispatch("WeChatLogin", code).then(() => {
        this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
        // this.$router.push({ path: "/userStoreList" }).catch(()=>{});
      }).catch(() => {
        this.loading = false;
      });
    } else {
      this.getCookie()
    }
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
          this.loading = true;
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
          }).catch(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
