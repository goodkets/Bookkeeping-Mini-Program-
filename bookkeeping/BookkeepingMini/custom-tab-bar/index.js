// custom-tab-bar/index.js
import {storeBindingsBehavior} from 'mobx-miniprogram-bindings'
import {store} from "../store/index"
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
behaviors:[storeBindingsBehavior],
storeBindings:{
store,
fields:{
  active:'activeTabBarIndex'
},
actions:{
  updateActive:"updateactiveTabBarIndex"
}
},
  /**
   * 组件的初始数据
   */
  data: {
    
    "list": [{
      "pagePath": "/pages/bookkeepings/bookkeepings",
      "text": "记账",
      "icon":"todo-list"
    }, {
      "pagePath": "/pages/detaileds/detaileds",
      "text": "明细",
      "icon":"balance-list"
    },{
      "pagePath": "/pages/Statistics/Statistics",
      "text": "统计",
      "icon":"chat"
    }
    ,{
      "pagePath": "/pages/myInformation/Information",
      "text": "我的信息",
      "icon":"manager"
    }]
  },
  /**
   * 组件的方法列表
   */
methods:{
  onChange(event) {
    // event.detail 的值为当前选中项的索引
 
    wx.switchTab({
      url: this.data.list[event.detail].pagePath,
      
    })
    // this.setData({ active: event.detail });
    this.updateActive(event.detail)
    // console.log(event.detail,this.data.active)
  }
},
})
