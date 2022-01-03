<template>
  <div class="permission-container">
    <div class="app-container">
      <!-- 表格 -->
      <el-card>
        <div style="text-align: right; margin-bottom: 20px">
          <el-button type="primary" size="small" @click="addPerm(1,'0')">添加权限</el-button>
        </div>
        <el-table border :data="permissionList" row-key="id">
          <el-table-column label="名称" prop="name" />
          <el-table-column label="标识" prop="code" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作">
            <template #default="{row}">
              <el-button v-if="row.type === 1" size="small" type="text" @click="addPerm(2,row.id)">添加权限点</el-button>
              <el-button size="small" type="text" @click="clickEdit(row.id)">查看</el-button>
              <el-button size="small" type="text" @click="delPermission(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 新增/编辑的弹层 -->
      <el-dialog :visible="showDialog" :title="perTitle" @close="showDialog = false">
        <!-- 表单内容 -->
        <el-form label-width="100px">
          <el-form-item label="权限名称">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item label="权限标识">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="权限启用">
            <el-switch
              v-model="formData.enVisible"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
            />
            <!-- active-value="1" 	switch 打开时的值
               inactive-value="0"   switch 关闭时的值
           -->

          </el-form-item>
        </el-form>

        <template #footer>
          <div style="text-align: right;">
            <el-button @click="closeShowDialog">取消</el-button>
            <el-button type="primary" @click="clickSubmit">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reqAddPermission, reqDelPermission, reqGetPermissionList, reqGetPermissionDetail, reqUpdatePermission } from '@/api/permission'
import { trasfList2Tree } from '@/utils'
// import { reqGetPersonalDetail } from '@/api/employee'
export default {
  name: 'Permission',
  data() {
    return {
      permissionList: [],
      showDialog: false,
      formData: {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 权限名称
        code: '', // 权限标识,用于将来判断
        description: '', // 权限描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    }
  },
  computed: {
    perTitle() {
      return this.formData.id ? '查看编辑权限点' : '添加权限点'
    }
  },
  created() {
    this.getPermission()
  },
  methods: {
    closeShowDialog() {
      this.showDialog = false
      // 没有校验 手动重置
      this.formData = {
        enVisible: '0', // 启用禁用, 0禁用, 1启用
        name: '', // 权限名称
        code: '', // 权限标识,用于将来判断
        description: '', // 权限描述
        type: '', // 类型标记了一级(页面访问权) 二级(按钮操作权)
        pid: '' // 添加到哪个节点下
      }
    },
    async getPermission() {
      const { data } = await reqGetPermissionList()
      console.log(data)
      const TreeArr = trasfList2Tree(data, '0')
      this.permissionList = TreeArr
    },
    addPerm(type, pid) {
      this.showDialog = true
      // console.log(id)
      this.formData.type = type
      this.formData.pid = pid
    },
    async clickSubmit() {
      let res
      if (this.formData.id) {
        res = await reqUpdatePermission(this.formData)
      } else {
        res = await reqAddPermission(this.formData)
      }

      this.$message.success(res.message)
      this.closeShowDialog()
      this.getPermission()
    },
    delPermission(id) {
      this.$confirm('将要删除权限,需要确定一下呢!!!', '温馨提示', { type: 'warning' }).then(async() => {
        const res = await reqDelPermission(id)
        this.$message.success(res.message)
        this.getPermission()
      }).catch(() => console.log('取消删除'))
    },
    async clickEdit(id) {
      this.showDialog = true
      const { data } = await reqGetPermissionDetail(id)
      console.log(data, 654)
      this.formData = data
    }
  }
}
</script>
