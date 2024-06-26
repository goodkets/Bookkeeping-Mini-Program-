// pages/myInformation/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xinxi:[
    {
      id:1,
      name:'昵称',
      icon:"orders-o",
      value:'',
    },
      {
        id:2,
        name:'邮箱',
        icon:"envelop-o",
        value:''
      },
        {
          id:3,
          name:'电话号码',
          icon:"phone-circle-o",
          value:'',
         
        }
    ],
    id:'',//存储用户id
    // 头像上传信息
    fileList:[],//图片存放的数组
    status:false,//判断是否上传成功显示图片
  },

// // 头像照片
afterRead(event) {
    const {file} = event.detail;//获取图片详细信息
    let that = this;//防止this指向问题
    console.log(file.url)
    // 设置请求头，根据项目需求变换
    let Authorization = wx.getStorageSync('token')  
    // 调用wx.requst上传图片地址
    wx.request({
      url: 'http://127.0.0.1:8888/my/update/avatar',
      method:'POST',
      header:{'Authorization':Authorization.token,"Content-Type": "application/x-www-form-urlencoded" },
      data:{
        avatar:file.url
      },
      success(res){
        if(!res.data.status){
          setTimeout(()=>{
            that.setData({
              'fileList[0]':file.url,
              status:true
            })
          },2000)
           // loading加载
          setTimeout(()=>{
            wx.showLoading({
              title: '上传中...',
              duration: 4000,    //提示的延迟时间
          });
          },2000)
   
    console.log(that.data.fileList)
        } 
        else{
          wx.showLoading({
            title: '上传失败',
            duration: 4000, 
            icon:"error"   //提示的延迟时间
        });
        }
        // 上传图片停止加载loading
      setTimeout(()=>{
        wx.hideLoading()
      },2000)
        console.log(res)
      }
    })
},
  // 跳转对应的修改区
xiux(e){
  var id=e.currentTarget.dataset.id
  if('1'==id){
    console.log(id)
    wx.navigateTo({
      url: '/pages/myInformation/myinfo/nickname/nickname',
    })
  }
  if('2'==id){
    console.log(id)
    wx.navigateTo({
      url: '/pages/myInformation/myinfo/email/email',
    })
  }
  if('3'==id){
    console.log(id)
    wx.navigateTo({
      url: '/pages/myInformation/myinfo/tel/tel',
    })
  }
},
// 提交修改
info(){
  // 拿token
let token=wx.getStorageSync('token');
let that=this//更改this指向
if(token){
  wx.request({
    url: 'http://127.0.0.1:8888/my/userInfo',
    method:"POST",
    header:{'Authorization':token.token,"Content-Type": "application/x-www-form-urlencoded" },//向后台提供token获取数据,修改数据添加"Content-Type": "application/x-www-form-urlencoded" 
    method:'POST',
    data:{
      id:this.data.id,//用户id
      email:this.data.xinxi[1].value,//邮箱
      tel:this.data.xinxi[2].value,//电话
      nickname:this.data.xinxi[0].value//昵称
    },
    success(res){
      console.log(res)
      if(!res.data.status){
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000,    //提示的延迟时间
          mask:true
        });
        // 向上一个传值
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2]; //上一个页面
         //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
               pic:that.data.fileList[0],
               nickname:that.data.xinxi[0].value
           })
      } else{
        wx.showToast({
          title: '修改失败',
          icon: 'error',
          duration: 2000,    //提示的延迟时间
          mask:true
        });
      }
    }
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
 // 获取用户信息
 let token=wx.getStorageSync('token');
//  console.log(token.token)
 let that=this;//更改this指向
//  if(token.token){
   wx.request({
     url: 'http://127.0.0.1:8888/my/userinfo',
     header:{'Authorization':token.token,'Content-Type': 'Application/x-www-form-urlencoded;charset=utf-8'},//向后台提供token获取数据
     method:'GET',
    //  'Content-Type': 'text/plain;charset=utf-8',
     success(res){
       that.setData({//请求过来的数据存到data
         'xinxi[0].value':res.data.data.nickname||'无',
         'xinxi[1].value':res.data.data.email||'无',
         'xinxi[2].value':res.data.data.tel||'无',
         id:res.data.data.id,
       })
      //  console.log(res)zzz
     }
   })
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