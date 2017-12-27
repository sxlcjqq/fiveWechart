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
    areass: [{
      'id':'140105',
      'name':'小店区'
      }, {
        'id': '140106',
      'name': '迎泽区'
      }, {
        'id': '140107',
        'name': '杏花岭区'
      }, {
        'id': '140108',
      'name': '尖草坪区'
      }, {
        'id': '140109',
        'name': '万柏林区'
      }, {
        'id': '140110',
      'name': '晋源区'
      }],
    areas_index: 0,
    areastype_index: 0,
    areas: ['小店区', '迎泽区', '杏花岭区', '尖草坪区', '万柏林区', '晋源区'],
    areastype: ['全部', '文化', '艺体', '自习', '其他'],
    movies: [
      { url: '../../../image/banner.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' }
    ],
    classlist: [
      { url: '../../../image/banner.jpg' ,
        price:20,
        name:'学巢（XX店）',
        area:'XX区域',
        starts:3,
        address:'此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址此处是地址'
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
    ],
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    area:'',
    tipNum:1,
    cityid:'110000',//城市id
    test:null
  },
  onLoad:function(){
    var son = null;
    var that = this;

    try {
      var value = wx.getStorageSync('orderclass')
      if (value) {
        // Do something with return value
        son = value;
        that.setData({
          test: son
        })
      }
    } catch (e) {
      // Do something when catch error
    }
    son = (son ? (son+1):1);
    try {
      wx.setStorageSync('orderclass', son)
    } catch (e) {
    }
    
    
    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       //获取openid
    //       wx.request({
    //         url: 'https://api.weixin.qq.com/sns/jscode2session',
    //         data: {
    //           appid: 'wx5ac271980582f637',
    //           secret: '31088803c5d58351435d6a1e7974c606',
    //           js_code: res.code,
    //           grant_type: 'authorization_code'
    //         },
    //         header: {
    //           'content-type': 'application/json' // 默认值
    //         },
    //         success: function (res) {
    //           console.log(res.data.openid)
    //         }
    //       })
    //     } else {
    //       console.log('获取用户登录态失败！' + res.errMsg)
    //     }
    //   }
    // }) 
  },
  showcourselist:function(){
    wx.navigateTo({
      url: '../courselist/index'
    })
  },
  changetipNum: function (event) {
    this.setData({
      'tipNum': event.currentTarget.dataset.hi
    });
  },
  bindPickerChangeareas: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      'areas_index': e.detail.value
    })
  },
  toCourseDetail: function () {
    wx.navigateTo({
      url: '../coursedetail/index'
    })
  },
  bindPickerChangeareastype: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      'areastype_index': e.detail.value
    })
  },
  toscreening:function(){
    wx.navigateTo({
      url: '../screening/index'
    })
  },
  getLocation: function () {
    var that = this;
    wx.getLocation({
      success: function (res) {
        // console.log(formatLocation(res.longitude, res.latitude));
        // 调用接口 获取全国城市列表数据
        qqmapsdk.getCityList({
              success: function (res) {
                    console.log(res);
              },
              fail: function (res) {
            //         console.log(res);
              },
              complete: function (res) {
            //         console.log(res);
              }
        });
        // 调用接口 获取当前位置
        qqmapsdk.reverseGeocoder({
          // keyword: '',
          success: function (ress) {
            console.log(ress);
            that.setData({
              area: ress.result
            })
          },
          fail: function (ress) {
            // console.log(ress);
          },
          complete: function (ress) {
            // console.log(ress);
          }
        });
      }
    });
    that.getCityDetailById();
  },
  getCityDetailById:function(){
    var that = this;
    // 调用接口 通过城市ID返回城市下的区县
    qqmapsdk.getDistrictByCityId({
      id: '140100', // 对应城市ID
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });
  }
  ,primary:function(event){
    // console.log(event);
    wx.navigateTo({
      url: '../courselist/index'
    })
  },
  // 下拉刷新回调接口
  onPullDownRefresh: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 刷新时需把total重置为0，代表重新从第一条请求。
    // total = 0;
    // this.data.dataArray 是页面中绑定的数据源
    // this.data.dataArray = [];
    // 网络请求，重新请求一遍数据
    // this.periphery();
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 500
    });
    wx.stopPullDownRefresh;
    // 小程序提供的api，通知页面停止下拉刷新效果
  },
}) 
