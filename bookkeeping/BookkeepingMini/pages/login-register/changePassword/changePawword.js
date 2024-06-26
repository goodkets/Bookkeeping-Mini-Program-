// pages/login-register/changePassword/changePawword.js
const encryption = require('../../../utils/encryption');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    value:'',//用户名
    value1:'',//密码
    value2:'',//确认密码
    password1:'password',//密码1状态
    password2:'password',//密码2状态
    value3:''// 判断是否注册成功
  },
    // 切换密码1显示状态
    xinan1(){
      this.setData({
        password1:'text'
      })
    },
    yc1(){
      this.setData({
        password1:'password'
      })
    },
      // 切换密码2显示状态
      xinan2(){
        this.setData({
          password2:'text'
        })
      },
      yc2(){
        this.setData({
          password2:'password'
        })
      },
    // 监听用户
    onChange(event){
      this.setData({
        value:event.detail
      })
    },
  // 监听确认密码
  onChanges(event){
    this.setData({
      value2:event.detail
    })
  },
       // 监听密码
       onChange1(event){
        this.setData({
          value1:event.detail
        })
      },
      //修改密码
regUser(){
  //用户名或者密码不能为空
  if( this.data.value1=='' ||this.data.value2=='' ||this.data.value==''){
    wx.showToast({
      title: '信息不能为空',
      icon: 'error',
      duration: 2000    //提示的延迟时间
    });
    // console.log(this.data.value1.length)
    return
  }
  if(this.data.value1.length<6||this.data.value1.length>12 ||this.data.value2.length<6||this.data.value2.length>12){
    wx.showToast({
      title: '密码不能低于6位',
      icon: 'none',
      duration: 2000    //提示的延迟时间
    });
    return
  }
  if( this.data.value1===this.data.value2){
    wx.showToast({
      title: '新旧密码一样无需修改',
      icon: 'none',
      duration: 2000    //提示的延迟时间
    });
    return
  }
  else{
    // 修改
  
    // setTimeout(()=>{
      wx.showLoading({
        title: '修改中...',
        duration: 4000,    //提示的延迟时间
    }); 
    wx.request({
      url: 'http://127.0.0.1:8888/api/updatepwd',
      method:'POST',
      data:{
      username:this.data.value,
      oldPwd:encryption.sha1(this.data.value1),
      newPwd:encryption.sha1(this.data.value2),  
      },
      header: { "Content-Type": "application/x-www-form-urlencoded"},
      fail:function(error){
        // wx.hideLoading()
        wx.showToast({
          title: '修改失败',
          icon: 'error',
          duration: 2000 ,   //提示的延迟时间
          mask:true
        });
       },
      success:(res)=>{
        console.log(res)
        if(!res.data.status){
          // wx.hideLoading()
          setTimeout(()=>{
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000,    //提示的延迟时间
              mask:true
            })
          },2000)
         setTimeout(() => {
          wx.navigateBack({
            delta: 0,
          })
         }, 4000);
        }
      },
    
    })
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