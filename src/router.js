import VueRouter from 'vue-router'
import HomeContainer from './components/tabber/HomeContainer.vue'
import MemberContainer from './components/tabber/MemberContainer.vue'
import ShopcarContainer from './components/tabber/ShopcarContainer.vue'
import SearchContainer from './components/tabber/SearchContainer.vue'


//3.创建路由对象
var router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },//修改路由首地址
        { path: '/home',component:HomeContainer },
        { path: '/member',component:MemberContainer },
        { path: '/shopcar',component:ShopcarContainer },
        { path: '/search',component:SearchContainer }
    ],
    linkActiveClass: 'mui-active'//覆盖默认的路由高亮的类，默认的类名叫router-link-active
})

export default router//把路由对象暴漏出去