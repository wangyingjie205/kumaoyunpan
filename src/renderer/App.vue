<template>
  <div id="app">
    <h1 class="login-title">用户登录</h1>
    <el-form ref="form" :model="form" label-width="80px" class="form">
      <!-- 账号密码输入框 -->
      <el-form-item class="item-width">
        <el-input v-model="form.name" placeholder="请输入用户名" ></el-input>
      </el-form-item>
      <el-form-item class="item-width">
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>

      <div></div>
      <el-form class="button-position">
        <el-form-item>
          <el-button type="primary" >登录</el-button>
          <el-button class="a">注册</el-button>
        </el-form-item>
      </el-form>
    </el-form>
  </div>
</template>

<script>
export default {
  //组件的表单数据
  data() {
    return {
      form: {
        name: "",
        password: ""
      }
    };
  },

  //组件的登陆注册方法
  methods: {}
};
</script>
  
<style scoped>
/* 设置背景图片自适应 */
#app {
  font-family: "Helvetica";
  font-weight: "bold";
  width: 1024px;
  height: 600px; /* 重点一 */
  margin: 0 auto;
  background-image: url("./assets/login.jpg");
  background-repeat: no-repeat;
  background-size: cover; /* 重点二 */
  overflow: auto;
}

/* 设置表单的位置 */
.form {
  margin-left: 500px;
  margin-top: 30px;
}

/* 设置边框的宽度 */
.item-width {
  width: 370px;
  border-radius: 50px;
}

/* 设置用户登陆文字样式 */
.login-title {
  padding-left: 675px;
  padding-top: 200px;
  color: rgb(31, 24, 130);
  font-size: 20px;
}

/* 设置登录位置 */
.button-position {
  margin-left: 120px;
  margin-top: 20px;
}


</style>
