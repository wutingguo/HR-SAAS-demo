import http from '@/utils/request'

/**
 * 用于请求部门列表数据
 */
export const reqGetDeparment = () => {
  return http({
    method: 'get',
    url: '/company/department'
  })
}
/**
 * 根据id删除部门
 */
export const reqDeldeparments = (id) => {
  return http({
    method: 'DELETE',
    url: `/company/department/${id}`
  })
}
