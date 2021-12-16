<template>
  <section class="app-main">
    <!-- transition标签 提供的一个组件过度的效果 -->
    <transition name="fade-transform" mode="out-in">
      <!--router-view 二级路由出口
      key 唯一标识避免多个页面使用同一个组件 导致缓存 ,试图无法更新
        -->
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
