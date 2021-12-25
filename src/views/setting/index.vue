<template>
  <div class="setting-container">
    <!-- app-container提供了内边距 -->
    <div class="app-container">
      <el-card v-loading="loading">
        <el-tabs v-model="activeName">
          <el-tab-pane label="角色管理" name="first">
            <el-button size="small" type="primary" style="margin:15px 0" @click="addFn"><i class="el-icon-plus" />添加角色</el-button>
            <el-table style="width:100%;margin:10px 0" border :data="roleList">
              <el-table-column label="序号" width="120" type="index" :index="indexMethod" />
              <el-table-column label="角色名" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              :current-page="obj.page"
              :page-sizes="[1,2,3,5,7]"
              :page-size="obj.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
            <!-- @size-change="handleSizeChange" -->
            <!-- @current-change="handleCurrentChange" -->
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="second">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyForm.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyForm.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyForm.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyForm.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog :title="roleTitle" :visible.sync="dialogFormVisible" @close="closeDialog">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="角色名称" label-width="80px" prop="name">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="角色描述" label-width="80px" prop="description">
            <el-input v-model="form.description" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlChange">确 定</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { reqAddRole, reqDelRole, reqGetCompanyById, reqGetRoleDetail, reqGetRoleList, reqUpdateRole } from '@/api/setting'
import { mapState } from 'vuex'
export default {
  name: 'Setting',
  data() {
    return {
      activeName: 'first',
      obj: {
        page: 1,
        pagesize: 5
      },
      roleList: [],
      total: null,
      dialogFormVisible: false,
      roleTitle: '添加角色',
      loading: false,
      form: {
        name: '',
        description: ''
      },
      companyForm: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''
      },
      rules: {
        name: [
          { required: true, message: '角色名不能为空', trigger: ['change', 'blur'] }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: ['change', 'blur'] }

        ]
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  },
  created() {
    this.getRole()
    this.getcompanyInfo()
  },

  methods: {
    async getRole() {
      this.loading = true
      const { data: { rows, total }} = await reqGetRoleList(this.obj)
      // console.log(rows, total)
      this.roleList = rows
      this.total = total
      this.loading = false
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.obj.pagesize = val
      this.obj.page = 1
      this.getRole()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.obj.page = val
      this.getRole()
    },
    indexMethod(index) {
      return index + 1 + (this.obj.page - 1) * this.obj.pagesize
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        description: ''
      }
    },
    addFn() {
      this.roleTitle = '添加角色'
      this.dialogFormVisible = true
      console.log(this.userInfo.companyId)
    },
    handlChange() {
      this.$refs.form.validate(async(flag) => {
        if (!flag) return
        let res
        if (this.form.id) {
          res = await reqUpdateRole(this.form)
        } else {
          res = await reqAddRole(this.form)
        }

        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.getRole()
      })
    },
    delRole(id) {
      this.$confirm('此操作将删除角色,请确定', '温馨提示', { type: 'danger' }).then(async() => {
        const res = await reqDelRole(id)
        this.$message.success(res.message)
        // console.log(this.roleList.length, 9502)
        if (this.roleList.length === 1 && this.obj.page > 1) {
          this.obj.page--
        }
        this.getRole()
      }).catch(() => {
        console.log('已取消删除')
      })
    },
    async editRole(id) {
      this.roleTitle = '编辑角色'
      const { data } = await reqGetRoleDetail(id)
      this.dialogFormVisible = true

      // console.log(res)
      this.form = data
    },
    async getcompanyInfo() {
      console.log(this.userInfo, 111111122)
      const { data } = await reqGetCompanyById(this.userInfo.companyId)
      // console.log(data)
      // console.log(this.userInfo.companyId, 4654664888)
      this.companyForm = data
    }
  }
}
</script>

<style>

</style>
