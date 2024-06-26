var time=require('../../../filter/Time.js')


// components/bookkeepings/count/count.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 文件上传
    // fileList: [],
    value1:"",//时间
    value2:"",//金额
    value3:'',//备注
    uid:'',//用户id
    dataY:'',//提交的具体年月
    timeYear:'',//具体年月
    years:[],//从数据库获取的年月集
    status:true,
    column:'',//支出类型
    currentDate: new Date().getTime(),
    minDate: new Date(1999, 12).getTime(),
    
    formatter(type, value) {
      if (type === 'year') {
        return `${value}-年`;
      }
      if (type === 'month') {
        return `${value}-月`;
      }
      if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 判断金额是否是数字
    Numbers(e){
      let str = /^[0-9]*$/   //正则表达式
      // console.log(e.detail)
      if(str.test(e.detail)){
        // console.log('正确')
      } else{
       this.setData({
        value2:''
       })
      }
     
    },
    onInput(event) {
      this.setData({
        currentDate: event.detail,
      });
    },
    // 时间控制
    times(){
      this.setData({
       status: !this.data.status
      })
      // console.log(1,this.data.status)
    },
    // 时间切换
    onChange() {
      // event.detail 为当前输入的值
      this.setData({
        status:!this.data.status
      })
      // console.log(this.data.status)
    },
    // 确认时间并提交年月
    confirm(e){
      // console.log(e.detail)
      this.setData({
        value1:time.times(e.detail),
        dataY:time.time(e.detail),
        timeY:time.timeY(e.detail),
        timeYear:time.timeyear(e.detail),
        timeMonth:time.timeMonth(e.detail),
        timeDay:time.timeDay(e.detail),
        status:!this.data.status
      })
      // console.log(this.data.value1,this.data.dataY)
      // 提交年月和获取时间年月
     setTimeout(()=>{
      let time=this.data.dataY
      // let that=this
      let  token=wx.getStorageSync('token')
      wx.request({
        url: 'http://127.0.0.1:8888/my/article/addcates',
        method:'POST',
        header: { "Content-Type": "application/x-www-form-urlencoded",'Authorization':token.token },
        data:{
          name:time
        },
        success(e){
          // console.log(e)
        }
      })
     },10)
     setTimeout(()=>{
      // let time=this.data.dataY
      let that=this
      let  token=wx.getStorageSync('token')
      wx.request({
        url: 'http://127.0.0.1:8888/my/article/cates',
        method:'get',
        header: { "Content-Type": "application/x-www-form-urlencoded",'Authorization':token.token },
        success(e){
       that.setData({
         years:e.data.data
       })
      //  console.log(e)
      //  console.log(that.data.years)
        }
      })
     },100)
    },
    // 取消时间
    cancel(){
      this.setData({
        status:!this.data.status
      })
    },
    datas(e){
      this.setData({
        column:e.detail.value
      })  
      // console.log(e.detail.value,this.setData.column,11111)
    },
    // 提交数据
    submit(e){
      let that=this
      let  token=wx.getStorageSync('token')
      if(!token){
        wx.showToast({
          title: '请先登录',
          icon: 'error',
          duration: 2000 ,   //提示的延迟时间
          mask:true
        });
        return
      }
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
      if(this.data.value1==''||this.data.mony==''||this.data.column=='' ){
        wx.showToast({
          title: '请填写完整',
          icon: 'error',
          duration: 3000 ,   //提示的延迟时间
          mask:true
        });
        return
      }
      // console.log(this.data.timeY)
      
      // 获取年月
        // 添加具体日期
      for(let i=0;i<that.data.years.length;i++){
        if(that.data.years[i].name==that.data.dataY){
          setTimeout(()=>{
            wx.request({
              url: 'http://127.0.0.1:8888/my/article/add',
              method:'POST',
              header: { "Content-Type": "application/x-www-form-urlencoded",'Authorization':token.token },
              data:{
  
                pub_data:that.data.timeY,//时间
                eid:that.data.years[i].id,//类id
                alias:that.data.years[i].id
              },
              success(e){
                wx.showLoading({
                  title: '数据添加中...',
                  duration: 4000,    //提示的延迟时间
              });
                // console.log(e)
                // console.log(that.data.timeY)
              }
            })
          },10)
          // 获取times中的数据提取id
         setTimeout(()=>{
          wx.request({
            url: 'http://127.0.0.1:8888/my/article/list',
            method:'post',
            header: { "Content-Type": "application/x-www-form-urlencoded",'Authorization':token.token },
            data:{
             id:that.data.years[i].id
            },
            success(e){
              // console.log(e)
              // that.setData({
              //   timeID:e.data.data
              // })
              // 时间存到本地
              wx.setStorageSync('timeID',e.data.data)
              // console.log(wx.getStorageSync('timeID'))
              // console.log(that.data.timeID)
            }
          })
         },300)
        }
       
      }
      // 提交消费数据
     setTimeout(()=>{
      // console.log(that.data.timeY)
     let timeID= wx.getStorageSync('timeID')
        for(let i=0;i<timeID.length;i++){
          if(timeID[i].pub_data===that.data.timeY){
            wx.request({
              url: 'http://127.0.0.1:8888/my/article/dayList',
              method:'POST',
              header: { "Content-Type": "application/x-www-form-urlencoded",'Authorization':token.token },
              data:{
                title:that.data.column=that.data.column,//类型
                pub_data:that.data.value1,//时间
                mony:that.data.value2,//金额
                eid:timeID[i].id,//时间类id
                bei:that.data.value3==''? '无':that.data.value3,//备注
                uid:that.data.uid,//用户id
                years:that.data.timeYear,
                month:that.data.timeMonth,
                days:that.data.timeDay,
                status:0,//消费
              },
              success(e){
                console.log(that.data.column,111)
                if(!e.data.status){
                  wx.showToast({
                    title: '添加成功',
                    icon: 'success',
                    duration: 2000,    //提示的延迟时间
                    mask:true
                  })
                  that.setData({
                    value1:'',
                    value2:'',
                    value3:'',
                    column:'选择消费类型22',
                  })
                  wx.removeStorageSync('timeID')
                }
                // console.log(e)
                // console.log(that.data.timeY)
              },
              complete(e){
               if(e.data.status){
                wx.showToast({
                  title: '添加失败',
                  icon: 'error',
                  duration: 2000 ,   //提示的延迟时间
                  mask:true
                });
               }
              }
            })
          }
        }

     },400)
    },
    // 清空数据
    empty(){
     let a=wx.getStorageSync('timeID')
      // console.log(a)
      this.setData({
        value1:'',
        value2:'',
        value3:'',
        column:'选择消费类型11',
      })
    }
  }
})
