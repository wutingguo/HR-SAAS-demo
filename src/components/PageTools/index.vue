<template>
  <el-card>
    <div class="page-tools">
      <div class="left">
        <!-- 如果没有给left插槽传递结构进来, 那么希望.tips这个盒子都不显示 -->
        <div v-if="$slots.left" class="tips">
          <i class="el-icon-info" />
          <slot name="left" />
        </div>
      </div>
      <div class="right">
        <slot name="right" />
      </div>
    </div>
  </el-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.page-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .tips {
    line-height: 34px;
    padding: 0px 15px;
    border-radius: 5px;
    border: 1px solid rgba(145, 213, 255, 1);
    background: rgba(230, 247, 255, 1);
    // font-size: 12px;
    i {
      margin-right: 10px;
      color: #409eff;
    }
  }
}
</style>
