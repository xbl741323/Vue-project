<template>
  <div>
    <!-- 将来，谁使用此轮播图组件，谁为我们传递 lunbotuList -->
    <!-- 此时，lunbotuList 应该是父组件向子组件传值来设置 -->
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt :class="{'full':isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
  <!-- 分析：为什么商品详情中的轮播图不好看-->
  <!-- 1. 首页中的图片，它的宽和高，都是使用了 100% 的宽度-->
  <!-- 2. 在商品详情页面中，轮播图的图片，如果也使用宽度为 100% 的话，页面不好看-->
  <!-- 3. 商品详情页面中的轮播图，期望高度是 100% ，但是宽度为自适应 -->
  <!-- 4. 经过分析：得到问题的原因：首页中的轮播图和详情页面中的轮播图，分歧点是宽度到底是
  100% 还是自适应-->
  <!-- 5. 既然这两个轮播图，其它方面是没有冲突的，只是宽度有分歧，那么，我们可以定义一个
  属性，让使用轮播图的调用者，手动指定是否为 100% 的宽度-->
</template>

<script>
import { Toast } from "mint-ui";
export default {
  props: ["lunbotuList", "isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    text-align: center;
    // &:nth-child(1) {
    //   background-color: red;
    // }
    // &:nth-child(2) {
    //   background-color: blue;
    // }
    // &:nth-child(3) {
    //   background-color: pink;
    // }
    img {
      //   width: 100%;
      height: 100%;
    }
    .mui-media-body {
      font-size: 13px;
    }
  }
}
.full {
  width: 100%;
}
</style>
