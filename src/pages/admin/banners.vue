<template>
  <div>
    <div>
			<el-button type="success" @click="add">图片添加</el-button>
		</div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="60" label="编号"></el-table-column>
      <el-table-column prop="title" label="名称"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-image style="width: 50%" :src="'http://localhost:3000'+scope.row.imgurl"></el-image>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="del(scope.row, scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false
    };
  },
  methods: {
    add(){
      this.$router.push("/admin/bannersChange")
    },
    edit(row) {
      this.$router.push("/admin/bannersChange?id=" + row._id)
    },
    del(row,scope) {
      this.$confirm("此操作将永久删除该条数据?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.$http
						.post("/api/bannerdel", {
							id: row._id
						})
						.then(res => {
							if (res.data.status == 1) {
								this.tableData.splice(scope.$index, 1);
								this.$message({
									type: "success",
									message: "删除成功!"
								});
							}
						});
				})
				.catch(() => {
					console.log("取消");
					this.$message({
						type: "info",
						message: "已取消删除"
					});
				});
    }
  },
  created() {
    this.$http.get("/api/bannerlist").then(res => {
      console.log(res.data.data);
      if(res.data.status == 1){
        this.tableData = res.data.data;
      }
    });
  }
};
</script>

<style lang="less" scoped>
</style>