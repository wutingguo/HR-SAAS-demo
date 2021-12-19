/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const arr = ['admin', 'editor']
  return arr.indexOf(str.trim()) >= 0
}
export function validmobile(str) {
  return /^1[3-9]\d{9}$/.test(str)
}
