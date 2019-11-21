<template>
  <div class="container">
    <el-container>
      <el-header>
        <h3>后台管理系统</h3>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col>
              <el-menu default-active="2" class="el-menu-vertical-demo" router>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-message"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item class="el-icon-suitcase" index="/admin/adminuser">管理员</el-menu-item>
                    <el-menu-item class="el-icon-user" index="/admin/vip">会员</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>商品管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item class="el-icon-menu" index="/admin/classification">分类管理</el-menu-item>
                    <el-menu-item class="el-icon-menu" index="/admin/goods">商品管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>图片管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item class="el-icon-menu" index="/admin/banners">轮播图</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>>

<script>
export default {
  methods: {
    
  }
};
</script>

<style lang="less" scoped>
.container {
  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
  }
  .el-header h3{
    height: 60px;
    line-height: 60px;
  }

  .el-aside {
    background-color: #d3dce6;
    color: #333;
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
}
</style>