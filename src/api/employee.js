// 获取员工信息等模块
import request from '@/utils/request'

export const reqGetUserList = (page = 1, size = 5) => {
  return request({
    method: 'get',
    url: '/sys/user',
    params: {
      page,
      size
    }
  })
}

/**
 * 删除员工 (直接 C)
 */
export function reqDelEmployee(id) {
  return request({
    method: 'delete',
    url: `/sys/user/${id}`
  })
}
/**
 * 用于增加员工
 * @param {*} form 数据
 */
export const reqAddEmployee = (form) => {
  return request({
    method: 'post',
    url: '/sys/user',
    data: form
  })
}

export const reqAddEmployeeBatch = (arr) => {
  return request({
    method: 'post',
    url: '/sys/user/batch',
    // 这里一般是对象,看后端,也可以是数组
    data: arr
  })
}
