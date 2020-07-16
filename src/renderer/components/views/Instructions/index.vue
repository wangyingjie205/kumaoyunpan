 <template>
      <div >
<h1>欢迎来到酷猫云盘管理系统登录界面</h1>
    <h2>使用说明</h2>
<h3>目前管理器可支持于腾讯微云、坚果云盘、亿方云盘，其他云盘后续推出，敬请谅解</h3>
    <h3>私人云盘:首页登录可能会出现内容杂乱过多的现象,您可登录后重启软件即可解决。</h3>
    <h3>坚果云盘：每次使用都需登录。</h3>
    <h3>
      腾讯微云：如需上传文件或文件夹请点击
      <el-button type="primary" class="btn1" @click="btn2">此处</el-button>进行文件或文件夹的上传。
    </h3>
    <h3>亿方云盘：仅支持亿方云盘账号登录。</h3>
    <h3>文件传输：目前无异常。</h3>
    <h3>
      关于备份：请进入<el-button type="primary" class="btn1" @click="btn3">此处</el-button>安装即可使用。网站域名为https://cloud.seafile.com/
    </h3>
    <h3>开发及测试人员需深刻注意：每次使用完毕后请注销各个账户保证用户的安全。</h3>
                            </div>
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
background:rgba(0,0,0,.5);
} 
</style>