const express = require('express')
const router = express.Router()
// 导入解析 formdata 格式表单数据的包
// const multer = require('multer')
// // 导入处理路径的核心模块
// const path = require('path')

// // 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
// const upload = multer({ dest: path.join(__dirname, '../uploads') })
// // 导入日期的路由处理函数模块
const article_handler = require('../router_handler/times')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入日期的验证模块
const { add_article_schema } = require('../schema/times')

// 提交收入或者支出的路由
// 注意：在当前的路由中，先后使用了两个中间件：
//       先使用 multer 解析表单数据
//       再使用 expressJoi 对解析的表单数据进行验证
router.post('/add',  expressJoi(add_article_schema), article_handler.addArticle)
// 添加认证规则
const{get_cate_schema} =require('../schema/years')
// 获取发布的日期数据
router.post('/list', expressJoi(get_cate_schema), article_handler.getList)
const {add_article_schemas}=require('../schema/days')
//添加消费或者收入
router.post('/dayList', expressJoi(add_article_schemas),article_handler.postDayList)
// const {get_cate_schemasS}=require('../schema/times')
// router.post('/dayAdd', expressJoi(get_cate_schemasS),article_handler.getDayList)
// const {get_cate_schemaa}=require('../schema/times')
// const {get_user_schemaq}=require('../schema/user')
// 获取数据
router.post('/getDay',article_handler.getDayList)
// 根据用户展示一年所有数据
router.post('/getList',article_handler.getUserList)
module.exports = router