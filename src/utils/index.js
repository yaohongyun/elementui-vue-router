import Vue from 'vue'
// import router from '@/router'

/**
 * 获取uuid
 */
 export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 清除登录信息
 */
 export function clearLoginInfo () {
  Vue.cookie.delete('token')
  // store.commit('resetStore')
  // router.options.isAddDynamicMenuRoutes = false
}