<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="名称">
				<el-input v-model="password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="sure">确定</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			password:""
		};
	},
	created() {
		console.log(this.detail)
		if(this.detail){
			this.$http.get("/api/memberinfo?id=" + this.detail._id).then(res => {
				console.log(res,333);
				if(res.data.status == 1){
				  this.password = res.data.data.password;
				}
			});
		}	
	},
	methods: {
		sure() {
			this.$http
					.post("/api/memberedit", {
						id: this.detail._id,
						username:this.detail.username,
						password:this.password
					})
					.then(res => {
						console.log(res);
						if (res.data.status == 1) {
							this.$emit("hide");
						}
					});
		}
	},
	props: ["detail"],
	watch: {
		detail(newVal,oldVal){
		this.$http.get("/api/memberinfo?id=" + this.detail._id).then(res => {
			console.log(res,333);
			if(res.data.status == 1) {
			  this.password = res.data.data.password;
			}
		});
		}
	}
};
</script>

<style scoped>
</style>