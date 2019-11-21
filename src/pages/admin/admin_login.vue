<template>
  <div class="container">
    <el-container>
      <el-main>
        <h1>后台管理系统</h1>
        <el-form label-position="right" label-width="80px">
          <el-form-item label="账号">
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password"></el-input>
          </el-form-item>
        </el-form>
         <div class="btns">
      <el-button type="success" @click="login">登录</el-button>
    </div>
      </el-main>
    </el-container>
    <div id="myEcharts" ref="myDom"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username:"",
      password:"",
      prices:[],
      titles:[]

    };
  },
  methods: {
    login(){
      this.$http.post("/api/login",{
        username:this.username,
        password:this.password
      }).then(res=>{
        if(res.data.status == 1){
          sessionStorage.setItem('adminuser',res.data.data.username)
          this.$router.push("/admin")
        }
      })
    }
  },
  created() {
    this.$http.get("/api/goodslist").then(res=>{
      console.log(res)
      res.data.data.forEach(item=>{
        this.prices.push(item.price)
        this.titles.push(item.title)
        this.$nextTick(()=>{
          let myEcharts = this.$echarts.init(this.$refs.myDom)
          myEcharts.setOption({
            title:{
              text:"商品价格"
            },
            //鼠标放上去显示的东西
            tooltip:{},
            //图例
            legend:{
              data:["价格"]
            },
            //底部x轴名字
            xAxis:{
              data:this.titles
            },
            yAxis:{},
            //表格中重要数据
            series:[{
                //必须和legend中的名字一致
                name:"价格",
                //图表类型
                type:"bar",
                //表中数据
                data:this.prices
            }]
          })
        })
      })
    })
  },
};
</script>

<style lang="less" scoped>
.container{
  width: 600px;
  height: 400px;
  margin:100px auto;
  h1{
    height: 100px;
    text-align: center;
    line-height: 100px;
  }
  #myEcharts{
    width: 1000px;
    height: 500px;
  }
}
.btns{
  text-align: center;
}
</style>