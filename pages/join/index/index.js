// index.js
//获取应用实例    
var app = getApp();
// 引入SDK核心类
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'LLUBZ-JK7WR-LW2WJ-WMLEH-W6XE3-HIB3P' // 必填
});
Page({
  data: {
    nickName: '',
    userInfoAvatar: '',
    sex: '',
    province: '',
    city: ''  
  },
  showcourseManager:function(){
    wx.navigateTo({
      url: '../manager/index',
    })
  },
  onLoad: function () {
    var that = this;
    debugger
    wx.getUserInfo({
      success: function (res) {
        // success  
        that.setData({
          nickName: res.userInfo.nickName,
          userInfoAvatar: res.userInfo.avatarUrl,
          province: res.userInfo.province,
          city: res.userInfo.city
        })
        switch (res.userInfo.gender) {
          case 0:
            that.setData({
              sex: '未知'
            })
            break;
          case 1:
            that.setData({
              sex: '男'
            })
            break;
          case 2:
            that.setData({
              sex: '女'
            })
            break;
        }
      },
      fail: function () {
        // fail  
        console.log("获取失败！")
      },
      complete: function () {
        // complete  
        console.log("获取用户信息完成！")
      }
    }) 
  }
  
}) 
