<template>
  <div class="container">
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer">
      <van-tabbar route>
        <van-tabbar-item replace to="/index/home" icon="wap-home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/index/classify" icon="apps-o">分类</van-tabbar-item>
        <van-tabbar-item replace to="/index/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item replace @click="states" icon="manager-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    
    }
  },
  methods: {
    states(){
      if(localStorage.getItem('id')){
        this.$router.push("/index/my/succeed")
      }else{
        this.$router.push("/login")
      }
    }
  }
};
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .main{
      flex: 1;
    }
    .footer{
        width: 100%;
        height: 50px;
    }
}

</style>