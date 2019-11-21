<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="60" label="编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
					<el-button type="primary" size="small" @click="editVip(scope.row)">编辑</el-button>
				</template>
      </el-table-column>
    </el-table>
     <el-dialog title="密码修改" :visible.sync="dialogVisible" width="30%">
      <masks :detail="detail" @hide="hide"></masks>
    </el-dialog>
  </div>
</template>

<script>
import masks from "../../components/vip/masks";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible:false,
      detail:"",
    }
  },
  methods: {
    editVip(row) {
      this.detail = row;
      this.dialogVisible = true
    },
    hide(){
      this.dialogVisible = false
    }
  },
  components:{
    masks
  },
  created() {
    this.$http.get("/api/memberlist").then(res => {
      console.log(res);
      if(res.data.status == 1){
        this.tableData = res.data.data;
      }
    });
  }
};
</script>

<style scoped>
</style>