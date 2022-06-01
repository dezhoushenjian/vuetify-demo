import Vue from 'vue';
import { Button } from 'vant';
import { Toast } from 'vant';

Vue.use( Button );
// 全局方法挂载
Vue.prototype.vantToast = Toast
