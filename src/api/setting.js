import http from '@/utils/request'

export const reqGetRoleList = (data) => {
  return http({
    method: 'get',
    url: '/sys/role',
    params: data
  })
}

export const reqAddRole = (data) => {
  return http({
    method: 'POST',
    url: '/sys/role',
    data
  })
}

export const reqDelRole = (id) => {
  return http({
    method: 'DELETE',
    url: `/sys/role/${id}`
  })
}

/**
 * 根据id获取角色详情
 */
export const reqGetRoleDetail = (id) => {
  return http({
    method: 'get',
    url: `/sys/role/${id}`
  })
}

/**
 * 更新角色详情(form中需要有id以及其他信息)
 */
export const reqUpdateRole = (form) => {
  return http({
    method: 'put',
    url: '/sys/role/' + form.id,
    data: form
  })
}

// 根据 id 查询企业
export const reqGetCompanyById = (id) => {
  return http({
    method: 'get',
    url: `/company/${id}`
  })
}

/**
 * 给角色分配权限
 * @param {*} id 角色id
 * @param {*} permIds 权限id的数组
 */
export function reqAssignPerm(id, permIds) {
  return http({
    method: 'put',
    url: '/sys/role/assignPrem',
    data: {
      id,
      permIds
    }
  })
}
