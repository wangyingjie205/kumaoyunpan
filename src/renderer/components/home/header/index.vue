<template>
  <div class="header">
    <!-- 应用的首页链接 -->
    <a @click.stop="home">
      <img class="logo" src="../../../assets/logo.png" width="25px" />
      <span class="company">酷猫云盘管理系统</span>
    </a>

    <!-- 用户的下拉菜单 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
     <b>欢迎 {{name}} 用户</b>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
        <el-dropdown-item icon="el-icon-s-fold" command="b">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <!-- 修改密码对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="400px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        style="width: 300px"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
//引入修改密码，验证原始密码的接口
import { checkPwd, updatePwd } from "../../../api/password";
export default {
  data() {
    return {
      //用户昵称
      name: localStorage.getItem("name"),
      //控制修改用户的对话框
      dialogFormVisible: false,
      //用户账号
      user: localStorage.getItem("username"),
      //修改密码表单
      ruleForm: {
        oldPass: "",
        pass: "",
        checkPass: ""
      },
      //修改密码表单验证规则
      rules: {
        oldPass: [
          { required: true, message: "原密码不能为空", trigger: "blur" }
        ],
        pass: [{ required: true, message: "新密码不能为空", trigger: "blur" }],
        checkPass: [
          { required: true, message: "确认密码不能为空", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    home() {
      this.$router.push("/Instructions/");
    },
    handleCommand(command) {
      switch (command) {
        case "a":
          // 打开修改密码窗口
          this.handlePwd();
          break;
        case "b":
          // 退出系统
          this.handleLogout();
          break;
        default:
          break;
      }
    },
    //退出系统
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("username");
      this.$message({message: '退出成功', type: 'success'})
      this.$router.push("/login");
    },
    //打开修改密码窗口
    handlePwd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
        console.log("打开修改密码窗口");
      });
    },

    //修改密码
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //查看表单是否成功填写
          console.log("验证成功");
          const username = this.user;
          const password = this.ruleForm.oldPass;
          //填入老账号密码进行验证
          checkPwd(username, password).then(response => {
            const flag = response.data.flag;
            console.log(flag);
            //验证成功
            if (flag == true) {
              const newPass = this.ruleForm.pass;
              console.log(username, newPass);
              //判断新密码与确认密码是否相等
              if (this.ruleForm.pass == this.ruleForm.checkPass) {
                const password = this.ruleForm.checkPass;
                updatePwd(username, password).then(response => {
                  const flag = response.data.flag;
                  //如果修改成功，提示、删除本地信息，然后跳转登录页面，清空表单
                  if (flag == true) {
                    this.$refs.ruleForm.resetFields();
                    this.$message({
                      message: "修改成功，请重新登录",
                      type: "success"
                    });
                    localStorage.removeItem("token");
                    localStorage.removeItem("name");
                    localStorage.removeItem("username");
                    this.$router.push("/login");
                  } else {
                    //如果没有删除，则清空表单，且提示网路错误
                    this.$refs.ruleForm.resetFields();
                    this.$message({
                      message: "网络异常，请稍后刷新重试",
                      type: "warning"
                    });
                  }
                });
              } else {
                //两次密码不一致
                this.$refs.ruleForm.resetFields();
                this.$message({
                  message: "两次密码不一致",
                  type: "warning"
                });
              }
            } else {
              //老密码错误
              this.$refs.ruleForm.resetFields();
              this.$message({ message: "原始密码错误", type: "warning" });
            }
          });
        }
      });
    }
  }
};
</script>

<style>
.el-dropdown{
  float: right;
  margin-right: 70px;

}
.el-dropdown-link {
  cursor: pointer;
  color:black;
  font-size:20px;
}
.logo {
  vertical-align: middle;
  padding-left:25px;
 padding-right:15px;
}
.company {
  position: absolute;
  color:black;
}

a:hover {
  cursor: pointer;
}
</style>