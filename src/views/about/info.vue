<template>
  <v-container fluid class="pt-4" >
    <div class="pa-2">
      <v-form  ref="form" v-model="valid" lazy-validation app>
        <v-row justify="center">
          <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel v-for="(message, i) in messages" :key="i" hide-actions>
              <v-expansion-panel-header>
                <v-row  align="center" class="spacer" no-gutters>
                  <v-col cols="4" sm="2" md="1">
                    <v-avatar :size="avatarSize" rounded>
                      <img v-if="message.avatar" alt="Avatar" src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460">
                      <v-icon v-else :color="message.color" v-text="message.icon"></v-icon>
                    </v-avatar>
                  </v-col>

                  <v-col class="text-no-wrap" cols="5" sm="3" :style="{'font-size':textSize}">
                    <strong ><div>{{message.name}}</div></strong>
                    <div class="mt-2" style="color:#aaa">{{message.position}}</div>
                  </v-col>

                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-divider></v-divider>
                <v-card-text class="pr-0 pt-0" >
                  <div  class="d-flex justify-center align-center mt-2" style="height: 40px" >
                    <strong> <div :style="{'font-size':textSize}">姓名:</div></strong>
                    <v-text-field autofocus class="ml-2" v-model="infoForm.name" :rules="nameRules" :style="{'font-size':textSize,'margin-top':'10px'}" required></v-text-field>
                  </div>
                  <div class="d-flex justify-center align-center mt-2"  style="height: 40px" >
                    <strong> <div :style="{'font-size':textSize}">岗位:</div></strong>
                    <v-text-field  class="ml-2" v-model="infoForm.position" :rules="positionRules" :style="{'font-size':textSize,'margin-top':'10px'}" required></v-text-field>
                  </div>
                  <div class="d-flex justify-center align-center mt-2"  style="height: 40px" >
                    <strong> <div :style="{'font-size':textSize}">邮箱:</div></strong>
                    <v-text-field  class="ml-2" v-model="infoForm.email" :rules="emailRules" :style="{'font-size':textSize,'margin-top':'10px'}" required></v-text-field>
                  </div>
                  <div class="d-flex justify-center align-center mt-2"  style="height: 40px" >
                    <strong> <div :style="{'font-size':textSize}">生日:</div></strong>
                    <v-text-field  class="ml-2" v-model="infoForm.birthday" :rules="birthdayRules" :style="{'font-size':textSize,'margin-top':'10px'}" required></v-text-field>
                  </div>
                  <div class="d-flex justify-center align-center mt-2"  style="height: 40px" >
                    <strong> <div :style="{'font-size':textSize}">电话:</div></strong>
                    <v-text-field  class="ml-2" v-model="infoForm.phone" :rules="phoneRules" :style="{'font-size':textSize,'margin-top':'10px'}" required></v-text-field>
                  </div>

                  <v-btn block  :disabled="!valid" :style="{'font-size':textSize}"  color="success" class="mt-6" @click="saveInfo">保存</v-btn>
                </v-card-text>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-form>
      <v-form  ref="form2" v-model="valid2" class="pt-4" lazy-validation app>
        <v-row justify="center" class="mt-2">
          <v-expansion-panels>
            <v-expansion-panel  hide-actions>
              <v-expansion-panel-header>
                <v-row align="center" class="spacer" no-gutters>
                  <v-col cols="4" sm="2" md="1">
                      <v-avatar :size="avatarSize" rounded>
                      <v-icon color="red" :size="iconSize" v-text="'mdi-lock-outline'"></v-icon>
                    </v-avatar>
                  </v-col>

                  <v-col class="text-no-wrap" cols="5" sm="3" :style="{'font-size':textSize}" >
                    <strong ><div>修改密码</div></strong>
                  </v-col>

                </v-row>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-divider></v-divider>
                <v-card-text class="pr-0 pt-0 password" >
                  <div  class="d-flex justify-center align-center mt-2" style="height: 40px" >
                    <strong><div :style="{'font-size':textSize}">输入旧密码:</div></strong>
                    <v-text-field  class="ml-2" autofocus autocomplete="off" v-model="passwordForm.password" :rules="passwordRules" :style="{'font-size':textSize,'margin-top':'10px'}" required :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'"  @click:append="show1 = !show1"></v-text-field>
                  </div>
                  <div class="d-flex justify-center align-center mt-4" style="height: 40px" >
                    <strong><div :style="{'font-size':textSize}">输入新密码:</div></strong>
                    <v-text-field  class="ml-2" autocomplete="off" v-model="passwordForm.newPassword" :rules="passwordRules" :style="{'font-size':textSize,'margin-top':'10px'}" required :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'"  @click:append="show2 = !show2"></v-text-field>
                  </div>
                  <div class="d-flex justify-center align-center mt-4" style="height: 40px" >
                    <strong><div :style="{'font-size':textSize}">确认新密码:</div></strong>
                    <v-text-field  class="ml-2" autocomplete="off" v-model="passwordForm.confirmPassword" :rules="passwordRules" :style="{'font-size':textSize,'margin-top':'10px'}" required :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" :type="show3 ? 'text' : 'password'"  @click:append="show3 = !show3"></v-text-field>
                  </div>

                  <v-btn block  :disabled="!valid2"  color="success" class="mt-6" @click="savePassword">保存</v-btn>
                </v-card-text>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-form>
      <v-row   justify="center" class="mt-6 helpText ">
        <v-expansion-panels>
          <v-expansion-panel  hide-actions readonly  >
            <v-expansion-panel-header>
              <v-row align="center" class="spacer" no-gutters>
                <v-col cols="4" sm="2" md="1">
                  <v-avatar :size="avatarSize" rounded>
                    <v-icon color="blue" :size="iconSize" v-text="'mdi-account-question-outline'"></v-icon>
                  </v-avatar>
                </v-col>

                <v-col class="text-no-wrap "  cols="5" sm="3" :style="{'font-size':textSize}">
                  <strong ><div id="help2" style="color: #212121; ">帮助文档</div></strong>
                </v-col>

              </v-row>
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <v-row   justify="center" class="mt-6 edition">
        <v-expansion-panels>
          <v-expansion-panel  hide-actions readonly >
            <v-expansion-panel-header>
              <v-row align="center" class="spacer" no-gutters>
                <v-col cols="4" sm="2" md="1">
                  <v-avatar :size="avatarSize" rounded>
                    <v-icon color="black" :size="iconSize" v-text="'mdi-card-outline'"></v-icon>
                  </v-avatar>
                </v-col>

                <v-col class="text-no-wrap d-flex justify-space-between"  cols="5" sm="3" :style="{'font-size':textSize}">
                  <strong ><div style="color: #212121; ">版本信息</div></strong>
                  <div>1.0.0</div>
                </v-col>

              </v-row>
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
      <v-row class="mt-6">
        <v-col>
          <v-btn block color="error" :style="{'font-size':textSize}" @click="logout">退出登录</v-btn>
        </v-col>
      </v-row>
    </div>

  </v-container>

</template>

<script>

export default {
  name: "info",
  data(){
    return{
      show1:false,
      show2:false,
      show3:false,
      // panel: [0, 1],
      panel: [],
      messages: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: '沈健',
          title: '合兴餐饮集团',
          position:'WEB前端开发',
          email:'jian.shen@hophing.com.cn',
          sex:'男',
          birthday:'1990/09/13',
          phone:'19853425152'
        }
      ],
      valid:true,
      valid2:true,
      infoForm: {},
      passwordForm:{
        password:'',
        newPassword:'',
        confirmPassword:''
      },
      passwordRules: [
        v => !!v || '请输入您的密码',
        v => (v && v.length >=6) || '密码长度需大于6',
      ],
      nameRules: [
        v => !!v || '请输入您的姓名',
        v => (v && v.length >= 2) || '姓名长度需大于2',
      ],
      positionRules: [
        v => !!v || '请输入您的性别',
        v => (v && v.length >= 2) || '性别长度需大于2',
      ],
      emailRules: [
        v => !!v || '请输入您的邮箱',
        v => (v && v.length >= 10) || '邮箱长度需大于10',
      ],
      birthdayRules: [
        v => !!v || '请输入您的生日',
        v => (v && v.length >= 6) || '生日长度需大于6',
      ],
      phoneRules: [
        v => !!v || '请输入您的手机号码',
        v => (v && v.length === 11) || '手机号长度为11位',
      ],
    }
  },
  computed: {
    avatarSize () {switch (this.$vuetify.breakpoint.name) {case 'xs': return '50px';case 'sm': return '100px'}},
    iconSize () {switch (this.$vuetify.breakpoint.name) {case 'xs': return '30px';case 'sm': return '50px';case 'md': return '50px';case 'lg': return '50px'}},
    textSize(){switch (this.$vuetify.breakpoint.name) {case 'xs': return '15px';case 'sm': return '20px';case 'md': return '20px';case 'lg': return '20px'}}
  },
  mounted() {
    this.infoForm = JSON.parse(JSON.stringify(this.messages[0]))
  },
  methods: {
    saveInfo() {
      if( this.$refs.form.validate()){
       this.messages[0].name = this.infoForm.name
       this.messages[0].position = this.infoForm.position
      }
    },
    savePassword(){
      if( this.$refs.form2.validate()){
        console.log('保存密码')
      }

    },
    async logout() {
      this.vantDialog.confirm({
        title: '提示',
        message: '确定要退出登录吗',
      })
        .then(() => {
        // on confirm
          this.$store.dispatch('LogOut').then(() => {
            localStorage.clear()
            location.href = '/index'
          }).catch(res=>{console.log(res)})
      })
        .catch(() => {
          // on cancel
      })
    },




  },
}
</script>

<style lang="less" scoped>
  // 隐藏更改密码输入框下标
  /deep/.v-text-field > .v-input__control > .v-input__slot:before, .v-text-field > .v-input__control > .v-input__slot:after{content: none;}

  .password{
    /deep/ .v-icon.v-icon{
      font-size: 16px;
    }
  }
  //改变帮助文档三角图标方向
  .helpText{
   /deep/ .mdi-chevron-down::before{
      transform: rotate(-90deg);
    }
   /deep/ .v-icon.v-icon::after{
     transform: rotate(-90deg);
   }
  }
  // 改变版本信息三角图标颜色
  .edition{
    /deep/ .mdi-chevron-down::before{
       color: #FFFFFF;
    }
  }

</style>