// 导入定义验证规则的模块
const joi = require('joi')

// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
// const id = joi.number().integer().min(1).required()
const pub_data = joi.string().required()
const eid = joi.string().required()
const uid = joi.string().required()
const mony=joi.string().required()
const icon=joi.string().required()
const bei=joi.string().required()
const years=joi.string().required()
const month=joi.string().required()
const days=joi.string().required()
const status=joi.string().required()
// 验证规则对象 - 发布日期天
exports.add_article_schemas = {
  body: {
   title,
    eid,
    pub_data,
    mony,
    bei,
    status,
    uid,
    years,
    month,
    days,
  },
}