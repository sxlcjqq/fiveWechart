// index.js
//获取应用实例    
var app = getApp();
var bmap = require('../../../utils/bmap-wx.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classlist:
    {
      url: '../../../image/banner.jpg',
      price: 20,
      name: '学巢（XX店）',
      area: 'XX区域',
      starts: 3,
      address: '此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址',
      totalnum: 9,
      sheshi: {
        'Wi-Fi': '../../../image/wifi.png',
        '电视': '../../../image/dianshi.png',
        '投影仪': '../../../image/touyingyi.png',
        '饮品': '../../../image/yinpin.png',
        '白板': '../../../image/baiban.png',
        '药品': '../../../image/yaopin.png',
        '地铁': '../../../image/ditie.png',
        '耳机': '../../../image/erji.png',
        '简餐': '../../../image/jiancan.png',
        '停车场': '../../../image/tingchechang.png',
        '摄像': '../../../image/shexiang.png',
        '音响': '../../../image/yinxiang.png',
      }
    }
    ,
    movies: [
      { url: '../../../image/banner.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' }
    ],
    datelist: ['今天', '明天及以后'],
    dateindex: null,
    dateshow: '2017/5/6',
    timeshow: '14:00',
    date: '',
    time: '',
    isShow: false,
    text: '',
    persondata: ['1人', '2人', '3人', '4人', '5人', '6人', '7人', '8人', '9人', '10人', '15人', '20人+'],
    personindex: null,
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 23.099994,
      longitude: 113.344520,
      iconPath: '/image/location.png'
    }, {
      latitude: 23.099994,
      longitude: 113.304520,
      iconPath: '/image/location.png'
    }]
  },
  topickerTime: function () {
    wx.navigateTo({
      url: '../chooseTime/index'
    });
  },
  bindDateChange: function (e) {//选择日期
    // this.setData({
    //   date: e.detail.value
    // })
    this.setData({
      dateindex: e.detail.value
    })
    this.setData({
      timeshow: ''
    });
    if (e.detail.value == 0) {
      this.setData({
        dateshow: (new Date()).toLocaleDateString()
      })
    } else {
      if (this.data.dateshow == (new Date()).toLocaleDateString()) {
        this.setData({
          dateshow: ''
        });
      }
      wx.navigateTo({
        url: '../chooseDate/index'
      });
    }
  },
  bindTimeChange: function () {
    var that = this;
    if (this.data.dateindex != null && this.data.dateindex != '') {
      wx.navigateTo({
        url: '../chooseTime/index'
      });
    } else {
      this.setData({
        text: '请先选择日期',
        isShow: true
      });
      setTimeout(function () {
        that.setData({
          isShow: false
        });
      }, 1000)
    }
  },
  // bindTimeChange: function (e) {//选择时间
  //   this.setData({
  //     time: e.detail.value
  //   })
  // },
  setPerson: function (e) {
    this.setData({
      'personindex': e.currentTarget.dataset.index
    });
  },
  onLoad: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {

        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          'markers[0].latitude': res.latitude,
          'markers[0].longitude': res.longitude,
          'covers[0].latitude': res.latitude,
          'covers[0].longitude': res.longitude,
          'covers[1].latitude': res.latitude,
          'covers[1].longitude': res.longitude
        });
      }
    })
  }
})