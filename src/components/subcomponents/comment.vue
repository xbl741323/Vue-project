<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea placeholder="请输入要评论的内容(最多评论120字)" maxlength="120"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>

    <div class="cmt-list" v-for="(item,i) in comments" :key="item.add_time">
      <div class="cmt-item">
        <div
          class="cmt-tittle"
        >第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间{{item.add_time | dateFormat}}</div>
        <div class="cmt-body">
           很棒！点赞 {{item.content === 'undefined' ? '此用户暂无评论':item.content}}
            </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain>加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1,
      comments: [] //所有的评论数据
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 1) {
            this.comments = result.body.message;
          } else {
            Toast("获取评论失败！");
          }
        });
    }
  },
  props: ["id"]
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 4px;
  }
  .cmt-list {
    margin: 5px 0px;
    .cmt-item {
      font-size: 13px;
      .cmt-tittle {
        line-height: 35px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 1em;
      }
    }
  }
}
</style>
