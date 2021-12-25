<template>
  <div class="employees-container">
    <!-- app-container提供了内边距 -->
    <div class="app-container">
      <PageTools>
        <template #left>
          <span>总记录数: 16 条</span>
        </template>
        <template #right>
          <el-button type="warning" size="small">excel导入</el-button>
          <el-button type="danger" size="small">excel导出</el-button>
          <el-button type="primary" size="small">新增员工</el-button>
        </template>
      </PageTools>
      <el-card v-loading="loading" style="margin-top: 10px;">
        <el-table :data="userList" border>
          <el-table-column label="序号" type="index" :index="indexFn" sortable="" width="100" />
          <el-table-column label="姓名" prop="username" sortable="" />
          <el-table-column label="手机号" prop="mobile" sortable="" />
          <el-table-column label="工号" prop="workNumber" sortable="" />
          <el-table-column label="聘用形式" :formatter="formatEmployment" prop="formOfEmployment" sortable="" />
          <el-table-column label="部门" prop="departmentName" sortable="" />
          <el-table-column label="入职时间" sortable="">
            <template #default="{row}">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delFn(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div style="height: 60px; margin-top: 10px">
          <el-pagination
            :current-page="page"
            :page-sizes="[1,2,3,4,5,6,7,8,9,10]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { reqDelEmployee, reqGetUserList } from '@/api/employee'
import obj from '@/constant/employees'
const { hireType } = obj
export default {
  name: 'Employees',
  data() {
    return {
      page: 1,
      size: 5,
      userList: [],
      total: null,
      loading: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      this.loading = true
      const { data } = await reqGetUserList(this.page, this.size)
      console.log(data, '000')
      this.userList = data.rows
      this.total = data.total
      this.loading = false
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.size = val
      this.page = 1
      this.getUserList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.page = val
      this.getUserList()
    },
    indexFn(index) {
      return index + 1 + (this.page - 1) * this.size
    },
    formatEmployment(row, column, cellValue, index) {
      const res = hireType.find(item => item.id === cellValue)
      return res ? res.value : '未知'
    },
    delFn(id) {
      this.$confirm('请确认删除!!!', '温馨提示', { type: 'warning' }).then(async() => {
        await reqDelEmployee(id)
        this.$message.success('删除成功!!!')
        this.getUserList()
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style>

</style>
