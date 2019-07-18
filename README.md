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

## 实现新闻详情的页面布局和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的页面中，先动手导入 comment 组件+'import comment from './comment.vue''
3. 在父组件中的，使用 'components' 属性，将刚才导入的 comment 组件，注册为自己的子组件
4. 将注册子组件时候的注册名称，以标签形式，在页面中引用即可

## 获取所有的评论数到页面中
1. 为加载更多按钮绑定点击事件，在事件中，请求下一页数据
2. 点击加载更多，让 pageIndex++ ,然后重新调用 this.getComments() 方法重新获取最新一页的数据
3. 为了防止新数据覆盖老数据的情况，我们在点击加载更多的时候，应该让老数组调用数组的 concat 方法，拼接上新数据