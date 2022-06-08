import Vue from 'vue';
import { Toast } from 'vant';

import { Lazyload } from 'vant';
import { Divider } from 'vant';

// 全局方法挂载
Vue.prototype.vantToast = Toast

Vue.use(Lazyload)
Vue.use(Divider)