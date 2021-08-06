import { get, post } from '../plugins/axios'

export default{
  navList(params) {return get('/sys/menu/nav', params)},
  // 获取验证码
  // captcha(params) {return get('/captcha.jpg', params)}
  // login
  login(params) {return post('/sys/login', params)},
  // 获取动态路由
  menuList(params){return get('/sys/menu/nav', params)}
}
