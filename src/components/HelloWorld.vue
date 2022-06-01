<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
<!--        <v-img-->
<!--          :src="require('../assets/logo.svg')"-->
<!--          class="my-3"-->
<!--          contain-->
<!--          height="200"-->
<!--        />-->
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>

<!--        <p class="subheading font-weight-regular">-->
<!--          For help and collaboration with other Vuetify developers,-->
<!--          <br>please join our online-->
<!--          <a-->
<!--            href="https://community.vuetifyjs.com"-->
<!--            target="_blank"-->
<!--          >Discord Community</a>-->
<!--        </p>-->
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          What's next?
        </h2>

        <v-row justify="center">
          center
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Important Links
        </h2>

        <v-row justify="center">
          center
        </v-row>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Ecosystem
        </h2>

        <v-row justify="center">
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-row>
      </v-col>
    </v-row>
    <van-button type="primary" @click="toast">123</van-button>
  </v-container>
</template>

<script>

import request from '@/utils/request'

  export default {
    name: 'HelloWorld',
    created() {

    },
    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
    }),
    methods:{
      toast(){
        // this.vantToast({
        //     message: '加载中...',
        //     forbidClick: true,
        // })
        // 向后端请求路由数据
        request({
          url: '/system/menu/getRouters/1',
          method: 'get'
        }).then(res=>{
          console.log(res)
        }).catch(error=>{
          // this.vantToast({message: error, forbidClick: true})
            }
        )
      }
    }
  }
</script>
