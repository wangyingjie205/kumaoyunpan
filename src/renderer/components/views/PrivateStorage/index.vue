<template>
  <div>
    <iframe src="https://cloud.seafile.com/" frameborder="0" width="100%" height="700px"></iframe>
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = "酷猫云盘管理器";
  }
}
</script>

<style scoped>
  div {
    position: relative;
    left: -10px;
    top: -10px;
  }
</style>