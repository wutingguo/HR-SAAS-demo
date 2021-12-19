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
