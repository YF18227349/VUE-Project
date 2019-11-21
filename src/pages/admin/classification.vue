<template>
  <div>
    <div>
			<el-button type="success" @click="add">添加</el-button>
		</div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="60" label="编号"></el-table-column>
      <el-table-column prop="title" label="名称"></el-table-column>
      <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
			  <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="del(scope.row, scope)">删除</el-button>
		  </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%">
			<masks :type="type" :parameter="parameter._id" @hide="hide" @getList="getList"></masks>
		</el-dialog>
  </div>
</template>

<script>
import masks from "../../components/classification/masks"
export default {
  data() {
    return {
      tableData: [],
      dialogVisible:false,
      parameter:"",
      type:""
    }
  },
  components:{
    masks
  },
  methods: {
    add(){
      this.type = "添加"
      this.dialogVisible = true
    },
    edit(row){
      this.type = "编辑"
      this.parameter = row;
      this.dialogVisible = true
    },
    del(row,scope){
      console.log(scope);
			this.$confirm("此操作将永久删除该商品?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					this.$http
						.post("/api/catedel", {
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
    },
    hide(){
      this.dialogVisible = false
    },
    getList(){
      this.$http.get("/api/catelist").then(res => {
        console.log(res);
        this.tableData = res.data.data;
      });
    }
  },
  created() {
    this.getList()  
  }
};
</script>

<style scoped>
</style>