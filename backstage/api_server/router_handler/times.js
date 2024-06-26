const db = require('../db/index')
  // 发布新时间的处理函数

exports.addArticle = (req, res) => {
// 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
const sqlL = `select * from ev_times where pub_data=? and alias=?`
db.query(sqlL,[req.body.pub_data,req.body.eid],(err,results)=>{
   // 执行 SQL 语句失败
   if (err) return res.cc(err)
  
   // 分类名称 和 分类别名 都被占用
   if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
   if (results.length === 1 && results[0].pub_data === req.body.pub_data && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
   // 分类名称 或 分类别名 被占用
  //  if (results.length === 1 && results[0].pub_data === req.body.pub_data) return res.cc('分类名称被占用，请更换后重试！')
  //  if (results.length === 1 && results[0].eid === req.body.eid) return res.cc('分类别名被占用，请更换后重试！')
  //  新增
   const sql = `insert into ev_times set ?`
  // 导入数据库操作模块
// 执行 SQL 语句
db.query(sql, req.body, (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)

  // 执行 SQL 语句成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('发布失败！')

  // 发布月份成功
  res.cc('发布成功', 0)
})
})
    
    // res.send('ok')
  }
  // 根据id查询对应月份数据
exports.getList=(req,res)=>{
  // select *
  //  from 表2
  //  where 姓名 in (select 姓名
  //       from 表1
  //       where 条件)
    // const sqlS = `select * from ev_years y,ev_times e where e.eid=y.id`
    const sqlS='select * from ev_times where eid in(select id from ev_years where id=? )'
    db.query(sqlS,req.body.id,  (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
      if(results==0){
        return res.cc("没有该数据")
      }
        // 2. 执行 SQL 语句成功
        res.send({
          status: 0,
          message: '获取日期列表成功！',
          data: results,
        })
      })
    // res.send(req.query)
  },
  //添加消费或者收入
exports.postDayList=(req,res)=>{
  // res.send('ok')
  const sql='insert into ev_days set ?'
  db.query(sql,req.body,(err,results)=>{
      // 执行 SQL 语句失败
      // console.log(req.body)
  if (err) return res.cc(err)

  // 执行 SQL 语句成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('发布失败！')

  // 发布月份成功
  res.cc('发布成功', 0)
  })
}
// 获取数据
exports.getDayList=(req,res)=>{
  // res.send('ok')
  const sqlS='select * from ev_days where eid in(select id from ev_times where id=? ) and uid in(select id from ev_users where id=? )'
  db.query(sqlS,[req.body.id,req.body.uid],  (err, results) => {
    // console.log(req.body)
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err)
  if(results==0){
    return res.cc("没有该数据")
  }
    // 2. 执行 SQL 语句成功
    res.send({
      status: 0,
      message: '根据获取按天列表数据成功！',
      data: results,
    })
  })
}
// 根据用户查询一年所有数据
exports.getUserList=(req,res)=>{
  const sqlS='select * from ev_days where uid=? '
  db.query(sqlS,[req.body.uid],(err,results)=>{
    if(err) return res.cc(err)
    if(results==0){
      return res.cc('没有该数据')
    }
    res.send({
      status: 0,
      message: '获取按年列表数据成功！',
      data: results,
    })
  })
}