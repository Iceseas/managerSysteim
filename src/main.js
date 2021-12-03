import Vue from 'vue'

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

import uikiwi from 'uikiwi'
import 'uikiwi/lib/uikiwi.css';
Vue.use(uikiwi)

import md5 from 'js-md5';
Vue.prototype.$md5 = md5;


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import echarts from 'echarts'
import '@/styles/Layout.css'
import '@/styles/normalize.css'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


import router from './router'
import store from './store'
import App from './App.vue'


Vue.prototype.$echarts = echarts
Vue.use(ElementUI);
Vue.use(ViewUI);
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')