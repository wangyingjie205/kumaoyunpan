<template>
  <div>
    <!-- 菜单栏 -->
    <el-form
      :inline="true"
      :model="formInline"
      label-width="100px"
      class="demo-ruleForm"
      style="width:100%;"
    >
      <el-form-item>
        <el-button type="primary" plain @click="createFile">新建文件</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="createDir">新建文件夹</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" plain @click="dakai">编辑器</el-button>
      </el-form-item>
      <el-form-item label>
        <el-input
          id="input"
          @input="reload"
          v-model="formInline.basepath"
          placeholder="请在此输入框中输入磁盘或目录的路径,并以'/'结尾,windows:C:/,linux: /,注意:请确保路径下没有不可读的系统文件.若子目录文件较多请耐心等待."
          style="width:1341px;"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="none" id="input2" style="margin-bottom:10px;">
          <el-input
            v-model="filename"
            placeholder="请在此输入框中输入,点击提交后为保证正常运行,请重新输入目录或磁盘的值."
            style="width:1341px;"
            id="input3"
          ></el-input>
        </div>
        <el-button type="primary" id="bt1" class="none" @click="btn1">提交</el-button>
        <el-button type="primary" id="bt2" class="none" @click="btn2">提交</el-button>
        <el-button type="primary" id="bt3" class="none" @click="btn3">提交</el-button>
        <el-button type="primary" id="bt5" class="none" @click="btn5">提交</el-button>
      </el-form-item>
    </el-form>

    <!-- 文件列表 1340-->
    <el-table :data="data" border style="width: 1341px; margin-top: -50px;">
      <el-table-column class="name-wrapper" prop="number" label="序号" width="100px"></el-table-column>
      <el-table-column prop="name" label="名称" width="360px"></el-table-column>
      <el-table-column prop="type" label="类型" width="100px"></el-table-column>
      <el-table-column prop="size" label="大小" width="100px"></el-table-column>
      <el-table-column prop="mtime" label="时间" width="200px">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>创建时间: {{ scope.row.ctime }}</p>
            <p>最后修改时间: {{ scope.row.mtime }}</p>
            <p>最后访问时间: {{ scope.row.atime }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.ctime }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop label="操作" width="480px">
        <template slot-scope="scope">
          <el-button type="info" plain @click="rename(scope.$index, scope.row)">重命名</el-button>
          <el-button button type="primary" plain @click="copyFile(scope.$index, scope.row)">复制</el-button>
          <el-button type="danger" plain @click="ulink(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const fs = require("fs");
const { ipcRenderer } = require("electron");
export default {
    mounted() {
    document.title = "酷猫云盘管理器";
  },
  data() {
    return {
      onname: null,
      filename: null,
      data: null,
      formInline: {
        data: null,
        basepath: localStorage.getItem("basePath")
      }
    };
  },
  methods: {
    dakai() {
          alert('点击了');


    ipcRenderer.send('openWindow');
    },
    // 复制文件或文件夹
    btn5() {
      const btn5 = document.getElementById("bt5");
      const input2 = document.getElementById("input2");
      const input3 = document.getElementById("input3");
      let stat = fs.statSync(this.formInline.basepath + this.onname);
      if (stat.isFile()) {
        function copyIt(from, to) {
          fs.writeFileSync(to, fs.readFileSync(from));
          //fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
        }
        copyIt(this.formInline.basepath + this.onname, input3.value);

        let shanchu = fs.unlinkSync(this.formInline.basepath + this.onname);
        console.log(shanchu);
      } else {
        let stat = fs.stat;
        let copy = function(src, dst) {
          // 读取目录中的所有文件/目录
          fs.readdir(src, function(err, paths) {
            if (err) {
              throw err;
            }
            paths.forEach(function(path) {
              var _src = src + "/" + path,
                _dst = dst + "/" + path,
                readable,
                writable;
              stat(_src, function(err, st) {
                if (err) {
                  throw err;
                }
                // 判断是否为文件
                if (st.isFile()) {
                  // 创建读取流
                  readable = fs.createReadStream(_src);
                  // 创建写入流
                  writable = fs.createWriteStream(_dst);
                  // 通过管道来传输流
                  readable.pipe(writable);
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()) {
                  exists(_src, _dst, copy);
                }
              });
            });
          });
        };
        // 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
        var exists = function(src, dst, callback) {
          fs.exists(dst, function(exists) {
            // 已存在
            if (exists) {
              callback(src, dst);
            }
            // 不存在
            else {
              fs.mkdir(dst, function() {
                callback(src, dst);
              });
            }
          });
        };
        exists(this.formInline.basepath + this.onname, input3.value, copy);
      }
      this.reload();
      this.$message({
        message: "操做过于复杂，请更新磁盘目录值后查看",
        type: "success"
      });
      btn5.style.display = "none";
      input2.style.display = "none";
      input3.style.display = "none";
      input3.value = null;
    },
    // 复制文件
    copyFile(index, row) {
      const btn5 = document.getElementById("bt5");
      const input2 = document.getElementById("input2");
      const input3 = document.getElementById("input3");
      btn5.style.display = "block";
      input2.style.display = "block";
      input3.style.display = "block";
      this.onname = row.name;
      console.log(this.onname);
    },
    // 删除文件或文件夹
    ulink(index, row) {
      console.log(row);
      let stat = fs.statSync(this.formInline.basepath + row.name);
      // 对目录进行判断
      if (stat.isFile()) {
        fs.unlinkSync(this.formInline.basepath + row.name);
      } else {
        function deleteall(path) {
          var files = [];
          if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function(file, index) {
              var curPath = path + "/" + file;
              if (fs.statSync(curPath).isDirectory()) {
                // recurse
                deleteall(curPath);
              } else {
                // delete file
                fs.unlinkSync(curPath);
              }
            });
            fs.rmdirSync(path);
          }
        }

        deleteall(this.formInline.basepath + row.name);
      }
      this.$message({
        message: "指令已执行,请检查是否成功",
        type: "success"
      });
      this.reload();
    },
    // 重命名
    btn3() {
      const btn3 = document.getElementById("bt3");
      const input2 = document.getElementById("input2");
      const input3 = document.getElementById("input3");
      fs.rename(
        this.formInline.basepath + this.onname,
        this.formInline.basepath + input3.value,
        err => {
          if (err) {
            throw err;
          }
          this.$message({
            message: "指令已执行,请检查是否成功",
            type: "success"
          });
        }
      );
      btn3.style.display = "none";
      input2.style.display = "none";
      input3.style.display = "none";
      input3.value = null;
      this.reload();
    },
    // 重命名
    rename(index, row) {
      const btn3 = document.getElementById("bt3");
      const input2 = document.getElementById("input2");
      const input3 = document.getElementById("input3");
      btn3.style.display = "block";
      input2.style.display = "block";
      input3.style.display = "block";
      this.onname = row.name;
      console.log(this.onname);
    },
    // 新建文件夹
    btn2() {
      const btn2 = document.getElementById("bt2");
      const input = document.getElementById("input2");
      const input3 = document.getElementById("input3");

      fs.mkdir(this.formInline.basepath + input3.value, err => {
        if (err) throw err; // 如果出现错误就抛出错误信息

        this.$message({
          message: "指令已执行,请检查是否成功",
          type: "success"
        });
      });
      this.reload();
      btn2.style.display = "none";
      input.style.display = "none";
      input3.style.display = "none";
      input3.value = null;
    },
    // 新建文件夹
    createDir() {
      const btn2 = document.getElementById("bt2");
      const input = document.getElementById("input2");
      const input2 = document.getElementById("input3");
      btn2.style.display = "block";
      input2.style.display = "block";
      input.style.display = "block";
    },
    // 新建文件
    btn1() {
      const btn1 = document.getElementById("bt1");
      const input3 = document.getElementById("input3");
      const input2 = document.getElementById("input2");
      console.log(input3.value);
      let _that = this;
      fs.writeFile(
        this.formInline.basepath + input3.value,
        "hello world!",
        function(err) {
          if (err) {
            return console.log(err);
          }
        }
      );
      this.$message({ message: "指令已执行,请检查是否成功", type: "success" });
      this.reload();
      btn1.style.display = "none";
      input2.style.display = "none";
      input3.style.display = "none";
      input3.value = null;
    },
    // 创建文件
    createFile() {
      const btn1 = document.getElementById("bt1");
      const input = document.getElementById("input2");
      const input2 = document.getElementById("input3");
      console.log(btn1, input2);
      btn1.style.display = "block";
      input2.style.display = "block";
      input.style.display = "block";
    },
    // 显示输入框
    show() {
      const input = document.getElementById("inputFilename");
      input.style.display = "block";
    },
    // 隐藏输入框
    upload() {
      const input = document.getElementById("inputFilename");
      const val = document.getElementById("val");
      this.filename = null;
      input.style.display = "none";
    },
    // 重新加载数据的函数
    reload() {
      // 获取输入的表单节点
      const input = document.getElementById("input");
      localStorage.setItem("basePath", input.value);
      console.log(input.value);

      // 定义一些一维数组用来存储文件的信息
      let flag = 0;
      let data = [];
      // 文件或文件夹名称
      let file = [];
      // 文件和文件夹
      let files = [];
      // 文件还是文件夹
      let type = [];
      // 是文件还是文件夹
      let dir = [];
      // 大小
      let Size = [];
      // 创建时间
      let ctime = [];
      // 访问时间
      let atime = [];
      // 修改时间
      let mtime = [];
      // 序号
      let number = [];

      // 一个读取目录的函数
      function readDirectory(path) {
        // 定义一个文件和文件夹的数组
        let path1 = path;
        // 读取文件夹的目录
        let readdir = fs.readdirSync(path);
        for (let i = 0; i < readdir.length; i++) {
          let path2 = path1 + "/" + readdir[i];
          let stat = fs.statSync(path2);
          // 对目录进行判断，如果是目录就放入目录数组，如果是文件放入文件数组
          if (stat.isFile()) {
            file[file.length] = readdir[i];
          } else {
            dir[dir.length] = readdir[i];
          }
        }

        return [dir, file];
      }

      // 获取文件目录
      readDirectory(this.formInline.basepath);
      // 将文件进行文类,判断是文件还是文件夹
      flag = file.length;
      // 将文件夹和文件夹两个数组合并,将文件放在前面
      files = file.concat(dir);
      for (let i = 0; i < flag; i++) {
        type[i] = "文件";
      }

      for (let i = flag; i < files.length; i++) {
        type[i] = "文件夹";
      }
      console.log(files, type);

      // 获取文件大小
      function getSize(path, name, p) {
        let stat = fs.statSync(path + name);
        let arr = ["B", "K", "M", "G", "T", "E"];
        let i = 0;
        let size = stat.size;
        // 换算文件的大小单位
        while (size > 1024) {
          size /= 1024;
          i++;
          size = parseInt(size);
        }
        size = size + arr[i];
        // 将换算好的大小存入Size数组
        Size[p] = size;
        return size;
      }
      for (var p = 0; p < flag; p++) {
        getSize(this.formInline.basepath, files[p], p);
      }
      console.log(Size);
      //将时间戳转换成正常时间格式
      function timestampToTime(timestamp) {
        var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        var h = date.getHours() + ":";
        var m = date.getMinutes() + ":";
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
      }
      try {
        function dirSize(path, name = "/", p) {
          var sum = 0;
          let arr = ["B", "K", "M", "G", "T", "E"];
          let i = 0;
          path = path + name;
          let readdir = fs.readdirSync(path);
          for (let i = 0; i < readdir.length; i++) {
            let path2 = path + "/" + readdir[i];
            let stat = fs.statSync(path2);
            // 对目录进行判断，如果是目录就放入目录数组，如果是文件放入文件数组
            if (stat.isFile()) {
              sum += stat.size;
              // size = sum + arr[i]
              // console.log(size)
            } else {
              dirSize(path2);
            }
          }
          // 换算文件夹的大小
          while (sum > 1024) {
            sum /= 1024;
            i++;
            sum = parseInt(sum);
          }
          sum = sum + arr[i];
          Size[p] = sum;
          return sum + arr[i];
        }

        // 调用查看文件夹大小的函数
        for (let i = flag; i < files.length; i++) {
          dirSize(this.formInline.basepath, files[i], i);
        }
        console.log(Size);
      } catch (err) {
        this.data = null;
      }

      //获取创建时间
      function timeInfo(path, name, i) {
        let stats = fs.statSync(path + "/" + name);
        let c = timestampToTime(stats.ctime);
        let a = timestampToTime(stats.atime);
        let m = timestampToTime(stats.mtime);
        // 将获取到的创建时间,修改时间,访问时间的值加入对应的数组
        ctime[i] = c;
        atime[i] = a;
        mtime[i] = m;
      }

      // 执行获取的函数
      for (let i = 0; i < files.length; i++) {
        timeInfo(this.formInline.basepath, files[i], i);
      }
      console.log(ctime, mtime, atime);

      // 根据文件和文件夹的个数创建对象
      for (let i = 0; i < files.length; i++) {
        data[data.length] = {
          name: null,
          type: null,
          size: null,
          ctime: null,
          mtime: null,
          atime: null,
          number: null
        };
      }

      // 将之前的零散数组存入大数组的对象里面
      for (let i = 0; i < files.length; i++) {
        data[i].name = files[i];
        data[i].type = type[i];
        data[i].size = Size[i];
        data[i].ctime = ctime[i];
        data[i].mtime = mtime[i];
        data[i].atime = atime[i];
        data[i].number = i + 1;
      }
      console.log(data);
      this.data = data;
      console.log(this.data);
    }
  },
  // 页面初始化完成加载数据
  mounted() {
    this.reload();
  }
};
</script>

<style scoped>
.none {
  display: none;
  margin-bottom: 50px;
}
</style>