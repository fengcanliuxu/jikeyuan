import request from 'utils/request'

/**
 * 登录请求用于用户登录
 * @param {*} mobile-手机号
 * @param {*} code-验证码
 * @returns
 */
export const login = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code,
    },
  })
}
/**
 *
 * @returns 获取用户信息
 */
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/user/profile',
  })
}
