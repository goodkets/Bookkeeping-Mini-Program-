// pages/login-register/login/login.js

const encryption = require('../../../utils/encryption');
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
      value1:'',//用户名
      value2:'',//密码
      password2:'password',//密码状态
      // loginSuccess:'',//登陆成功之后拿这个值判断是否请求用户数据
      token:'',//用户登陆成功拿到的token值
      id:'',
  },
// 监听用户名
onChange(event){
  this.setData({
    value1:event.detail
  })
  // console.log(this.data.value)
},
// 监听密码
onChange1(event){
  this.setData({
    value2:event.detail
  })
},
  // 切换密码显示状态
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
// 登陆用户
submit(){
  if(this.data.value1=='' || this.data.value2==''){
    wx.showToast({
      title: '用户密码不能为空',
      icon: 'error',
      duration: 2000    //提示的延迟时间
    });
  }
 else{
  wx.showLoading({
    title: '登陆中...',
    duration: 4000,    //提示的延迟时间
});
// encryption.sha1(this.data.value2)
  wx.request({
    url: 'http://127.0.0.1:8888/api/login',
    method:'POST',
    data:{
      username:this.data.value1,
      password: encryption.sha1(this.data.value2),
      
      },
    header: { "Content-Type": "application/x-www-form-urlencoded" },
    fail:function(error){
      // wx.hideLoading()
     setTimeout(()=>{
      wx.showToast({
        title: '登陆失败',
        icon: 'error',
        duration: 2000 ,   //提示的延迟时间
        mask:true
      });
     },2000)
     },
    success:(res)=>{
      // console.log(res)
      if(!res.data.status){
       setTimeout(()=>{
        wx.showToast({
          title: '登陆成功',
          icon: 'success',
          duration: 2000,    //提示的延迟时间
          mask:true
        });
       },2000)
        // 设置token缓存
      wx.setStorageSync('token', {token:res.data.token});
      // 当前时间
        var timestamp = Date.parse(new Date());
      // 加上过期期限
        var expiration = timestamp + 604800000; //缓存20分钟
        // 存入缓存
        wx.setStorageSync('data_expiration', expiration);
      //   console.log(a.token)
       setTimeout(() => {
         setTimeout(()=>{
          let token=wx.getStorageSync('token');
          //  console.log(token.token)
           let that=this;//更改this指向
          //  修改用户信息
          wx.request({
            url: 'http://127.0.0.1:8888/my/userInfo',
            method:"POST",
            header:{'Authorization':token.token,"Content-Type": "application/x-www-form-urlencoded" },//向后台提供token获取数据,修改数据添加"Content-Type": "application/x-www-form-urlencoded" 
            data:{
              id:that.data.id,
             status:1
            },
            success(res){
              // console.log(res)
            }
          })
         },1000)
        
        let token=wx.getStorageSync('token');
        //  console.log(token.token)
         let that=this;//更改this指向
        //  if(token.token){
          // 获取用户信息
          wx.request({
            url: 'http://127.0.0.1:8888/my/userinfo',
            header:{'Authorization':token.token,'Content-Type': 'Application/x-www-form-urlencoded;charset=utf-8'},//向后台提供token获取数据
            method:'GET',
           //  'Content-Type': 'text/plain;charset=utf-8',
            success(res){
              that.setData({//请求过来的数据存到data
                id:res.data.data.id,
              })
              // console.log(res)
            }
          })
        wx.navigateBack({
          delta: 0,
        })
       }, 4000);
      }
      if(res.data.status ){
       setTimeout(()=>{
        wx.showToast({
          title: '账号密码错误',
          icon: 'error',
          duration: 2000 ,   //提示的延迟时间
          mask:true
        });
       },4000)
      }
    },
    
  })
  
 }
},
  // 跳转注册
  zc(){
      wx.navigateTo({
        url: '/pages/login-register/refister/register'
      })
  },
  // 跳转忘记密码
  WJ(){
    wx.navigateTo({
      url: '/pages/login-register/changePassword/changePawword'
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//  console.log(this.data.token)
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