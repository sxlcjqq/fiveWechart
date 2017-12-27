// index.js
var app = getApp();
Page({
  data: {
    classlist: [
      {
        url: '../../../image/banner.jpg',
        price: 20,
        name: '学巢（XX店）',
        area: 'XX区域',
        starts: 3,
        address: '此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址'
      },
      {
        url: '../../../image/banner.jpg',
        name: '学巢（XX店）',
        area: 'XX区域',
        starts: 2,
        address: '此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址',
        price: 60
      },
      {
        url: '../../../image/banner.jpg',
        name: '学巢（XX店）',
        price: 30,
        area: 'XX区域',
        starts: 6,
        address: '此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址'
      }
    ]
  },
  changetipNum: function (event) {
    this.setData({
      'tipNum': event.currentTarget.dataset.hi
    });
  },
  toCourseDetail: function () {
    wx.navigateTo({
      url: '../coursedetail/index'
    })
  },
  onReady: function () {
    wx.showLoading({
      title: '加载中',
    });
    var $this = this;
    wx.request({
      url: 'https://www.hxfirst.com/T04012.page?method=T040123001&page=0&pagesize=6', //仅为示例，并非真实的接口地址
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.ListT040123001)
        $this.setData({
          'datalist': res.data.ListT040123001
        });
        wx.hideLoading();
      }
    })
  }
})