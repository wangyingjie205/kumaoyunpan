 <template>
    <div>
    <h1>欢迎使用酷猫云盘管理系统</h1>
    <h2>使用说明</h2>
    <h3>私人云盘:第一次登录会出现内容区撑满应用的现象,请登录后重新打开应用。</h3>
    <h3>坚果云盘：每次使用都需要重新登录。</h3>
    <h3>
      腾讯微云：如需上传文件或文件夹请点击
      <el-button type="primary" @click="btn2">这里</el-button>进行文件或文件夹的上传。
    </h3>
    <h3>亿方云盘：目前暂不支持第三方登录。</h3>
    <h3>文件传输：功能正常。</h3>
    <h3>
      关于备份：请点击
      <el-button type="primary" class="btn1" @click="btn3">这里</el-button>进行下载，安装即可使用。网站域名为https://cloud.seafile.com/
    </h3>
    <h3>注意：每次使用完毕后请注销各个账户保证用户的安全。</h3>
    </div>

</template>

<script>
const { shell } = require("electron");
export default {
    mounted() {
    document.title = "酷猫云盘管理器";
  },
  methods: {
    btn2() {
      shell.openExternal("https://www.weiyun.com/");
    },
    btn3() {
      shell.openExternal("https://www.seafile.com/download/");
    }
  }
}

</script>

<style scoped>
 h1 {
  text-align: center;
}

h2 {
  margin-left: 50px;
}

h3 {
  margin-left: 100px;
}

.btn1 {
  margin-left: 10px;
  font-size: 10px;
} 
</style>