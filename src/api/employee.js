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

// 获取员工基本信息 (包含头像)
export function reqGetUserDetailById(id) {
  return request({
    method: 'get',
    url: `/sys/user/${id}`
  })
}

/** *
 * 保存员工的基本信息
 * **/
export function reqSaveUserDetailById(data) {
  return request({
    method: 'put',
    url: `/sys/user/${data.id}`,
    data
  })
}

/** *
 *  读取用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function reqGetPersonalDetail(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/personalInfo`
  })
}

/** *
 *  更新用户详情的基础信息 (个人详情-下面的接口)
 * **/
export function reqUpdatePersonal(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/personalInfo`,
    data
  })
}

/** **
 * 获取用户的岗位信息  (岗位信息)
 * ****/
export function reqGetJobDetail(id) {
  return request({
    method: 'get',
    url: `/employees/${id}/jobs`
  })
}

/**
 * 保存岗位信息  (岗位信息)
 * ****/
export function reqUpdateJob(data) {
  return request({
    method: 'put',
    url: `/employees/${data.userId}/jobs`,
    data
  })
}
