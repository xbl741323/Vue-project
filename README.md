# 这是一个基于vue的实战项目

# 通过本次实战练习，希望自己可以收获一些东西

##【主流开源协议之间有何异同？】
(https://blog.csdn.net/xiaodaima2016/article/details/83645854)

##制作首页App组件
1. 完成 Header 区域，使用的是 Minit-UI 中的Header组件
2. 制作底部的 Tabber 区域，使用的是 Mui 中的 Tabber.html 中的代码
 + 在制作购物车的小图标时，操作会相对多一些：
 + 先把扩展图标的 css 样式，拷贝到项目中
 + 再拷贝扩展字体库 ttf 文件，到项目中
 + 为购物车小图标，添加如下样式"mui-icon mui-icon-extra mui-icon-extra-cart"
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabber 为 router-link

## 设置路由高亮

## 点击 tabber 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据。如何获取数据呢，使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染每个 item 项

## 改造九宫格区域的样式

## 改造新闻咨询路由链接

## 新闻资讯页面制作
1. 绘制页面,使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现新闻资讯列表点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link，同时，在跳转的时候应该提供唯一的id标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来