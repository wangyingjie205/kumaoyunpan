<template>
  <div class="navbar">
    <!--  default-active :　默认选中的菜单
            :router="true" true表示开启路由模式,开启之后, index值代表的就是路由地址
    -->
    <el-menu
      :router="true"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="/Instructions/">
        <i class="el-icon-s-home"></i>
        <span slot="title">使用说明</span>
      </el-menu-item>
      <el-menu-item index="/PrivateStorage/">
        <i class="el-icon-user-solid"></i>
        <span slot="title">私人云盘</span>
      </el-menu-item>
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
      <el-menu-item index="/FileBackup/">
        <i class="el-icon-notebook-2"></i>
        <span slot="title">文件传输</span>
      </el-menu-item>

      <el-menu-item index="/FileManagement/">
        <i class="el-icon-s-grid"></i>
        <span slot="title">文件管理</span>
      </el-menu-item>
      <el-menu-item index="/Text/">
        <i class="el-icon-edit"></i>
        <span slot="title">文本编辑</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>


<style scoped>
.el-menu {
  border-right: none;
}
</style>