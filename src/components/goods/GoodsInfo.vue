<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 商品轮播图区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <p>
            购买数量：
            <numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
          </p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
            <!-- 分析：如何实现加入购物车的时候，拿到选择的数量 -->
            <!-- 1. 经过分析发现：按钮属于 goodsinfo 页面，数字属于 numberbox 组件 -->
            <!-- 2. 由于涉及到了夫子组件的嵌套了，所以，无法直接在 goodsinfo 页面中
            获取到选中的商品的数量-->
            <!-- 3. 怎么解决这个问题：涉及到了子组件向父组件传值了（时间调用机制） -->
            <!-- 4. 事件调用的本质：父组件向子组件传递方法，子组件调用这个方法，同时把
            数据当作参数传递给这个方法-->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{goodsinfo.goods_no}}</p>
          <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
          <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/goodsinfo_numbox.vue";
import swiper from "../subcomponents/swiper.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id, //获取传过来的商品id
      goodsinfo: {}, //商品对象
      lunbotuList: [], //保存轮播图的数据
      ballFlag: false, //控制小球的隐藏和显示的标识符
      selectedCount: 1 //保存用户选中的商品数量，默认为1
    };
  },
  created() {
    this.getGoodsInfo();
    this.getLunbotu();
  },
  methods: {
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        } else {
          Toast("获取商品详情失败!");
        }
      });
    },
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.img = item.src;
          });
          //成功了
          this.lunbotuList = result.body.message;
        } else {
          //失败了
          Toast("加载轮播图失败");
        }
      });
    },
    goDesc(id) {
      //使用编程式导航跳转到图文介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      //使用编程式导航跳转到商品评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      //添加到购物车
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      //小球动画优化思路：
      //1. 先分析导致动画不准确的原因：我们把小球最终位移到的位置，已经局限了某一分辨率
      //下的滚动条未滚动的情况下；
      //2. 只要分辨率和测试的不一样，或者滚动条的有一定的滚动距离之后，问题就出现了；
      //3. 因此，我们经过分析，得到结论：不能把位置的横纵坐标直接写死了，而是应该根据
      //不同的情况，动态计算这个坐标值；
      //4. 经过分析得出解题思路：先得到徽标的横纵坐标，再得到小球的横纵坐标，然后让
      //y值求差，x值也求差，得到的结果，就是横纵坐标要位移的距离；
      //5. 如何获取徽标和小球的位置？？？ domObject.getBoundingClientRect()

      //获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //获取徽标在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      //注意这里是``不是''
      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.26,.83,.67)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      // 当子组件选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.selectedCount = count;
      console.log('父组件拿到的数据'+this.selectedCount)
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0px;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 150px;
  }
}
</style>
