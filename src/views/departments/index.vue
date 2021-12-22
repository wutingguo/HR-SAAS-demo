<template>
  <div class="departments-container">
    <!-- app-container提供了内边距 -->
    <div class="app-container">
      <el-card class="tree-card">
        <!-- 用了一个行列布局 -->
        <TreeTools :data="company" />
        <!-- 树形结构 -->
        <el-tree :data="departs" default-expand-all>
          <template #default="{data}">
            <TreeTools
              :data="data"
              :roots="roots"
              @del="delFn"
              @add="addFn"
            />
          </template>
        </el-tree>
      </el-card>
      <!-- dialog弹窗!!! -->
      <el-dialog title="新增部门" :visible="showDialog" @close="showDialog=false">
        <!-- 表单组件  el-form   label-width设置label的宽度   -->
        <!-- 匿名插槽 -->
        <el-form label-width="120px" :model="addForm" :rules="rules">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="addForm.name" style="width:80%" placeholder="1-10个字符" />
          </el-form-item>
          <el-form-item label="部门编码" prop="code">
            <el-input v-model="addForm.code" style="width:80%" placeholder="1-10个字符" />
          </el-form-item>
          <el-form-item label="部门负责人" prop="manager">
            <el-select v-model="addForm.manager" style="width:80%" placeholder="请选择" />
          </el-form-item>
          <el-form-item label="部门介绍" prop="introduce">
            <el-input v-model="addForm.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
          </el-form-item>
        </el-form>
        <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
        <div slot="footer">
          <el-button type="primary" size="small">确定</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { trasfList2Tree } from '@/utils'
import TreeTools from './components/TreeTools.vue'
import { reqDeldeparments, reqGetDeparment } from '@/api/departments'
export default {
  name: 'Departments',
  components: {
    TreeTools
  },
  data() {
    const validateName = (a, value, callback) => {
      console.log(this.departList, value, this.addID, 8520)
      const res = this.departList.filter((item) => item.pid === this.addID)
      console.log(res, 45646)
      const flag = res.some(item => item.name === value)
      console.log(flag)
      flag ? callback(new Error('同级部门名已存在')) : callback()
    }
    return {
      departs: [],
      departList: [],
      roots: true,
      company: {
        name: '传智教育',
        manager: '负责人'
      },
      showDialog: false,
      addID: null,
      addForm: {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: ['change', 'blur'] },
          { min: 1, max: 10, message: '部门名称只能是1-10位', trigger: ['blur', 'change'] },
          { validator: validateName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 10, message: '部门编码只能是1-10位', trigger: ['blur', 'change'] }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: ['blur', 'change'] }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: ['blur', 'change'] },
          { min: 1, max: 300, message: '部门介绍只能是1-300位', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created() {
    this.Getdeparment()
  },
  methods: {
    async  Getdeparment() {
      const { data: { depts }} = await reqGetDeparment()
      console.log(depts, 'woaini')
      this.departList = depts
      // this.departs = depts
      console.log(trasfList2Tree(depts, ''), 8888)
      this.departs = trasfList2Tree(depts, '')
    },
    delFn(id) {
      //
      this.$confirm('此操作将永久删除部门,是否继续?', '温馨提示', { type: 'warning' }).then(async() => {
        const res = await reqDeldeparments(id)
        console.log(res)
        this.$message.success('删除成功')
        this.Getdeparment()
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    addFn(id) {
      this.showDialog = true
      this.addID = id
    }
  }
}
</script>

<style lang='scss' scoped>
// ::v-deep 深度作用选择器
// scoped 是希望样式仅在当前组件生效 => 原理?
// 原理: 加上scoped之后, 就相当于当前组件内所有标签都会加上 一个属性 data-v-e735600c(唯一的)
//        之后所有的css选择器上都会默认添加一个属性选择器 .el-card[data-v-e735600c]
// 注意点: scoped只会给当前组件内所有标签加一个属性, 并不会给子组件内的标签加这个属性
// 如何解决: 深度作用选择器 样式穿透=>能作用到子组件的样式了
// less  /deep/   scss  ::v-deep
// 总结: 如果你希望样式仅在当前组件生效 请加scoped; 如果你还希望样式能影响到子组件, 请加::v-deep
.el-tree {
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before  {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>
