<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="3000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
    <h3>homecontainer</h3>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lunbotuList: [] //保存轮播图的数据
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http
        .get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(resilt => {
          if (resilt.body.status === 0) {
            //成功了
            this.lunbotuList = resilt.body.message;
          } else {
            //失败了
            Toast('加载轮播图失败');
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: blue;
    }
    &:nth-child(3) {
      background-color: pink;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
