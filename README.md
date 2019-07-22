# 这是一个基于vue的实战项目

# 通过本次实战练习，希望自己可以收获一些东西

## 【主流开源协议之间有何异同？】
(https://blog.csdn.net/xiaodaima2016/article/details/83645854)

## 制作首页App组件
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

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论的内容提交给服务器
5. 当发表评论ok后，重新刷新列表，以查看最新的评论，最新的评论按时间降序排列
+ 如果调用 getComments 方法重新刷新评论列表的话，可能只是得到了最后一页的评论，前几页的评论获取不到
+ 换一种思路：当评论成功后，在客户端，手动拼接出一个最新的评论对象，然后调用数组的 unshift 方法，把最新的评论，追加到 data 中 comments 的开头，这样，就能完美实现刷新评论列表的需求；
6. 这里有个小 bug 先评论再点击加载更多按钮后，第11条数据和第12条数据会重复（尚未解决）

## 改造图片分享按钮为路由的链接并显示对应的组件页面
 
## 绘制图片列表组件页面结构并美化样式
1. 制作顶部的滑动条
2. 制作底部的图片列表

### 制作顶部滑动条的注意点：
1. 需要借助 MUI 中的 tab-top-webview-main.html
2. 需要把 slider 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查，发现这是JS组件，需要被初始化：
+ 导入 mui.js
+ 调用官方提供的方式去初始化：
...
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
...
4. 我们再初始化滑动条的时候，导入了 mui.js 但是，控制台报错：TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
+ 经过合理的推测，觉得，可能是 mui.js 中用到了'caller', 'callee', and 'arguments'，但是，webpack打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了;
+ 解决方案：1. 把 mui.js 中的非严格模式的代码改掉，但是不现实；2.把webpack打包时候的严格模式禁用掉;
+ 最终，我们选择了 plan B 移除严格模式：使用这个插件：
babel-plugin-transform-remove-strict-mode
5. 刚进入图片分享页面的时候，滑动条无法工作，经过我们认真的分析，发现，如果要初始化滑动条，必须要等 DOM 元素加载完毕，所以，我们把初始化滑动条的代码，搬到了 mounted 生命周期函数中
6. 当滑动条调试ok后，发现，tabber 无法正常工作了，，这时候，我们需要把每个 tabber 按钮的样式中 'mui-tab-item' 重新改一下名字；
7. 获取所有分类，渲染分类列表；

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的组件 'lazy-load'
2. 根据'lazy-load'的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了图片列表的懒加载改造和样式美化

## 实现了点击图片跳转到图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为哪种元素 

## 实现详情页面的的布局和美化，同时获取数据渲染页面

## 实现图片详情中缩略图的功能
1. 使用插件 vue-preview 这个缩略图插件
2. 获取到的所有图片列表，然后用 vue-preview 标签进行渲染
3. 注意：每个图片中属性要完整

## 绘制商品列表

## 尝试在手机上进行项目的预览和测试
1. 要保证自己的手机能正常运行；
2. 要保证手机和开发项目的电脑处于同一个 wifi 环境中，也就是说手机可以访问到电脑的IP
3. 打开自己的项目中 package.json 文件，在 dev 脚本中，添加一个 --host 指令，把当前电脑的 wifi IP 地址，设置为 --host 的指令值；
+ 如何查看自己电脑所处 wifi 的 IP呢，在 cmd 终端中运行 'ipconfig',查看无线网的IP地址
