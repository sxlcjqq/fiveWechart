// index.js
//获取应用实例    
var app = getApp();
Page({
  data: {
    Pricelist:['500','1000','2000','4000','8000'],
    priceIndex:0,
    showPrice:500
  },
  onLoad: function () {
  },
  showPriceActive:function(e){
    var that = this;
    this.setData({
      priceIndex: e.currentTarget.dataset.index,
      showPrice: that.data.Pricelist[e.currentTarget.dataset.index]
    })
  }

}) 
