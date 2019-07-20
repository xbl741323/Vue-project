import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

// 每次进入网站，肯定会调用 main.js 在调用的时候，把购物车的数据从本地存储中读出来，放到 store 中
var cart = JSON.parse(localStorage.getItem('cart') || '[]')

var store = new Vuex.Store({
    state: {//this.$store.state.***
        cart: cart //将购物车中的商品，用一个数组存储起来，咋 cart 数组中，存储一些商品的对象
        //我们可以暂时将这个商品对象，设计成这个样子:
        //{id: 商品的id, count: 要购买的数量, price: 商品的单价, selected: true }
    },
    mutations: {//this.$store.commit('方法的名称',按需传递的唯一的参数)
        addToCart(state, goodsinfo) {
            //点击加入购物车，把商品信息保存到 store 中的 cart 中
            //分析：
            //1.如果购物车中，之前已经有这个对应的商品了，那么，只需要更新数量
            //2.如果没有，则直接将商品数据，push 到 cart 中即可

            //假设在购物车中，没有找到对应的商品
            var flag = false
            state.cart.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = !flag
                    return true;
                }
            })
            //如果最终，循环完毕，得到的 flag 还是 false ,则把商品信息直接 push 到 cart 中
            if (!flag) {
                state.cart.push(goodsinfo)
            }
            // 将数据存储到本地存储中
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateGoodsInfo(state, goodsinfo) {
            //修改购物车中商品的数量值
            //分析：
            state.cart.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true //终止循环
                }
            })
            //当修改完商品的数量，把最新的购物车数据，保存到本地存储中
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        removeFromCart(state, id) {
            //根据 id，从 store 中的购物车中删除对应的那条商品数据
            state.cart.some((item, i) => {
                if (item.id == id) {
                    state.cart.splice(i, 1)
                    return true
                }
            })
            //将删除完毕后的最新的购物车数据同步到本地存储中
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        updateGoodsSelected(state, info) {
            state.cart.some((item, i) => {
                if (item.id == info.id) {
                    item.selected = info.selected
                    return true
                }
            })
            //把最新的所有购物车商品状态保存到购物车中去
            localStorage.setItem('cart', JSON.stringify(state.cart))
        }
    },
    getters: {// this.$store.getters.***
        // 相当于计算属性，也相当于 filters
        getAllCount(state) {
            var c = 0
            state.cart.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.cart.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.cart.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, //勾选的数量
                amount: 0 //勾选的总价
            }
            state.cart.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count

                }
            })
            return o
        }
    }
})
//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateFormat', function (dateStr, pattern = 'YYYY-MM-DD HH:MM:SS') {
    return moment(dateStr).format(pattern)
})
Vue.http.options.root = 'http://www.liulongbin.top:3005';//设置请求的根路径
Vue.http.options.emulateJSON = true;//全局设置 post 时候表单数据格式组织形式application/x-www-form-urlencoded
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload);
import MintUI from "mint-ui"
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import VuePreview from 'vue-preview'

// defalut install
Vue.use(VuePreview)//用于缩略图的插件

// with parameters install
// Vue.use(preview, {
//   mainClass: 'pswp--minimal--dark',
//   barsSize: {top: 0, bottom: 0},
//   captionEl: false,
//   fullscreenEl: false,
//   shareEl: false,
//   bgOpacity: 0.85,
//   tapToClose: true,
//   tapToToggleControls: false
// })

import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import app from './App.vue'
import router from './router.js'//导入自定义路由模块

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router,
    store
})