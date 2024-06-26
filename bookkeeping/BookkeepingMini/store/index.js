import { observable, action } from 'mobx-miniprogram'
export const store=observable({
  activeTabBarIndex: 0,
  status:false,
  // tabbar操作函数
   updateactiveTabBarIndex:action(function(index){
     this.activeTabBarIndex=index
   }),
  changeStatus:action(function(index){
    this.status=index
  }),
})