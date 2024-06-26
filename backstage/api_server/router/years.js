const express = require('express')
const router = express.Router()
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导月份分类的路由处理函数模块
const artcate_handler = require('../router_handler/years')
// // 添加获取年月认证规则
const{get_years_schema} =require('../schema/years')
// 获取月份分类的列表数据
router.get('/cates', artcate_handler.getArticleCates)
// 新增月份分类的路由
router.post('/addcates', artcate_handler.addArticleCates)

// 导入月份分类的验证模块
const { add_cate_schema } = require('../schema/years')
// 新增月份分类的路由
router.post('/addcates', expressJoi(add_cate_schema), artcate_handler.addArticleCates)
const { get_cate_schema} = require('../schema/years')
// 根据id获取具体的分类
router.get('/cates/:id', expressJoi(get_cate_schema),artcate_handler.getArtCateById)    

// 导入更新月份分类的验证规则对象
const { update_cate_schema } = require('../schema/years')

// 更新月份分类的路由
router.post('/updatecate', expressJoi(update_cate_schema), artcate_handler.updateCateById)

module.exports = router