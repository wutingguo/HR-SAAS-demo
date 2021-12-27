<template>
  <div>
    <upload-Excel :on-success="handleSuccess" />
  </div>
</template>

<script>
import { reqAddEmployeeBatch } from '@/api/employee'
// import user from '@/store/modules/user'
export default {
  name: 'Import',
  methods: {
    handleSuccess({ header, results }) {
      // console.log(header, results)
      if (this.$route.query.type === 'user') {
        this.handleEmployeesBatch(header, results)
      }
    },
    async  handleEmployeesBatch(header, results) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const obj = {}
        for (const key in item) {
          const englishKey = userRelations[key]
          obj[englishKey] = item[key]
        }
        arr.push(obj)
      })
      const res = await reqAddEmployeeBatch(arr)
      console.log(res)
      this.$message.success('批量导入员工成功!')
      this.$router.push('/employees')
    }
  }
}
</script>

<style>

</style>
