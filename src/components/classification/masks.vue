<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="名称">
				<el-input v-model="title"></el-input>
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
			title:""
		};
	},
	created() {
		if(this.parameter){
			this.$http.get("/api/cateinfo?id=" + this.parameter).then(res => {
				console.log(res);
				this.title = res.data.data.title;
			});
		}	
	},
	methods: {
		sure() {
			if (this.type == "编辑") {
			this.$http
					.post("/api/cateedit", {
						id: this.parameter,
						title: this.title,
						status:1
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
					.post("/api/cateadd", {
						title: this.title,
						status:1
					})
					.then(res => {
						console.log(res);
						if (res.data.status == 1) {
							this.title = ""
							this.$emit("hide");
							this.$emit("getList");
						}
					});
			}
		}
	},
	props: ["parameter", "type"],
	watch: {
		type(newVal) {
			if (newVal == "添加") {
				this.title = ""
			} else {
				this.$http.get("/api/cateinfo?id=" + this.parameter).then(res => {
					console.log(res);
					this.title = res.data.data.title;
				});
			}
		},
		parameter(newVal,oldVal){
			this.$http.get("/api/cateinfo?id=" + this.parameter).then(res => {
				this.title = res.data.data.title;
			});
		}
	}
};
</script>

<style scoped>
</style>