// index.js
//获取应用实例    
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classlist:
    {
      url: '../../../image/banner.jpg',
      price: 0,
      name: '',
      area: '',
      starts: 0,
      address: '',
      jigou: '',
      tuiding: '',
      jiaotong: '',
      changdi: '',
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
      },
      areas_index: 0,
      tuijian:false,
      personnum: 0
    }
    ,
    movies: [
      { url: '../../../image/banner.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' }
    ],
    isShow: false,
    text: '',
    otherindex: {
      'Wi-Fi': false,
      '电视': false,
      '投影仪': false,
      '饮品': false,
      '白板': false,
      '药品': false,
      '地铁': false,
      '耳机': false,
      '简餐': false,
      '停车场': false,
      '摄像': false,
      '音响': false,
    },
    areas: ['小店区', '迎泽区', '杏花岭区', '尖草坪区', '万柏林区', '晋源区'],
    focus1: false,
    focus2: false,
    focus3: false
  },
  model_blur(e) {
    let key = e.currentTarget.dataset.key;
    this.data.classlist[key] = e.detail.value;
    this.setData({ classlist: this.data.classlist });
  },
  bindButtonTap: function (e) {
    var name = e.currentTarget.dataset.index;
    this.setData({
      name: true
    })
  },
  switch1Change: function (e) {
    this.setData({
      'courselist.tuijian': e.detail.value
    })
  },
  setOther: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    var list = this.data.otherindex;
    if (list[index]) {
      list[index] = false;
    } else {
      list[index] = true;
    }
    this.setData({
      'otherindex': list
    });
    this.setData({
      'test[2]': 321
    });
  },
  onLoad: function () {
  }
})