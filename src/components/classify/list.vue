<template>
  <div class="list">
    <div class="left">
      <ul>
        <li
          :class="{'active':index == ind}"
          @click="change(index)"
          v-for="(item,index) in shopList"
          :key="item._id"
        >{{item.title}}</li>
      </ul>
    </div>
    <div class="right">
      <ul>
        <li v-for="(item) in shopShow" :key="item._id" @click="details(item._id)">
          <img :src="'http://localhost:3000'+item.imgurl" alt />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopList: [],
      ind: 0,
      shopShow: [],
      data: null
    };
  },
  methods: {
    change(i) {
      this.ind = i;
      this.shopShow = this.data[i].children;
    },
    details(id) {
        console.log(id)
      this.$router.push({
        path: "/details",
        query: { id: id }
      });
    }
  },
  created() {
    this.$http.get("/api/catelist").then(res => {
      console.log(res.data.data);
      this.shopList = res.data.data;
    });
    this.$http.get("/api/categoods").then(res => {
      console.log(res);
      this.data = res.data.data;
      this.shopShow = res.data.data[0].children;
    });
  }
};
</script>

<style lang="less" scoped>
.list {
  display: flex;
  .left {
    width: 100px;
    ul {
      li {
        height: 40px;
        text-align: center;
        line-height: 40px;
        background-color: #95c5c8;
      }
      li.active {
        background: rgb(93, 172, 129);
        color: #ffe720;
      }
    }
  }
  .right {
    flex: 1;
    padding-left: 10px;
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 48%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>