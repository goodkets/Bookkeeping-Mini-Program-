// 导入数据库操作模块
const db = require('../db/index')

// 获取年份分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
    // 根据分类的状态，获取所有未被删除的分类列表数据
// is_delete 为 0 表示没有被 标记为删除 的数据
const sqlS = 'select * from ev_years where id order by id asc'
db.query(sqlS, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '获取年份分类列表成功！',
      data: results,
    })
  })
    // res.send('ok')
  }
  // 新增年份分类的处理函数
exports.addArticleCates = (req, res) => {
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
const sqlL = `select * from ev_years where name=? or alias=?`
// 执行查重操作
db.query(sqlL, [req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // 分类名称 和 分类别名 都被占用
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
     
  // TODO：新增年份分类
  const sqlT = `insert into ev_years set ?`
  db.query(sqlT, req.body, (err, results) => {
      // SQL 语句执行失败
      if (err) return res.cc(err)
    
      // SQL 语句执行成功，但是影响行数不等于 1
      if (results.affectedRows !== 1) return res.cc('新增年份分类失败！')
    
      // 新增年份分类成功
      res.cc('新增年份分类成功！', 0)
    })
    // res.send('ok')
  })

  }
 // 根据 Id 获取年份分类的处理函数
exports.getArtCateById = (req, res) => {
    const sql = `select * from ev_years where id=?`
    db.query(sql, req.params.id, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是没有查询到任何数据
        if (results.length !== 1) return res.cc('获取年份分类数据失败！')
      
        // 把数据响应给客户端
        res.send({
          status: 0,
          message: '获取年份分类数据成功！',
          data: results[0],
        })
      })
    // res.send('ok')
  }
  // 更新年份分类的处理函数
exports.updateCateById = (req, res) => {
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
const sql = `select * from ev_years where id=? and (name=? or alias=?)`
// 执行查重操作
db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
  
    // 分类名称 和 分类别名 都被占用
    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
  
    // TODO：更新年份分类
    const sql = `update ev_years set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新年份分类失败！')
      
        // 更新年份分类成功
        res.cc('更新年份分类成功！', 0)
      })
  })
    // res.send('ok')
  }