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
            {{item.content === '' ? '此用户暂无评论':item.content}}
            </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
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
    getComments() {//获取评论
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // this.comments = result.body.message;
            //每当获取新评论的时候，不要把老数据清空覆盖，而是应该以老数据拼接新数据
            this.comments = this.comments.concat(result.body.message)
          } else {
            Toast("获取评论失败！");
          }
        });
    },
    getMore(){//加载更多
      this.pageIndex++
      this.getComments()
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
