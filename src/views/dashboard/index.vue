<template>
  <div class="dashboard-container" />
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
// sass sass-loader
// sass: css预处理器; 增强css的功能
// sass 语法 两大类:  1.  .sass(旧) 与stylus差不多   2.  .scss(新) 与less差不多
// 旧语法不能有花括号 分号

// @color: red;
$color: teal;
.dashboard-container {
  .box {
    width: 100px;
    height: 100px;
    background-color: $color;
  }
}
</style>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
