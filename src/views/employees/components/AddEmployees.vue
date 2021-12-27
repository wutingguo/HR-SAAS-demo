<template>
  <el-dialog title="新增员工" :visible="showDialog" @close="closeDialog" @click.native="isShow=false">
    <!-- 表单 -->
    <el-form ref="addForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option v-for="item in hireType " :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          :value="formData.departmentName"
          style="width:50%"
          placeholder="请选择部门"
          @click.native.stop="handleFocus"
        />
        <!-- 树形组件 -->
        <div v-if="isShow" class="tree-box">

          <el-tree
            :data="treeDate"
            :props="{ label: 'name' }"
            @node-click="handleNodeClick"
          />

        </div>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="addFn">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { reqGetDeparment } from '@/api/departments'
import { trasfList2Tree } from '@/utils'
import obj from '@/constant/employees'
import { reqAddEmployee } from '@/api/employee'
const { hireType } = obj
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '', // 用户名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: ['blur', 'change'] },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: ['blur', 'change'] }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: ['blur', 'change'] }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: ['blur', 'change'] }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: ['blur', 'change'] }
        ],
        timeOfEntry: [
          { required: true, message: '请选择入职时间', trigger: ['blur', 'change'] }
        ]
      },
      treeDate: [],
      isShow: false,
      hireType

    }
  },
  methods: {
    closeDialog() {
      this.$emit('update:showDialog', false)
      this.$refs.addForm.resetFields()
    },
    // 渲染添加部门,数据转树形结构
    async handleFocus() {
      const { data: { depts }} = await reqGetDeparment()
      // console.log(depts)
      this.isShow = !this.isShow
      const res = trasfList2Tree(depts, '')
      console.log(res)
      this.treeDate = res
    },
    handleNodeClick(data) {
      console.log(data)
      if (data.children && data.children.length > 0) return
      // 上面对应输入框的值不能乱修改,要和后端接口的数据一致
      this.formData.departmentName = data.name

      this.isShow = false
    },
    addFn() {
      this.$refs.addForm.validate(async(flag) => {
        if (!flag) return
        const res = await reqAddEmployee(this.formData)
        this.$message.success(res.message)
        this.closeDialog()
        this.$emit('add-employees')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-box {
  position: absolute;
  width: 50%;
  min-height: 50px;
  max-height: 250px;
  left: 0;
  top: 45px;
  z-index: 100;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding-right: 5px;
  overflow: auto;
  background-color: #fff;

  ::v-deep {
    .el-tree-node__content {
      height: auto;
    }
  }
}
</style>

