// pages/course/screening/index.js
//获取应用实例    
var app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datelist: ['今天', '明天及以后'],
    dateindex: null, 
    dateshow: '',
    timeshow:'',
    date:'',
    time:'',
    isShow:false,
    text:'',
    persondata:['1人','2人','3人','4人','5人','6人','7人','8人','9人','10人','15人','20人+'],
    personindex: null,
    pricedata: ['0-20元/小时', '20-40元/小时', '40-80元/小时', '80元+/小时'],
    priceindex: null,
    otherdata: ['WI-FI', '电视', '投影', '饮品', '白板', '药品', '地铁', '耳机', '简餐', '麦克风', '停车场', '摄像','音响'],
    otherindex: [false, false, false, false, false, false, false, false, false, false, false, false, false]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindDateChange:function(e){//选择日期
    // this.setData({
    //   date: e.detail.value
    // })
    this.setData({
      dateindex: e.detail.value
    })
    this.setData({
      timeshow: ''
    });
    if (e.detail.value==0){
      this.setData({
        dateshow: (new Date()).toLocaleDateString()
      })
    }else{
      if (this.data.dateshow == (new Date()).toLocaleDateString()){
        this.setData({
          dateshow: ''
        });
      }
      wx.navigateTo({
        url: '../chooseDate/index'
      });
    }
  },
  bindTimeChange:function(){
    var that = this;
    if (this.data.dateindex != null && this.data.dateindex != '') {
      wx.navigateTo({
        url: '../chooseTime/index'
      });
    }else{
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
  setPerson:function(e){
    this.setData({
      'personindex': e.currentTarget.dataset.index
    });
  },
  setPrice: function (e) {
    this.setData({
      'priceindex': e.currentTarget.dataset.index
    });
  },
  setOther: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    var list = this.data.otherindex;
    if (list[index]){
      list[index] = false;
    } else {
      list[index] = true;
    }
    this.setData({
      'otherindex': list
    });
    console.log(this.data.otherindex)
    // this.setData({
    //   'otherindex': e.currentTarget.dataset.index
    // });
    this.setData({
      'test[2]': 321
    });
  }
  , primary: function (event) {
    // console.log(event);
    wx.navigateTo({
      url: '../courselist/index'
    })
  },
  clearDate:function(){
    this.setData({
      'dateshow': ''
    });
  },
  clearTime:function(){
    this.setData({
      'time': ''
    });
  }
})