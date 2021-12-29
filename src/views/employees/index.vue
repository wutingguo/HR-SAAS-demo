<template>
  <div class="employees-container">
    <!-- app-container提供了内边距 -->
    <div class="app-container">
      <PageTools>
        <template #left>
          <span>总记录数: {{ total }} 条</span>
        </template>
        <template #right>
          <el-button type="warning" size="small" @click="$router.push('/import?type=user')">excel导入</el-button>
          <el-button type="danger" size="small" @click="handleExport">excel导出</el-button>
          <el-button type="primary" size="small" @click="showDialog = true">新增员工</el-button>
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
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
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
      <AddEmployees :show-dialog.sync="showDialog" @add-employees="getUserList" />
    </div>
  </div>
</template>

<script>
import { reqDelEmployee, reqGetUserList } from '@/api/employee'
import AddEmployees from './components/AddEmployees.vue'
import obj from '@/constant/employees'
import dayjs from 'dayjs'
const { hireType } = obj
export default {
  name: 'Employees',
  components: {
    AddEmployees
  },
  data() {
    return {
      page: 1,
      size: 5,
      userList: [],
      total: null,
      loading: false,
      showDialog: false
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 获取数据列表
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
      const res = hireType.find(item => item.id === +cellValue)
      return res ? res.value : '未知'
    },
    delFn(id) {
      this.$confirm('请确认删除!!!', '温馨提示', { type: 'warning' }).then(async() => {
        await reqDelEmployee(id)
        if (this.userList.length === 1 && this.page > 1) {
          this.page--
        }
        this.$message.success('删除成功!!!')
        this.getUserList()
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    async handleExport() {
      const headersArr = ['姓名', '手机号', '入职日期', '聘用形式', '转正日期', '工号', '部门']
      const headersRelations = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }

      const { data: { rows }} = await reqGetUserList(1, this.total)
      console.log(rows)
      // 把数组里面包裹多个对象的数据转成二维数组
      // 首先声明一个新的数组
      const res = []
      // 这里的rows是请求回来的[]数据,遍历他 是因为返回的数据的长度取决于每一项
      rows.forEach(item => {
        // 又声明一个数组把这个数组放在上面的数组中去,就会出现数组中包裹数组了
        const arr = []
        // headersArr表头的长度就是每一项需要有多少个数据
        headersArr.forEach(key => {
          // headersRelations上面对应的中英文键值对照,把里面数据对应的英文键取出来
          const englishKey = headersRelations[key]
          let val = item[englishKey]
          if (['timeOfEntry', 'correctionTime'].includes(englishKey)) {
            val = dayjs(val).format('YYYY年MM月DD日')
          }
          if (englishKey === 'formOfEmployment') {
            const { hireType } = obj
            const resultObj = hireType.find(v => v.id === +val)
            val = resultObj ? resultObj.value : '未知'
          }
          arr.push(val)
        })

        res.push(arr)
      })

      console.log(res)
      import('@/vendor/Export2Excel').then(excel => {
        console.log(excel)
        excel.export_json_to_excel({
          // 表格的表头
          header: headersArr,
          // 表格的主体数据(固定格式->二维数组)
          data: res,
          filename: '员工信息表',
          autoWidth: true, // 宽度自适应 非必填
          bookType: 'xlsx' // 文件格式 非必填
        })
      })
    }
  }
}
</script>

<style>

</style>
