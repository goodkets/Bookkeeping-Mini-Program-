// components/tab1/tab1.js
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
    active:0,
    lists:[{id:1,name:'支出'},{id:2,name:'收入'}],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      wx.showToast({
        title: `切换到 ${event.detail.title}`,
        icon: 'none',
      });
      console.log(event.detail,this.data.active)
    },
  }
})
