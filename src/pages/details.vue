<template>
  <div class="container">
    <div class="header">
      <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="main">
      <div class="imgs">
        <img :src="'http://localhost:3000'+detailsData.imgurl" alt />
      </div>
      <p class="title">{{detailsData.title}}</p>
      <p class="price">￥{{detailsData.price}}</p>
      <van-tabs v-model="active">
        <van-tab title="商品详情">商品详情商品详情商品详情商品详情商品详情</van-tab>
        <van-tab title="买家口碑">买家口碑买家口碑买家口碑买家口碑买家口碑</van-tab>
      </van-tabs>
    </div>
    <div class="footer">
      <van-goods-action>
        <van-goods-action-icon :text="'总价:￥'+detailsData.price" />
        <van-goods-action-button type="warning" text="加入购物车" @click="showProps"/>
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
    <props :show="show" @hide="hide" :detailsData="detailsData"></props>
  </div>
</template>

<script>
import props from "../components/details/props"
export default {
  data() {
    return {
      detailsData: [],
      active: 2,
      show:false
    };
  },
  components:{
    props
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/index/classify" });
      // this.$router.back()
      // this.$router.go(-1)
    },
    showProps(){
      this.show = true
    },
    hide(bool){
      this.show = bool
    }
  },
  created() {
    this.$http.get("/api/goodsinfo?id=" + this.$route.query.id).then(res => {
      console.log(res.data.data);
      this.detailsData = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  .main {
    .imgs {
      width: 100%;
      height: 220px;
      text-align: center;
      padding: 10px;
      img {
        height: 100%;
      }
    }
    p {
      width: 100%;
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
    }
  }
  .footer {
    .van-goods-action-icon{
      width: 45%;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>