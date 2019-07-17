import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
Vue.use(VueRouter)
//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:MM:SS') {
    return moment(dateStr).format(pattern)
})
Vue.use(VueResource)
Vue.http.options.root = 'http://www.liulongbin.top:3005';//设置请求的根路径
import app from './App.vue'
import { Header, Swipe, SwipeItem, Button } from 'mint-ui';
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import router from './router.js'//导入自定义路由模块

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router
})