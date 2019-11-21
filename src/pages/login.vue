<template>
  <div>
    <van-nav-bar title="登录12345" left-text="返回" left-arrow/>
    <van-cell-group>
      <van-field v-model="username" label="用户名" placeholder="请输入用户名" required/>
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
      <van-button color="linear-gradient(to right, #5fd1b8, #97e5db)" type="primary" @click="login" size="large">登录</van-button>
    </van-cell-group>
    <van-button class="rou" type="primary" to="/register">注册</van-button>
  </div>
</template>

<script>
export default {
    data() {
    return {
      username: "",
      password: "",
      url:""
    }
  },
  methods: {
      login() {
          this.$http.post("/api/memberlogin",{
              username:this.username,
              password:this.password
          }).then(res=>{
              console.log(res)
              this.$store.commit("edit", res.data.data.username);
              localStorage.setItem("id",res.data.data._id)
              localStorage.setItem("uname",res.data.data.username)
              this.$router.push(localStorage.getItem("url"))
          })
      },
      // goregister(){
      //   this.$route.push("/register")
      // }
  },
  beforeRouteEnter(to,from,next){
      localStorage.setItem('url',from.fullPath)
      next()
  }
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