<template>
  <el-dialog
    class="assign-role"
    title="分配角色"
    :visible="showRoleDialog"
    @close="handleCloseDialog"
    @open="handleOpenDialog"
  >
    <!-- 这里准备复选框 -->
    <el-checkbox-group v-model="checkList" v-loading="loading">
      <el-checkbox
        v-for="item in roleList"
        :key="item.id"
        :label="item.id"
      >
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>

    <template #footer>
      <el-button type="primary" size="small" @click="clickAssignRoles">确定</el-button>
      <el-button size="small" @click="handleCloseDialog">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { reqGetRoleList } from '@/api/setting'
// import { get } from 'js-cookie'
import { reqAssignRoles, reqGetUserInfo } from '@/api/user'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      roleList: null,
      checkList: [],
      loading: false
    }
  },
  methods: {
    // 关闭对话框的函数
    handleCloseDialog() {
      this.$emit('update:showRoleDialog', false)
      this.checkList = []
    },
    // dialog 的open事件 打开后的事件
    handleOpenDialog() {
      this.loading = true
      // created 发请求太早了, 组件是一直在的
      // 获取角色列表
      // this.getRoleList()
      // 获取当前员工角色信息用于回显
      // this.getEmployeeDetail()
      Promise.all([this.getRoleList(), this.getRoleById()]).then(() => {
        this.loading = false
      })
    },
    // 获取角色列表
    async getRoleList() {
      const { data } = await reqGetRoleList(1, 99999)
      // console.log(res)
      this.roleList = data.rows
    },
    async getRoleById() {
      const { data } = await reqGetUserInfo(this.userId)
      this.checkList = data.roleIds
    },
    async clickAssignRoles() {
      const res = await reqAssignRoles(this.userId, this.checkList)
      this.showRoleDialog = false
      this.$message.success(res.message)
    }
  }
}
</script>
