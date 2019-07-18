<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间 : {{photoinfo.add_time | dateFormat}}</span>
      <span>点击 : {{photoinfo.click}}次</span>
    </p>
    <hr />

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <vue-preview :slides="list" @close="handleClose"></vue-preview>
    </div>

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>
    <!-- 放置一个现成的评论子组件 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取到的图片id
      photoinfo: {}, //图片详情
      list: [] //缩略图的数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      //获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.photoinfo = result.body.message[0];
        } else {
          Toast("获取图片详情失败!");
        }
      });
    },
    getThumbs() {
      //获取缩略图
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            //循环每一个数据，补全相关内容
            item.msrc = item.src;
            item.alt = "picture";
            item.title = "img caption";
            item.w = 600;
            item.h = 400;
          });
          //把完整的数据保存到list 中
          this.list = result.body.message;
        } else {
          Toast("获取图片详情失败!");
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    //用来注册子组件的节点
    "comment-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0px;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thumbs{
      img{
          z-index: 20;
          box-shadow: 0 0 8px #999;
      }
  }
}
</style>
