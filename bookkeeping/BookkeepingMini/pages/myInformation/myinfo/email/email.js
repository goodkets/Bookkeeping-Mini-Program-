// pages/myInformation/myinfo/email/email.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getemail:'',
  },
// 同步输入的值
onChange(e) { 
  this.setData({
   getemail: e.detail
  })
},
// 向上一级提交数据
   bao(){//自定义函数，检查输入的邮箱地址是否满足要求
    // console.log(this.data.getemail)
     var that=this
    //  判断邮箱是否正常
    let str = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/ //正则表达式
       if (str.test(that.data.getemail)) { //检查正则表达式是否符合地址要求
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; //上一个页面
         //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
               'xinxi[1].value':that.data.getemail
           })
           wx.navigateBack({//返回
             delta: 1
           })
         return true
       } else {
         wx.showToast({ //显示消息提示框
           title: '邮箱格式错误',
           icon: 'error'
         })
         return false
       }
  
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
 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

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