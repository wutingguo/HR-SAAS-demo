<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small">添加权限</el-button>
        </div>
        <el-table border :data="permissionList">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button v-if="row.type === 1" size="small" type="text">添加权限点</el-button>
              <el-button size="small" type="text">查看</el-button>
              <el-button size="small" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { reqGetPermissionList } from '@/api/permission'
import { trasfList2Tree } from '@/utils'
export default {
  name: 'Permission',
  data() {
    return {
      permissionList: []
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    async getPermission() {
      const { data } = await reqGetPermissionList()
      console.log(data)
      const TreeArr = trasfList2Tree(data, '0')
      this.permissionList = TreeArr
    }
  }
}
</script>
