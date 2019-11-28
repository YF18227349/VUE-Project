<template>
  <div class="banner">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img :src="'http://localhost:3000'+item.imgurl" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
    data(){
        return{
          images:[]
        }
    },
    created(){
        this.$http.get("/api/bannerlist").then(res=>{
            console.log(res)
            this.images = res.data.data
        })
    }
};
</script>

<style lang="less" scoped>
.van-swipe {
  width: 100%;
  height: 300px;
}
</style>