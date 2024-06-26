const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')
// 注册新用户
router.post('/reguser',userHandler.regUser)
// 登录
router.post('/login', userHandler.login)

// 导入需要的验证规则对象
const { update_password_schema } = require('../schema/user')
// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userHandler.updatePassword)
// 将路由对象共享出去
module.exports = router
