<template>
  <v-container>
<!--    轮播图区域-->
    <v-carousel cycle interval="3000" class="rounded-lg" v-model="model" :show-arrows="false"  height="150"  >
      <v-carousel-item v-for="(item,i) in images" :key="i" :src="item.src"></v-carousel-item>
    </v-carousel>
    <van-divider>运营管理</van-divider>
<!--    金刚区域-->
    <v-row  class="text-center"  >
      <v-col :cols="3" class="pa-2" v-for="(item,index) in menuData" :key="index" >
        <v-btn small>
            <v-icon :color="item.iconColor">mdi-{{item.icon}}</v-icon>
        </v-btn>
        <div style="color: #666; font-size: 0.5rem;margin-top: 0.5rem">{{item.name}} </div>
      </v-col>
    </v-row>

<!--    <v-row class="text-center">-->
<!--      <v-col class="mb-5" cols="12">-->
<!--        <h2 class="headline font-weight-bold mb-3">Token</h2>-->

<!--        <v-row justify="center" class="pa-5">-->
<!--          <div style="white-space:normal;word-break:break-all;	word-wrap:break-word; ">-->
<!--            {{this.$store.state.user.token}}-->
<!--          </div>-->
<!--        </v-row>-->
<!--      </v-col>-->
<!--    </v-row>-->
    <v-btn color="error" @click="toast">接口异常</v-btn>
    <v-btn  color="primary" elevation="2" class="ma-3" @click="showMessage">消息通知</v-btn>
  </v-container>
</template>

<script>

import request from '@/utils/request'

  export default {
    name: 'Home',
    created() {

    },
    data: () => ({
      model: 0,
      images: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        }
      ],
      menuData:[
        {
          url: '/pages/shop/needGoods/index',
          name: '财务检测',
          icon: 'finance',
          iconColor: '#15a3ef'
        },
        {
          url: '/pages/shop/storeReceive/index',
          name: '人资检测',
          icon: 'human-male-board',
          iconColor: '#ef663c'
        },
        {
          url: '/pages/shop/storeReceive/index',
          name: '门店自检',
          icon: 'table-chair',
          iconColor: '#6fe0ef'
        },
        {
          url: '/pages/shop/storeReceive/index',
          name: '安全保全检查',
          icon: 'cctv',
          iconColor: '#ff007f'
        },
        {
          url: '/pages/shop/storeReceive/index',
          name: '三地QSC检查',
          icon: 'arrow-decision-outline',
          iconColor: '#11a80c'
        },
        {
          url: '/pages/shop/storeReceive/index',
          name: 'DQ训练稽核',
          icon: 'motion-sensor',
          iconColor: '#7779ff'
        },
        {
          url: '/pages/shop/storeReceive/index',
          name: '跨区飞行检查',
          icon: 'airplane-takeoff',
          iconColor: '#ce9595'
        },
        {
          url: '/pages/shop/storeReceive/index',
          name: '原材料检查',
          icon: 'noodles',
          iconColor: '#efacec'
        },
      ]

    }),
    methods:{
      toast(){
        // this.vantToast({message: '加载中...', forbidClick: true})
        // 访问一个不存在的路由 测试拦截提示
        request({
          // url: '/system/menu/getRouters1',
          // method: 'get'
          url: 'http://boh.hophing.cn:85/login?code=5nf42vwvqDDlOMSL0a2vJZrgIjjBH88mCt7KVx5GkMg&state=STATE',
          method: 'post',
        }).then(res=>{
          console.log(res)
        }).catch(error=>{
          console.log(error)
          }
        )
      },
      showMessage(){
        this.$store.state.messageText.messageText = "登录已过期，是否重新登录"
        this.$store.state.messageText.snackbar = true
        console.log(this.$store.state.messageText.messageText )
        console.log(this.$store.state.messageText.snackbar)
        // this.$store.state.messageText = "测试消息"
        // this.$store.state.snackbar = true
      }
    }
  }
</script>

<style  lang="less" scoped>


//修改轮播组件底部分隔符背景高度
 /deep/ .v-carousel__controls{
    height: 22px;
}
 //修改轮播组件底部分隔符选中时光圈大小
 /deep/ .v-btn--icon.v-size--small{
   width: 23px;
   height: 22px;
 }
 //修改轮播组件底部分隔符大小
  /deep/.v-carousel__controls{
    i{
      font-size:10px !important;
    }
 }

</style>
