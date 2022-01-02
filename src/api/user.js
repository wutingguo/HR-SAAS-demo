import http from '@/utils/request'

/**
 *
 *用于登录
 */
export const reqLogin = (data) => {
  return http({
    method: 'post',
    url: '/sys/login',
    data
  })
}
/**
 * 用于获取用户的名字等信息
 */
export const reqGetProfile = () => http({
  method: 'post',
  url: '/sys/profile'
})

/**
 * 获取员工的基本信息(有头像)
 */

export const reqGetUserInfo = (id) => {
  return http({
    method: 'get',
    // 地址栏一定不能有空格
    url: `/sys/user/${id}`
  })
}

export const reqGetSimpleUserList = () => http({
  method: 'get',
  url: '/sys/user/simple'
})

export function reqAssignRoles(id, roleIds) {
  return http({
    method: 'put',
    url: '/sys/user/assignRoles',
    data: {
      id,
      roleIds
    }
  })
}
