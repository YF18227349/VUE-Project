<template>
  <div class="container">
    <div class="header">
      <van-nav-bar title="购物车" />
    </div>
    <div class="main">
      <div class="primary">
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <input type="checkbox" v-model="item.checked" />
            <img :src="'http://localhost:3000'+item.goods_img" alt />
            <div class="btns">
              <button @click="edit(index,2)">-</button>
              <span>{{item.goods_num}}</span>
              <button @click="edit(index,1)">+</button>
            </div>
            <h3>￥{{item.goods_price}}</h3>
            <van-icon name="cross" @click="delOne(index)"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="tijiao">
      <div class="left">
        <label for>全选</label>
        <input type="checkbox" v-model="checkAll" />
      </div>
      <h3>
        合计:￥
        <span>{{total}}</span>
      </h3>
      <div class="right">
        <button>提交订单</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      list: [],

    };
  },
  methods: {
    edit(i,type){
      // let userid = localStorage.getItem('id')
      let userid = this.list[i].userid
      let goodsid = this.list[i].goodsid
      this.$http.post("/api/cartedit",{
        userid,
        goodsid,
        type:type
      }).then(res=>{
        console.log(res,1231)
        if(res.data.status == 1){
          if(type==1){
           this.list[i].goods_num++
          }else{
            if(this.list[i].goods_num == 1){
              return false
            }
            this.list[i].goods_num--
          }
        }
      }) 
    },
    delOne(i){
      console.log(this)
      this.$http.post("/api/cartdel",{
        id:this.list[i]._id
      }).then(res=>{
        console.log(res)
        if(res.data.status == 1){
          this.list.splice(i,1)
        }
      })
    }
  },
  computed: {
    checkAll: {
      get() {
        return this.list.every(item => {
          return item.checked;
        });
      },
      set(newVal) {
        this.list.forEach(item => {
          item.checked = newVal;
        });
      }
    },
    total() {
      let sum = 0;
      this.list.forEach(item => {
        if (item.checked) {
          sum += item.goods_price * item.goods_num;
        }
      });
      return sum;
    }
  },
  created() {
    let userid = localStorage.getItem("id");
    this.$http.get("/api/cartlist?userid=" + userid).then(res => {
      console.log(res.data.data);
      this.list = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  // display: flex;
  // flex-direction: column;
  width: 100%;
  height: 100%;
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .primary {
      flex: 1;
      ul {
        padding: 0 20px;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          img {
            width: 80px;
            height: 80px;
          }
          .btns {
            width: 90px;
            border: 1px solid #666;
            display: flex;
            margin-right: 5px;
            button {
              width: 30px;
              height: 30px;
              border: none;
              background: #fff;
              cursor: pointer;
            }
            span {
              width: 30px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border-left: 1px solid #666;
              border-right: 1px solid #666;
            }
          }
        }
      }
    }
    .van-submit-bar {
      width: 100%;
      position: initial;
    }
  }
  .tijiao {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 0 10px;
    margin: 10px 0;
    .right {
      display: flex;
      h3 {
        display: flex;
        align-items: center;
      }
      span {
        color: #ee0a24;
      }
      button {
        width: 120px;
        height: 40px;
        background: #ee0a24;
        border: none;
        color: #ffffff;
      }
    }
  }
}
</style>