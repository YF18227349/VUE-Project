<template>
  <div>
    <el-form>
      <el-form-item label="名称">
		<el-input v-model="formData.title"></el-input>
	  </el-form-item>
      <img style="width: 200px" :src="formData.imgurl ? 'http://localhost:3000'+formData.imgurl : ''"/>
      <el-form-item label="图片">
		<input type="file" ref="file">
	  </el-form-item>
      <el-form-item>
			<el-button type="primary" @click="sure">确定</el-button>
			<el-button type="danger">重置</el-button>
		</el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    data() {
		return {
            formData:{
                title:"",
                imgurl:""
            }   
		};
    },
    created() {
        this.$http.get("/api/bannerinfo",{
            params:{
                id:this.$route.query.id
            }
        }).then(res=>{
            console.log(res,11111)
            if(res.data.status == 1){
                this.formData = res.data.data
            }
        })
        if(this.$route.query.id){
            this.$http.get("/api/bannerinfo",{
                params:{
                    id:this.$route.query.id
                }
            }).then(res=>{
                console.log(res)
                if(res.data.status == 1){
                    this.formData = res.data.data;
                    // delete this.formData.status;
                    // delete this.formData.imgurl
                }
            })
        }
    },
    methods: {
        sure() {
            let form = new FormData()
            for(var key in this.formData){
                form.append(key, this.formData[key])
            }
            form.append("status",1);
            form.append("img",this.$refs.file.files[0])

            if(this.$route.query.id){
                form.append("id",this.$route.query.id)
                this.$http.post("/api/banneredit",form).then(res=>{
                    if(res.data.status == 1){
                        this.$router.push("/admin/banners")
                    }
                })
            } else{
                this.$http.post("/api/banneradd",form).then(res=>{
                    if(res.data.status == 1){
                        this.$router.push("/admin/banners")
                    }
                })
            } 
        }
    },
};
</script>

<style scoped>
</style>