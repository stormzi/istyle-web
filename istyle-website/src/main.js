// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'Axios'
import Vuex from 'vuex'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import './assets/css/base1.css'
import './assets/css/login.css'
import './assets/css/login-register.css'

Vue.config.productionTip = false;

//地址选择控件
import { pca, pcaa } from 'area-data'; // v5 or higher
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';
Vue.use(VueAreaLinkage);

//格式化时间插件
import moment from 'moment';
// 中文简体
moment.locale('zh-cn');
Vue.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') =>{
  return moment(dataStr).format(pattern)
})

//懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload);

Vue.use(Vuex);
Vue.prototype.axios=axios;
Vue.use(ElementUI);

const store=new Vuex.Store({
  state:{
    nickName:''
  },
  mutations:{
    updateUserInfo(state,nickName){
      state.nickName=nickName;
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
