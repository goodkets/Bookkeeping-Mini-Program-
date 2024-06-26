// pages/login-register/refister/register.js
const encryption = require('../../../utils/encryption');

import Dialog from '../../../miniprogram_npm/@vant/weapp/dialog/dialog'

Page({

  /**
   * 页面的初始数据
   */
  data: {
  show: true,
  password1:'password',//密码1状态
  password2:'password',//密码2状态
  value:'',//用户名
  value1:'',//密码
  value2:'',//确认密码
  value3:''// 判断是否注册成功
  },
  // 监听用户名
  onChange(event){
   
    this.setData({
      value:event.detail
    })
    // console.log(this.data.value)
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
        // console.log(this.data.value1)
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
// 注册用户
regUser(){
  // console.log(this.data.value)
  var that=this
 
  //用户名或者密码不能为空
  if(this.data.value=='' || this.data.value1=='' ||this.data.value2==''){
    wx.showToast({
      title: '用户密码不能为空',
      icon: 'error',
      duration: 2000    //提示的延迟时间
    });
  }
  if(this.data.value1.length<6||this.data.value1.length>12 ||this.data.value2.length<6||this.data.value2.length>12){
    wx.showToast({
      title: '密码不能低于6位',
      icon: 'none',
      duration: 2000    //提示的延迟时间
    });
    return
  }
  // 注册
  if(this.data.value1==this.data.value2 &&this.data.value1!=='' && this.data.value2!==''){
    // setTimeout(()=>{
      wx.showLoading({
        title: '注册中...',
        duration: 4000,    //提示的延迟时间
    });
    // },2000)
    // encryption.sha1(this.data.value2)
    // console.log(encryption.sha1(this.data.value2))
    wx.request({
      url: 'http://127.0.0.1:8888/api/reguser',
      method:'POST',
      data:{
      username:this.data.value,
      password: encryption.sha1(this.data.value2)
      },
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      fail:function(error){
        // wx.hideLoading()
        wx.showToast({
          title: '注册失败',
          icon: 'error',
          duration: 2000 ,   //提示的延迟时间
          mask:true
        });
       },
      success:(res)=>{
        // console.log(res)
        if(!res.data.status){
          // wx.hideLoading()
          setTimeout(()=>{
            wx.showToast({
              title: '注册成功',
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
        if(res.data.status){
          wx.showToast({
            title: '用户名已被注册',
            icon: 'error',
            duration: 2000 ,   //提示的延迟时间
            mask:true
          });
        }
      },
    
    })
   
  }
  else if(this.data.value1!==this.data.value2){
    Dialog.alert({
      message: '输入密码不一致',
    }).then(() => {
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