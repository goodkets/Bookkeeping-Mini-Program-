
// pages/Statistics/Statistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    uid:0,//用户id
    sums:[],//存储年支出
    sums1:[],//存储年收入
    month:[],//存储月支出
    month1:[],//存储月收入
    day:[],//存储天支出
    day1:[],//存储天收入
    list:[],//请求总的用户数据
    
  },
  onChange(event) {
    wx.showToast({
      title: `切换到 ${event.detail.title}`,
      icon: 'none',
    });
    this.setData({
      active: event.detail.name,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let token=wx.getStorageSync('token')
    if(!token){
      // let token=wx.getStorageSync('token')
      // if(!token){
        this.setData({
          sums:[],//存储年支出
    sums1:[],//存储年收入
    month:[],//存储月支出
    month1:[],//存储月收入
    day:[],//存储天支出
    day1:[],//存储天收入
        })
      // }
      wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 2000 ,   //提示的延迟时间
        mask:true
      });
    }
    let that=this
       // 获取用户信息，存储id
       wx.request({
        url: 'http://127.0.0.1:8888/my/userInfo',
        method:'GET',
        header:{'Authorization':token.token},
        success(res){
          // console.log(res)
        that.setData({
          uid:res.data.data.id
        })
        }
      })
   setTimeout(()=>{
    wx.request({
      url: 'http://127.0.0.1:8888/my/article/getList',
      method:'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded",'Authorization':token.token },
      data:{
        uid:that.data.uid
      },
      success(res){
        // console.log(res)
        that.setData({
          list:[...that.data.list,...res.data.data]
        })
      }
    })
   },100)
  //  年的收入和支出
setTimeout(()=>{
    //  根据年添加消费数据
   let a=that.data.list
   function filterByName1(a, years,status) {
    return a.filter(item => item.years == years &&item.status==status)
}
for(let i=2018;i<2030;i++){
      var b=filterByName1(a,i,0)
      var suma=0
      for(var y=0;y<b.length;y++){
        suma+=parseFloat(b[y].mony)
      }
      that.data.sums=[...that.data.sums,suma]
      
      // console.log(suma)
}
wx.setStorageSync('yearCount1', that.data.sums)
},200)
setTimeout(()=>{
  //  根据年添加收入数据
 let a=that.data.list
 function filterByName2(a, years,status) {
  return a.filter(item => item.years == years &&item.status==status)
}
for(let i=2018;i<2030;i++){
    var b=filterByName2(a,i,1)
    var suma=0
    for(var y=0;y<b.length;y++){
      suma+=parseFloat(b[y].mony)
    }
    that.data.sums1=[...that.data.sums1,suma]
    
    // console.log(suma)
}
wx.setStorageSync('yearCount2', that.data.sums1)
// let q=wx.getStorageSync('yearCount2')
// console.log(q)
// console.log(that.data.sums)
},200)
  //  月的收入和支出
  // 收入
  setTimeout(()=>{
    // 获取当前年月份
    let year=new Date().getFullYear()
//     //  根据年添加消费数据
   let a=that.data.list
   function filterByName1(a, years,status,month) {
    return a.filter(item => (item.years == years &&item.status==status &&item.month==month))
}
for(let i=parseFloat(year+'01');i<parseFloat(year+'13');i++){
      var b=filterByName1(a,year,0,i)
      var suma=0
      for(var y=0;y<b.length;y++){
        suma+=parseFloat(b[y].mony)
      }
      that.data.month=[...that.data.month,suma]
      
      // console.log(suma)
}
wx.setStorageSync('monthCount1', that.data.month)
// let q=wx.getStorageSync('yearCount')
// console.log(q)
// console.log(that.data.month)
},200)
  //  支出
  setTimeout(()=>{
    // 获取当前年月份
    let year=new Date().getFullYear()
//     //  根据年添加消费数据
   let a=that.data.list
   function filterByName1(a, years,status,month) {
    return a.filter(item => (item.years == years &&item.status==status &&item.month==month))
}
for(let i=parseFloat(year+'01');i<parseFloat(year+'13');i++){
      var b=filterByName1(a,year,1,i)
      var suma=0
      for(var y=0;y<b.length;y++){
        suma+=parseFloat(b[y].mony)
      }
      that.data.month1=[...that.data.month1,suma]
      
      // console.log(suma)
}
wx.setStorageSync('monthCount2', that.data.month1)
// let q=wx.getStorageSync('yearCount')
// console.log(q)
// console.log(that.data.month1)
},200)
// 按天计算支出和收入
// 支出
setTimeout(()=>{
  // 获取当前年月
  let years=new Date().getFullYear()
  let month=new Date().getMonth()+1
  // console.log(year+""+month+'01')
  // console.log(month+'01')
  // console.log(month)
    //  根据年添加消费数据
 let a=that.data.list
 function filterByName1(a,status,days,years) {
  return a.filter(item => (item.status==status&& item.days==days &&item.years==years))
}
for(let i=parseFloat(month+'01');i<parseFloat(month+'32');i++){
  // console.log(i)
    var b=filterByName1(a,0,i,years)
    // console.log(b)
    var suma=0
    for(var y=0;y<b.length;y++){
      suma+=parseFloat(b[y].mony)
    }
    that.data.day=[...that.data.day,suma]
    
    // console.log(suma)
}
wx.setStorageSync('dayCount1', that.data.day)
// let q=wx.getStorageSync('yearCount')
// console.log(q)
// console.log(that.data.day)
},200)
// 收入
setTimeout(()=>{
  // 获取当前年月
  let years=new Date().getFullYear()
  let month=new Date().getMonth()+1
  // console.log(year+""+month+'01')
  // console.log(month+'01')
  // console.log(month)
    //  根据年添加消费数据
 let a=that.data.list
 function filterByName1(a,status,days,years) {
  return a.filter(item => (item.status==status&& item.days==days &&item.years==years))
}
for(let i=parseFloat(month+'01');i<parseFloat(month+'32');i++){
  // console.log(i)
    var b=filterByName1(a,1,i,years)
    // console.log(b)
    var suma=0
    for(var y=0;y<b.length;y++){
      suma+=parseFloat(b[y].mony)
    }
    that.data.day1=[...that.data.day1,suma]
    
    // console.log(suma)
}
wx.setStorageSync('dayCount2', that.data.day1)
// let q=wx.getStorageSync('yearCount')
// console.log(q)
// console.log(that.data.day)
},200)

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
  this.setData({
    list:[],
    sums:[],
    sums1:[],
    month:[],
    month1:[],
    day:[],//存储天支出
    day1:[],//存储天收入
    sum:0
  })
  wx.removeStorage('yearCount')
  wx.removeStorage('yearCount1')
  wx.removeStorage('monthCount1')
  wx.removeStorage('monthCount2')
  wx.removeStorage('dayCount1')
  wx.removeStorage('dayCount2')
  // console.log(wx.getStorageSync('yearCount'))
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})