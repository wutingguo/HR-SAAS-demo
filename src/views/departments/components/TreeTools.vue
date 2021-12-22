<template>
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px ;width: 100%;">
    <el-col :span="20">
      <span>{{ data.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <!-- 两个内容 -->
        <el-col :span="12">{{ data.manager }}</el-col>
        <el-col :span="12">
          <!-- 下拉菜单 element -->
          <el-dropdown>
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="add(data.pid)">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="roots">查看部门</el-dropdown-item>
              <el-dropdown-item v-if="roots" @click.native="del(data.id)">删除部门</el-dropdown-item>

            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Treetools',
  props: {
    data: {
      type: Object,
      required: true
    },
    roots: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    del(id) {
      this.$emit('del', id)
    },
    add(id) {
      this.$emit('add', id)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
