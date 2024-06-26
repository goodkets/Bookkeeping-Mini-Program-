// pages/myInformation/Information.js
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status:false,//通过token判断是否本地有，如果有就显示登陆
    pic:'',//头像
    nickname:'',//昵称
    xinxi:[
      {
      id:1,
      icon:'column',
      name:"我的信息",
     },
     {
      id:2,
      icon:'comment-circle',
      name:"问题反馈",
    },
    {
      id:3,
      icon:'more',
      name:"其他",
    },
    {
      id:4,
      icon:'setting',
      name:"设置"
    },
  ]
  },
// 登陆页
login(){
wx.navigateTo({
  url: '/pages/login-register/login/login',
})
},

// 我的信息
my(e){
  var id=e.currentTarget.dataset.id
  if('1'==id){
    // 获取用户信息
let token=wx.getStorageSync('token');
   if(token){
    // console.log(id)
    wx.navigateTo({
      url: '/pages/myInformation/myinfo/myinfo',
    })
   }else{
    wx.showToast({
      title: '未登录',
      icon: 'error',
      duration: 2000 ,   //提示的延迟时间
      mask:true
    })
   }
  }
  if('2'==id || '3'==id || '4'==id){
    wx.showToast({
      title: '暂未开放此功能',
      icon: 'error',
      duration: 1000 ,   //提示的延迟时间
      mask:true
    })
  }
},
// 退出登陆
tui(){
  // console.log(this.data.pic,1,this.data.nickname)
  if(!this.data.status){
    // 暂未登陆
  wx.showToast({
    title: '未登录',
    icon: 'error',
    duration: 2000 ,   //提示的延迟时间
    mask:true
  })
  }
 else{
  Dialog.confirm({//弹出框判断是否退出
    // title: '是否退出',
    message: '是否退出',
    
  }).then(() => {
    wx.clearStorageSync();
    this.setData({
      status:false,
      pic:'',
    })
    return true
  });
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
  	// 当前时间
    var timestamp = Date.parse(new Date());
    // 缓存中的过期时间
    var data_expiration = wx.getStorageSync("data_expiration");
    // 如果缓存中没有data_expiration，说明也没有token，还未登录
    if (data_expiration) {
      this.setData({
        status:true
      })
         
    }
      // 如果超时了，清除缓存，重新登录
      if (timestamp > data_expiration) {
        wx.clearStorageSync();//清楚本地数据
        this.setData({
          status:false,
        })
        return true;
      }else{
        // 获取用户信息
 let token=wx.getStorageSync('token');
 //  console.log(token.token)
  let that=this;//更改this指向
 //  if(token.token){
    wx.request({
      url: 'http://127.0.0.1:8888/my/userinfo',
      header:{'Authorization':token.token,},//向后台提供token获取数据
      method:'GET',
      success(res){
        that.setData({//请求过来的数据存到data
        pic:res.data.data.user_pic,
        nickname:res.data.data.nickname
        })
        console.log(that.data.pic,that.data.nickname)
      }
    })
        return false;
      }
      
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