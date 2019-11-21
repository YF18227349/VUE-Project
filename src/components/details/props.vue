<template>
  <div class="container">
    <van-popup
      class="prop"
      v-model="myshow"
      @close="close"
      position="bottom"
      :style="{ height: '60%' }">
      <div class="commodity">
        <div class="imgs">
          <img :src="'http://localhost:3000'+ detailsData.imgurl" :alt="detailsData.title" />
        </div>
        <div>
          <p>￥{{detailsData.price}}</p>
          <p>库存199件</p>
        </div>
      </div>
      <div class="amount">
        <h3>购买数量</h3>
        <div class="btns">
          <button @click="sum">-</button>
          <span>{{count}}</span>
          <button @click="add">+</button>
        </div>
      </div>
      <div class="color">
        <h3>颜色</h3>
        <ul>
          <li v-for="(item,index) in color"
           :key="index" 
           @click="changeColor(item)"
           :class="{'active':item == colorTitle}">
           {{item}}
           </li>
        </ul>
      </div>
      <div class="size">
        <h3>内存</h3>
        <ul>
          <li v-for="(item,index) in size" 
          @click="changeSize(item)"
          :class="{'active':item == sizeTitle}"
          :key="index">
          {{item}}
          </li>
        </ul>
      </div>
      <van-goods-action>
        <van-goods-action-icon :text="'总价:￥'+count * detailsData.price" />
        <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data() {
    return {
      myshow: this.show,
      count: 1,
      color:["红色","黑色","白色","金色"],
      size:["16G","32G"],
      colorTitle:"",
      sizeTitle:""
    };
  },
  methods: {
    close() {
      this.$emit("hide", false);
    },
    addCart() {
      if(!this.colorTitle || !this.sizeTitle){
        Toast.fail('请选择规格');
        return false;
      }
      let userid = localStorage.getItem("id")
      if (!userid) {
        Toast.fail('请登录');
        this.$router.push('/login')
      }
      let goodsid = this.detailsData._id
      let goodsnum = this.count
      this.$http.post("/api/cartadd",{
        userid:userid,
        goodsid: goodsid,
        goodsnum:goodsnum
      }).then(res=>{
        console.log(res)
        if(res.data.status == 1){
           this.$router.push("/index/cart");
        }
      })
    },
    changeColor(color){
      this.colorTitle = color
    },
    changeSize(size){
      this.sizeTitle = size
    },
    sum(){
      if(this.count == 1){
        return false
      }
      this.count--;
    },
    add(){
      this.count++;
    }
  },
  watch: {
    show(newVal, oldVal) {
      this.myshow = newVal;
    }
  },
  props: ["show", "detailsData"]
};
</script>

<style lang="less" scoped>
.container {
  .prop {
    padding: 10px;
    .van-goods-action-icon {
      width: 45%;
      font-size: 18px;
      font-weight: 600;
    }
    .commodity{
      display: flex;
      .imgs{
        width: 100px;
        height: 100px;
        img{
          width: 100%;
        }
      }
    }
    .amount{
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btns{
        width: 90px;
        border: 1px solid #666;
        display: flex;
        margin-right: 5px;
        button{
          width: 30px;
          height: 30px;
          border: none;
          background: #fff;
          cursor: pointer;
        }
        span{
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-left: 1px solid #666;
          border-right: 1px solid #666;
        }
      }
    }
    .color{
      height: 80px;
      ul{
        display: flex;
        li{
          width: 80px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #D7D7D7;
          margin: 0 5px;
        }
        li.active{
          color:red;
          border: 1px solid red;
        }
      }
    }
    .size{
      height: 80px;
      ul{
        display: flex;
        li{
          width: 80px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #D7D7D7;
          margin: 0 5px;
        }
         li.active{
          color:red;
          border: 1px solid red;
        }
      }
    }
  }
}
</style>