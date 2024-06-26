// pages/detaileds/detaileds.js
// 引入时间过滤器
var time=require("../../filter/Time")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: false,//回到顶部
    consumption:[],//消费和收入数据
    wu:false,//无数据展示组件
    times:'',//显示年月
    yearTime:[],//获取的年月
    listID:[],//存储每天日期
    uid:'',//存储用户id
    status:true,
    statuss:true,
    dayCount:0,//月收入
    dayExpenditure:0,//月支出
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
  },
  goTop(e) {
    // 一键回到顶部
    if (wx.pageScrollTo) {
     
    wx.pageScrollTo({ scrollTop: 0 })
     
    } else {
     
    wx.showModal({
     
    title: '提示', content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
     
    })
    } 
  },
    // 获取滚动条当前位置
onPageScroll(e) {
     
      if (e.scrollTop > 200) {
       
        this.setData({
          scrollTop: true
        });
         
      } else {
       
        this.setData({
          scrollTop: false
        });
         
      }
    },
//  显示日期组件
changeStatus(){
  this.setData({
    status:!this.data.status
  })
},
// 点击时间确定
confirm(e){

this.setData({
  times:time.time(e.detail),
  consumption:[],
  status:!this.data.status,
  wu:false,
})
let that=this
let token=wx.getStorageSync('token')
// console.log(this.data.times)

for(let i=0;i<that.data.yearTime.length;i++){
  if(this.data.yearTime[i].name !==this.data.times){
    wx.showToast({
      title: '数据加载中',
      icon:'loading',
      duration:1000,
      mask:true
    })
    setTimeout(()=>{
      that.setData({
        wu:true,
        dayCount:0,
        dayExpenditure:0
      }) 
    },1000)
}
if(that.data.wu){
  return
}

  if(that.data.yearTime[i].name==that.data.times){
    // console.log('对的')
    wx.showLoading({
      title: '数据加载中',
    })
    setTimeout(()=>{
      that.setData({
        wu:false,
        dayCount:0,
        dayExpenditure:0
      })
      that.dayCount()
      that.dayExpenditure()
      wx.hideLoading({
        success: (res) => {},
      })
     },1500)
  that.setData({
    wu:false,
  })

  // "获取日期"
    wx.request({
      url: 'http://127.0.0.1:8888/my/article/list',
      method:'post',
      header: { 'Authorization':token.token,"Content-Type": "application/x-www-form-urlencoded" },
      data:{
        id:this.data.yearTime[i].id,
      },
      success(res){
        // console.log(res)
        that.setData({
          listID:res.data.data
        })
        // console.log(that.data.listID)
       // wx.setStorageSync('listID',res.data.data)
      }
    })
// 获取消费和收入数据
    setTimeout(()=>{
      for(let i=0;i<that.data.listID.length;i++){
        wx.request({
          url: 'http://127.0.0.1:8888/my/article/getDay',
          method:'post',
          header: { 'Authorization':token.token,"Content-Type": "application/x-www-form-urlencoded" },
          data:{
            id:that.data.listID[i].id,
            uid:that.data.uid
          },
          success(res){
            // console.log(i)
            that.setData({
              consumption:[...that.data.consumption,...res.data.data]
            })
            // console.log(res.data.data)
          }
        })
      }
    },2000)
  }
}

},
// 点击取消
onCancel(){
this.setData({
  status:true
})
},

  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
    // console.log(this.data.currentDate,this.data.times)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options)

 
    //
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
        wx.showToast({
        title: '请先登录',
        icon: 'error',
        duration: 2000 ,   //提示的延迟时间
        mask:true
      });
      return
    } else{
      this.setData({
        currentDate:new Date().getTime()
      })
        wx.showLoading({
          title: '数据加载中',
        })
        // 监听消费和收入数据
        setTimeout(()=>{
          wx.hideLoading({
            success: (res) => {},
          })
            this.getDatetime()
        
        },3000)
    }
    
  
    // setTimeout(()=>{
    //   this.dayExpenditure()
    // this.dayCount()
    // },2000)
  },
// 显示数据
getDatetime(){
  // 通过tim过滤
  this.setData({
    times:time.time(this.data.currentDate)
  })
  // console.log(this.data.times)
  let that=this
  let  token=wx.getStorageSync('token')
  // 获取用户id数据
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
  // 获取到年月
  wx.request({
    url: 'http://127.0.0.1:8888/my/article/cates',
    method:'get',
    header: { 'Authorization':token.token,"Content-Type": "application/x-www-form-urlencoded" },
    success(res){
      // console.log(res)
     if(!res.data.status){
       that.setData({
         yearTime:res.data.data
        })
     }
      // console.log(that.data.yearTime)
    }
  })
 
 setTimeout(()=>{
  for(let i=0;i<this.data.yearTime.length;i++){
    if(this.data.yearTime[i].name==this.data.times){
      // console.log(this.data.yearTime[i].id)
     wx.request({
       url: 'http://127.0.0.1:8888/my/article/list',
       method:'post',
       header: { 'Authorization':token.token,"Content-Type": "application/x-www-form-urlencoded" },
       data:{
         id:this.data.yearTime[i].id,
       },
       success(res){
        //  console.log(res)
         that.setData({
           listID:res.data.data
         })
        //  console.log(that.data.listID)
        // wx.setStorageSync('listID',res.data.data)
       }
     })
    }
  }
  // 获取消费数据
  setTimeout(()=>{
  for(let i=0;i<that.data.listID.length;i++){
    wx.request({
      url: 'http://127.0.0.1:8888/my/article/getDay',
      method:'post',
      header: { 'Authorization':token.token,"Content-Type": "application/x-www-form-urlencoded" },
      data:{
        id:that.data.listID[i].id,
        uid:that.data.uid
      },
      success(res){
        // console.log(res)
        that.setData({
          consumption:[...that.data.consumption,...res.data.data],
         
        })
        that.dayExpenditure()
        that.dayCount()

        wx.hideLoading({
          success: (res) => {},
        })

        // console.log(res.data.data)
      }
    })
  }
  },100)

 },200)
 setTimeout(()=>{
  if(this.data.consumption.length ==0){
    that.setData({
      wu:true,
    })
  } else{
    that.setData({
      wu:false,
    })
  }
},500)
//  setTimeout(()=>{
//   //  let listID=wx.getStorageSync('listID')
//   console.log(that.data.consumption)
//   console.log(that.data.listID)
//  },1000)
},
  // 月支出
  dayExpenditure(){
    setTimeout(()=>{
      if(this.data.dayExpenditure ==0){
        for(let i=0;i<this.data.consumption.length;i++){
          if(this.data.consumption[i].status==0){
            this.setData({
              dayExpenditure:this.data.dayExpenditure+Number(this.data.consumption[i].mony)
            })
          }
          console.log(i,"iiii",this.data.consumption.length)
        }
      }
    },2000)
    // this.data.dayExpenditure=this.data.consumption[0].mony
  },
  // 月收入
  dayCount(){
    setTimeout(()=>{
      if(this.data.dayCount==0){
        for(let i=0;i<this.data.consumption.length;i++){
          if(this.data.consumption[i].status==1){
            this.setData({
              dayCount:this.data.dayCount+Number(this.data.consumption[i].mony)
            })
          }
        }
      }
    },2000)
    // this.data.dayExpenditure=this.data.consumption[0].mony
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 隐藏无记录组件
    this.setData({
      wu:false,
      consumption:[],
      status:true,
      dayCount:0,//日收入
    dayExpenditure:0,//日支出
    })
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

    this.setData({
      consumption:[],
      dayCount:0,//月收入
      dayExpenditure:0,//月支出
    })
    wx.showLoading({
      title: '加载中',
    }),
    setTimeout(()=>{
      wx.hideLoading({
        success: () => {
          this.setData({
            shopList:[],
            page:1,
            totle:0
          })
          this.getDatetime()
          this.dayCount()
          this.dayExpenditure()
        },
      })
    },2000)
    wx.stopPullDownRefresh()  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
return wx.showToast({
  title: '数据加载完毕',
  // icon:'none'
})
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
  
})