// 导入定义验证规则的模块
const joi = require('joi')

// 定义 分类名称 和 分类别名 的校验规则
const name = joi.string().required()
// const pub_data = joi.string().required()
const alias = joi.string().required()
const id = joi.number().required()
const uid=joi.string().required()
// 校验规则对象 - 添加分类
exports.add_cate_schema = {
  body: {
    name,
    alias,
    uid,
  },
}
// 校验规则对象 - 根据 Id 获取分类
exports.get_cate_schema = {
   body: {
      id,
    },
  }
  // 校验规则对象 - 更新分类
exports.update_cate_schema = {
    body: {
      id,
      name,
      alias,
    },
  }
