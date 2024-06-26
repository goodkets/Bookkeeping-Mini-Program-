// pages/tab/tab1/tab1.js
import * as echarts from '../../../../ec_canvas/echarts';

const app = getApp();
// 折线图----天
function initChart1(canvas, width, height, dpr) {
  let dayCount=wx.getStorageSync('dayCount2')
  let token=wx.getStorageSync('token')
  if(!token){
    dayCount=[]
  }
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '按天收入数据',
      left: 'center'
    },
    legend: {
      // data: ['A', 'B', 'C'],
      top: 50,
      left: 'center',
      // backgroundColor: 'red',
      z: 100
    },
    grid: {
      // containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      name:'收入（元）',
      axisTick: {
        inside: true
    },
    scale: true,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLabel: {
        margin: 2,
      formatter: function (value, index) {
        if (value >= 5000 && value < 1000000) {
            value = value / 1000 + "k";
        } else if (value >=1000000) {
            value = value / 1000000 + "百万";
        }
        return value;
    }
  },
  grid: {
    left: 35
},
      // show: false
    },
    series: [{
      name: '收入',
      type: 'line',
      smooth: true,
      data: dayCount
    }]
  };

  chart.setOption(option);
  return chart;
}
// 折线图----月
function initChart2(canvas, width, height, dpr) {
  const MonthCount=wx.getStorageSync('monthCount2')
  let token=wx.getStorageSync('token')
  if(!token){
    MonthCount=[]
  }
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '按月收入数据',
      left: 'center'
    },
    legend: {
      // data: ['A', 'B', 'C'],
      top: 50,
      left: 'center',
      // backgroundColor: 'red',
      z: 100
    },
    grid: {
      // containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      name:'收入（元）',
      axisTick: {
        inside: true
    },
    scale: true,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLabel: {
        margin: 2,
      formatter: function (value, index) {
        if (value >= 5000 && value < 1000000) {
            value = value / 1000 + "k";
        } else if (value >=1000000) {
            value = value / 1000000 + "百万";
        }
        return value;
    }
  },
  grid: {
    left: 35
},
      // show: false
    },
    series: [{
      name: '收入',
      type: 'line',
      smooth: true,
      data: MonthCount
    }]
  };

  chart.setOption(option);
  return chart;
}
// 折线图----年
function initChart3(canvas, width, height, dpr) {
  let yearCount=wx.getStorageSync('yearCount2')
  let token=wx.getStorageSync('token')
  if(!token){
    yearCount=[]
  }
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '按年收入数据',
      left: 'center'
    },
    legend: {
      // data: ['A', 'B', 'C'],
      top: 50,
      left: 'center',
      // backgroundColor: 'red',
      z: 100
    },
    grid: {
      // containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      name:'收入（元）',
      axisTick: {
        inside: true
    },
    scale: true,
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      },
      axisLabel: {
        margin: 2,
      formatter: function (value, index) {
        if (value >= 5000 && value < 1000000) {
            value = value / 1000 + "k";
        } else if (value >=1000000) {
            value = value / 1000000 + "百万";
        }
        return value;
    }
  },
  grid: {
    left: 35
},
      // show: false
    },
    series: [{
      name: '收入',
      type: 'line',
      smooth: true,
      data: yearCount
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    moth:false,//展示月份
    day:true,//展示天
    years:false,//展示年
    bgrMoth:'',//背景
    bgrDay:"red",
    bgrYear:"",
    ecDay: {//展示天的图
      onInit: initChart1
    },
    ecMoth: {//展示月的图
      onInit: initChart2
    },
    ecYear: {//展示年的图
      onInit: initChart3
    }
  },
  // 展示年
  btnYear(){
    this.setData({
      years:true,
      moth:false,
    day:false,
    bgrYear:'red',
    bgrMoth:'',
    bgrDay:'',
    })
  },
  // 展示月
  btnMoth(){
    this.setData({
      moth:true,
      years:false,
      day:false,
      bgrYear:'',
      bgrMoth:'red',
      bgrDay:'',
    })
  },
  // 展示天
  btnDay(){
    this.setData({
      day:true,
      years:false,
      moth:false,
      bgrYear:'',
      bgrMoth:'',
      bgrDay:'red',
    })
  },
  onReady() {
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