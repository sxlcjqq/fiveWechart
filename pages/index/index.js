//index.js
// 引入SDK核心类
var qqmapsdk;
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    qqmapsdk = new QQMapWX({
      key: 'LLUBZ-JK7WR-LW2WJ-WMLEH-W6XE3-HIB3P'
    });

  },
  getLocation:function(){

    wx.getLocation({
      success: function (res) {
        // that.setData({
        //   hasLocation: true,
        //   location: formatLocation(res.longitude, res.latitude)
        // })
        console.log(res);
      }
    })
  },
  onShow: function () {
    console.log(wx.getLocation());
    // 调用接口
    qqmapsdk.search({
      keyword: '酒店',
      success: function (res) {
       alert(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
})
