<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="账号" v-if="type != '添加'">
				<el-input v-model="atDetail._id" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="用户">
				<el-input v-model="atDetail.username"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="atDetail.password"></el-input>
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
			atDetail: {
				username: "",
				password: ""
			}
		};
	},
	created() {
		if (this.detail) {
			this.$http.get("/api/userinfo?id=" + this.detail).then(res => {
				console.log(res);
				this.atDetail = res.data.data;
			});
		}
	},
	methods: {
		sure() {
			if (this.type == "编辑") {
				this.$http
					.post("/api/useredit", {
						id: this.atDetail._id,
						username: this.atDetail.username,
						password: this.atDetail.password
					})
					.then(res => {
						console.log(res);
						if (res.data.status == 1) {
							this.$emit("hide");
							this.$emit("getList");
						}
					});
			} else {
				this.$http
					.post("/api/useradd", {
						username: this.atDetail.username,
						password: this.atDetail.password
					})
					.then(res => {
						console.log(res);
						if (res.data.status == 1) {
							this.atDetail = ""
							this.$emit("hide");
							this.$emit("getList");
						}
					});
			}
		}
	},
	props: ["detail", "type"],
	watch: {
		type(newVal) {
			if (newVal == "添加") {
				this.atDetail = {
					username: "",
					password: ""
				};
			} else {
				this.$http.get("/api/userinfo?id=" + this.detail).then(res => {
					console.log(res);
					this.atDetail = res.data.data;
				});
			}
		},
		detail(newVal,oldVal){
			console.log(newVal,"新ID")
			console.log(oldVal,"旧ID")
			if(newVal != oldVal){
				this.$http.get("/api/userinfo?id=" + this.detail).then(res => {
					this.atDetail = res.data.data;
				});
			}
		}
	}
};
</script>

<style scoped>
</style>