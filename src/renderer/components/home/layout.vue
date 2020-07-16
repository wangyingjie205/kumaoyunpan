<template>
  <div>
      <app-header></app-header>
      <app-navbar></app-navbar>
      <app-main></app-main>
  </div>
</template>

<script>
//会导入 ./AppHeader下面的index.vue组件
import AppHeader from './header'
import AppNavbar from './navbar'
import AppMain from './main'

export default {
    components: { AppHeader, AppNavbar, AppMain}
}
</script>

<style >

.header {
    position: absolute;
    line-height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    background:rgba(0,0,0,.5);
}



.main {
    position: absolute;
    top:150px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow-y: auto;
    background:rgba(125,111,111,2);
}

.navbar {
    position: absolute;
    top: 50px;
    left: 0px;
    right: 0px;
    overflow-y: auto;
}
</style>