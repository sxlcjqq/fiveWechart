
// var pages = getCurrentPages();
// var prevPage = pages[pages.length - 2]; //上一个页面
var app = getApp();//取得全局App({..})实例

Page({
  data: {
    startTime: ['8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5', '15', '15.5', '16', '16.5', '17', '17.5', '18', '18.5', '19', '19.5', '20', '20.5', '21'],
    usetime: [1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13],
    usetimeindex: null,
    timeindex: null,
    isShow: false,
    text:'',
    chooselist:[]
  },
  onLoad() {
    var dd = this.data;
    var ss = dd.startTime;
    var ss1 = [];
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var nowdate = new Date();
    const minute = ((nowdate.getMinutes() > 30) ? (nowdate.getHours() + 1) : (nowdate.getHours()+0.5));
    if (!(prevPage.data.dateindex*1)){//今天
      for (var i in ss) {
        if (ss[i*1] >= minute){
          ss1.push(ss[i * 1]);
        }
      }
      this.setData({
        startTime: ss1
      })
    }
    if (prevPage.data.timeshow){
      this.setData({
        chooselist: prevPage.data.timeshow.split('，')
      })
    }
  },
  choosetime:function(e){
    this.setData({
      timeindex: e.currentTarget.dataset.index
    })
  }, 
  chooseusetime:function(e) {
    this.setData({
      usetimeindex: e.currentTarget.dataset.index
    })
  }, 
  queding: function () {
    var that = this;
    var dd = that.data;
    var ss = dd.chooselist;
    if (dd.timeindex==null){
      this.setData({
        text: '请选择开始时间',
        isShow: true
      });
      setTimeout(function(){
        that.setData({
          isShow: false
        });
      }, 1000)
      return;
    }
    if (dd.usetimeindex == null) {
      this.setData({
        text: '请选择使用小时',
        isShow:true
      });
      setTimeout(function () {
        that.setData({
          isShow: false
        });
      }, 1000)

      return;
    }
    const sleng = ss.length;
    var s1 = dd.startTime[dd.timeindex] * 1;//kaishi
    var s2 = dd.startTime[dd.timeindex] * 1 + dd.usetime[dd.usetimeindex];
    s2 = (s2>21?21:s2);
var ifnext = true;
if (sleng){;//jieshu
  for (var i = 0; i < sleng; i++) {

    var pronum0 = ss[i].split('-')[0].split(':')[0] * 1;//kaishi
    var pronum = ss[i].split('-')[1].split(':')[0] * 1 + (ss[i].split('-')[1].split(':')[1] * 1 ? 0.5 : 0);//jieshu
    if (ifnext){

      if (s1 >= pronum0 && pronum0 <= s2) {//开始时间在该时间段中间
        if (s2 > pronum) {//结束时间大于之前的结束时间
          s1 = pronum;
        } else {
          ifnext = false;
        }
      } else if (s1 < pronum0) {//开始时间在该开始时间之前
        if (s2 > pronum0){//结束时间大于之前的开始时间
          s2 = pronum0;
        }
      } else if (s1 > pronum) {//开始时间在该阶段结束之后

      }
    }
  }
  if (ifnext){
    ss.push(showdata(s1) + '-' + showdata(s2));
  }else{
    this.setData({
      text: '该时间段重复',
      isShow: true
    });
    setTimeout(function () {
      that.setData({
        isShow: false
      });
    }, 1000)
  }
} else {
  ss.push(showdata(s1) + '-' + showdata(s2));
    }
    this.setData({
      chooselist: ss
    });

    function showdata(dd) {
      return (dd % 1 ? dd - 0.5 : dd)+ ':' + (dd % 1 ? '30' : '00');
    }
    console.log(ss)
  },
  deletechooselist:function(e){
    var dd = this.data;
    var ss = dd.chooselist;
    ss.splice(e.currentTarget.dataset.index,1);
    this.setData({
      chooselist: ss
    })
  },
  resetActiveDay: function () {
    this.setData({
      chooselist: []
    })
  },
  putActiveDay: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      timeshow: this.data.chooselist.join('，')
    })
    wx.navigateBack({
      delta: 1
    })
  }
});