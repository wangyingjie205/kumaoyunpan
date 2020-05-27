<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login('loginFormRef')">登录</el-button>
          <el-button type="info" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 用户注册表单 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        ref="loginFrom"
        :rules="rules"
        :model="form"
        label-width="100px"
        label-position="right"
        style="width: 400px"
      >
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="LOGINUSER('loginFrom')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
//引入登录，注册，他保证token的接口
import { Login, getUserInfo, loginUser } from "../../api/login";
export default {
  mounted() {
    document.title = "酷猫云盘管理器";
  },
  data() {
    return {
      //控制注册表单对话框
      dialogFormVisible: false,
      //注册表单的数据绑定对象
      form: {
        username: "",
        password: "",
        name: ""
      },
      formLabelWidth: "120px",
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: ""
      },
      //注册表单的验证规则
      rules: {
        username: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ]
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //用户注册接口
    LOGINUSER(loginFrom) {
      //判断表单是否填写正确
      this.$refs[loginFrom].validate(valid => {
        if (valid) {
          //填写正确发送注册表单的请求
          loginUser(
            this.form.username,
            this.form.password,
            this.form.name
          ).then(response => {
            const flag = response.data.flag;
            if (!flag) {
              //如果注册失败，提示表单已经被注册
              this.$message({
                message: "该账号已经被注册，请重新填写表单",
                type: "warning"
              });
              this.$refs.loginFrom.resetFields();
            } else {
              //注册成功，重新登录
              this.$message({
                message: "注册成功，请重新登录",
                type: "success"
              });
              this.dialogFormVisible = false;
              this.$refs.loginFrom.resetFields();
            }
          });
        } else {
          this.$message({ message: "请正确填写表单", type: "warning" });
        }
      });
    },
    //重置登录表单
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    login(loginFormRef) {
      //判断表单是否填写正确
      this.$refs[loginFormRef].validate(valid => {
        if (valid) {
          //请求token
          Login(this.loginForm.username, this.loginForm.password)
            .then(response => {
              if (response.data.flag) {
                //请求用户信息
                getUserInfo(response.data.token).then(response => {
                  const resp = response.data;
                  if (resp.flag) {
                    console.log(response.data);
                    //将信息存入本地
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("username", response.data.username);
                    localStorage.setItem("name", response.data.name);
                    //前往首页,并弹出提示框
                    this.$message({
                      message: "登录成功，正在跳转主页面",
                      type: "success"
                    });
                    this.$router.push("/Instructions/");
                  }
                });
              }
            })
            //账号或密码输入错误时，提醒用户重新输入
            .catch(error => {
              this.resetLoginForm();
              this.$message({
                message: "请输入正确的账号或密码",
                type: "warning"
              });
            });
        }
      });
    }
  }
};
</script>

<style scoped>
body {
  background-color: #409eff;
}

.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_box .avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.login_box .avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: 50%;
  background-color: #eee;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
