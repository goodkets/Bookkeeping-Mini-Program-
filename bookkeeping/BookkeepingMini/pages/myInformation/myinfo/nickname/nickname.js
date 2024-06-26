// pages/myInformation/myinfo/nickname/mickname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getnickname:'',
  },
// 同步输入的值
onChange(e) { 
  this.setData({
   getnickname: e.detail
  })
},
// 向上一级提交数据
   bao(){//自定义函数，检查输入的邮箱地址是否满足要求
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
       //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
             'xinxi[0].value':this.data.getnickname
         })
         wx.navigateBack({//返回
           delta: 1
         }) 
         return true
    
       
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