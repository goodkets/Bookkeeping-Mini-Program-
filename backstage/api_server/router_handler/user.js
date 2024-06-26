/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 导入数据库模块
 const db=require("../db/index")
//  导入加密
const bcrypt = require('bcryptjs')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config')
exports.regUser = (req, res) => {
  // 注册用户的处理函数
// const bcrypt=require("bcryptjs")
  // 检测用户账号密码是否为空
  const userinfo=req.body
  if(!userinfo.username || !userinfo.password){
    return res.send({status:1,message:"用户或者密码不能为空"})
  }
  // 检测用户名是否被占用

  const sqlStrA = `select * from ev_users where username=?`
  db.query(sqlStrA, [userinfo.username], function (err, results) {
    // 执行 SQL 语句失败
    // if (err) {
    // return res.send({ status: 1, message: err.message })
    // }
    // 用户名被占用
    if (results.length > 0) {
    return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
    }
    // TODO: 用户名可用，继续后续流程...
    // console.log(userinfo)
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // console.log(userinfo)
    // 插入新用户
    const sqlUser = 'insert into ev_users set ?'
    db.query(sqlUser, { username: userinfo.username, password: userinfo.password },
      function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.send({ status: 1, message: err.message })
      // SQL 语句执行成功，但影响行数不为 1
      if (results.affectedRows !== 1) {
      return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
      }
      // 注册成功
      res.send({ status: 0, message: '注册成功！' })
      })
  })
    // res.send('reguser OK')
  }
  
  // 登录的处理函数
  exports.login = (req, res) => {
    const userinfos = req.body
    const sqlL = `select * from ev_users where username=?`
    db.query(sqlL, userinfos.username, function (err, results) {
      // 执行 SQL 语句失败
      if (err) return res.cc(err)
      // 执行 SQL 语句成功，但是查询到数据条数不等于 1
      if (results.length !== 1) return res.cc('登录失败！')
      // TODO：判断用户输入的登录密码是否和数据库中的密码一致
      // 拿着用户输入的密码,和数据库中存储的密码进行对比
const compareResult = bcrypt.compareSync(userinfos.password, results[0].password)

// 如果对比的结果等于 false, 则证明用户输入的密码错误
if (!compareResult) {
  return res.cc('登录失败！')
}

// TODO：登录成功，生成 Token 字符串
// 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
const user = { ...results[0], password: '', user_pic: '' }

// 生成 Token 字符串
const tokenStr = jwt.sign(user, config.jwtSecretKey, {
  expiresIn: '168h', // token 有效期为 7天
})
res.send({
  status: 0,
  message: '登录成功！',
  // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
  token: 'Bearer ' + tokenStr,
})
      // res.send("ok")
    })
    // console.log(123)
  
  }
  // 更改密码
// 重置密码的处理函数
exports.updatePassword = (req, res) => {
  // 定义根据 id 查询用户数据的 SQL 语句
const sql = `select * from ev_users where username=?`

// 执行 SQL 语句查询用户是否存在
db.query(sql, req.body.username, (err, results) => {
  // console.log(req.user)
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 检查指定 id 的用户是否存在
  if (results.length !== 1) return res.cc('用户不存在！')

  // TODO：判断提交的旧密码是否正确
  // 在头部区域导入 bcryptjs 后，
// 即可使用 bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证密码是否正确
// compareSync() 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误
const bcrypt = require('bcryptjs')

// 判断提交的旧密码是否正确
const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
if (!compareResult) return res.cc('原密码错误！')
// 定义更新用户密码的 SQL 语句
const sql = `update ev_users set password=? where username=?`

// 对新密码进行 bcrypt 加密处理
const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

// 执行 SQL 语句，根据 id 更新用户的密码
db.query(sql, [newPwd, req.body.username], (err, results) => {
  // SQL 语句执行失败
  if (err) return res.cc(err)

  // SQL 语句执行成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('更新密码失败！')

  // 更新密码成功
  res.cc('更新密码成功！', 0)
})
})
  // res.send('ok')
}