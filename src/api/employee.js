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
