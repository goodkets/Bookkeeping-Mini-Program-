// components/expenditure/expenditure.js
import Toast from '@vant/weapp/toast/toast';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    column:'',
  },
 

  /**
   * 组件的初始数据
   */
  data: {
    status:false,
    columns: ['餐饮',"购物","日用","交通","蔬菜","水果","零食","运动","娱乐","通讯","服装","美容","住房","居家","孩子","长辈","宠物","医疗","旅行","学习","礼金"],
    column:'',//选择的收入类型
    index:'',//收入类型的索引号
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      const { picker, value, index } = event.detail;
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    changeStatus(){
      this.setData({
        status:!this.data.status
      })
    },
 
    // 确认收入类型
    onConfirm(e){
     this.setData({
      column:e.detail.value,
      index:e.detail.index,
       status:!this.data.status
     })
     this.triggerEvent ('sync',{value:this.data.column})
    //  console.log(this.data.column,this.data.index)
    },
    // 取消收入类型
    onCancel(){
      this.setData({
        column:'',//选择的收入类型
        index:'',//收入类型的索引号
        status:!this.data.status
      })
      // console.log(this.data.column,this.data.index)
    }
  }
})
