<template>
  <div>
   <van-nav-bar title="注册" left-text="返回" left-arrow/>
    <van-cell-group>
      <van-field v-model="username" label="用户名" placeholder="请输入用户名" required/>
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
      <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" type="primary" @click="register" size="large">注册</van-button>
    </van-cell-group>
    <van-button class="rou" type="primary" to="/login">登录</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    register() {
      this.$http.post("/api/memberadd",{
        username:this.username,
        password:this.password
      }).then(res=>{
        console.log(res)
        if(res.data.status == 1){
          this.$router.push("/login")
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.rou{
  width: 60px;
  text-align: center;
  background: none;
  color: blue;
  border:none;
  line-height: 30px;
  float: right;
  height: 30px;
}
</style>