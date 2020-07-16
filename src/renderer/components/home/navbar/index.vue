<template>
  <div class="navbar">
    <!--  default-active :　默认选中的菜单
            :router="true" true 为开启路由,开启之后, index值代表的就是路由地址
    -->
    <el-menu
      :router="true"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >

      <el-menu-item index="/NutCloud/">
        <i class="el-icon-s-cooperation"></i>
        <span slot="title">坚果云盘</span>
      </el-menu-item>

      <el-menu-item index="/TencentMicroCloud/">
        <i class="el-icon-user"></i>
        <span slot="title">腾讯微云</span>
      </el-menu-item>

      <el-menu-item index="/SkyDrive/">
        <i class="el-icon-s-help"></i>
        <span slot="title">亿方云盘</span>
      </el-menu-item>

      <el-menu-item index="/PrivateStorage/">
        <i class="el-icon-user-solid"></i>
        <span slot="title">私人云盘</span>
      </el-menu-item>

      <el-menu-item index="/Text/">
        <i class="el-icon-edit"></i>
        <span slot="title">编写文本</span>
      </el-menu-item>

      <el-menu-item index="/FileManagement/">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">文件管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>


<style scoped>
.el-menu {
  border-right: none;
}
</style>