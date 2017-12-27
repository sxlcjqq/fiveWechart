
// var pages = getCurrentPages();
// var prevPage = pages[pages.length - 2]; //上一个页面
var app = getApp();//取得全局App({..})实例

Page({
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    activeday: {
      0: {},
      1: {},
      2: {},
      3: {},
      4: {},
      5: {}
    }
  },
  onLoad() {
    var date = new Date();
    var cur_year = date.getFullYear();
    var cur_month = date.getMonth() + 1;
    var cur_day = date.getDate();
    var cur_year1 = (this.getyear(cur_month, 1) < cur_month) ? cur_year + 1 : cur_year;
    var cur_month1 = this.getyear(cur_month, 1);
    var cur_year2 = (this.getyear(cur_month, 2) < cur_month) ? cur_year + 1 : cur_year;
    var cur_month2 = this.getyear(cur_month, 2);
    var cur_year3 = (this.getyear(cur_month, 3) < cur_month) ? cur_year + 1 : cur_year;
    var cur_month3 = this.getyear(cur_month, 3);
    var cur_year4 = (this.getyear(cur_month, 4) < cur_month) ? cur_year + 1 : cur_year;
    var cur_month4 = this.getyear(cur_month, 4);
    var cur_year5 = (this.getyear(cur_month, 5) < cur_month) ? cur_year + 1 : cur_year;
    var cur_month5 = this.getyear(cur_month, 5);
    const weeks_ch = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.calculateEmptyGrids(cur_year1, cur_month1, 1);
    this.calculateDays(cur_year1, cur_month1, 1);
    this.calculateEmptyGrids(cur_year2, cur_month2, 2);
    this.calculateDays(cur_year2, cur_month2, 2);
    this.calculateEmptyGrids(cur_year3, cur_month3, 3);
    this.calculateDays(cur_year3, cur_month3, 3);
    this.calculateEmptyGrids(cur_year4, cur_month4, 4);
    this.calculateDays(cur_year4, cur_month4, 4);
    this.calculateEmptyGrids(cur_year5, cur_month5, 5);
    this.calculateDays(cur_year5, cur_month5, 5);
    this.setData({
      cur_year,
      cur_month,
      cur_year1,
      cur_month1,
      cur_year2,
      cur_month2,
      cur_year3,
      cur_month3,
      cur_year4,
      cur_month4,
      cur_year5,
      cur_month5,
      weeks_ch,
      cur_day
    });
    console.log(this.data)
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var ss = prevPage.data.dateshow;
    if (ss){
      var das ={0:{},1:{},2:{},3:{},4:{},5:{},6:{}};
      ss = ss.split('，');
      for (var i = 0; i < ss.length;i++){
        if (ss[i].indexOf(cur_year + '/' + cur_month)>-1){
          das[0][ss[i].split('/')[2]] = true;
        } else if (ss[i].indexOf(cur_year1 + '/' + cur_month1) > -1){
          das[1][ss[i].split('/')[2]] = true;
        } else if (ss[i].indexOf(cur_year2 + '/' + cur_month2) > -1) {
          das[2][ss[i].split('/')[2]] = true;
        } else if (ss[i].indexOf(cur_year3 + '/' + cur_month3) > -1) {
          das[3][ss[i].split('/')[2]] = true;
        } else if (ss[i].indexOf(cur_year4 + '/' + cur_month4) > -1) {
          das[4][ss[i].split('/')[2]] = true;
        } else if (ss[i].indexOf(cur_year5 + '/' + cur_month5) > -1) {
          das[5][ss[i].split('/')[2]] = true;
        }
      }
      this.setData({
        activeday: das
      });
    }
  },
  getyear: function (month, num) {//判断是否跨年
    if (month * 1 + num * 1 > 12) {
      return month * 1 + num * 1 - 12;//跨年
    } else {
      return month * 1 + num * 1;
    }
  },
  // 计算每月有多少天
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  // 计算每月第一天是星期几
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  // 计算在每月第一天在当月第一周之前的空余的天数
  calculateEmptyGrids(year, month, num) {
    var firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      if (num) {
        switch (num) {
          case 1: this.setData({
            hasEmptyGrid1: true,
            empytGrids1: empytGrids
          }); break;
          case 2: this.setData({
            hasEmptyGrid2: true,
            empytGrids2: empytGrids
          }); break;
          case 3: this.setData({
            hasEmptyGrid3: true,
            empytGrids3: empytGrids
          }); break;
          case 4: this.setData({
            hasEmptyGrid4: true,
            empytGrids4: empytGrids
          }); break;
          case 5: this.setData({
            hasEmptyGrid5: true,
            empytGrids5: empytGrids
          }); break;
        }
      } else {

        this.setData({
          hasEmptyGrid: true,
          empytGrids
        });
      }
    } else {

      if (num) {
        switch (num) {
          case 1: this.setData({
            hasEmptyGrid1: false,
            empytGrid1: empytGrids
          }); break;
          case 2: this.setData({
            hasEmptyGrid2: false,
            empytGrid1: empytGrids
          }); break;
          case 3: this.setData({
            hasEmptyGrid3: false,
            empytGrid1: empytGrids
          }); break;
          case 4: this.setData({
            hasEmptyGrid4: false,
            empytGrid1: empytGrids
          }); break;
          case 5: this.setData({
            hasEmptyGrid5: false,
            empytGrid1: empytGrids
          }); break;
        }
      } else {

        this.setData({
          hasEmptyGrid: false,
          empytGrids: []
        });
      }
    }
  },
  // 渲染日历格子
  calculateDays(year, month, num) {
    let days = [];

    var thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        day: i,
        choosed: false
      });
    }

    if (num) {
      switch (num) {
        case 1:
          this.setData({
            days1: days
          }); break;
        case 2:
          this.setData({
            days2: days
          }); break;
        case 3:
          this.setData({
            days3: days
          }); break;
        case 4:
          this.setData({
            days4: days
          }); break;
        case 5:
          this.setData({
            days5: days
          }); break;
      }
    } else {

      this.setData({
        days
      });
    }
  },
  // 点击日历上某一天
  tapDayItem(e) {
    var that = this;
    var idx = e.currentTarget.dataset.index;
    var activedays = e.currentTarget.dataset.day;
    var obj = that.data.activeday;
    if (idx == 0) {
      if (activedays <= that.data.cur_day) {

      } else {

        if (obj[idx][activedays]) {
          delete obj[idx][activedays]
        } else {
          obj[idx][activedays] = true;
        }
        this.setData({
          activeday: obj
        });
      }
    } else {

      if (obj[idx][activedays]) {
        delete obj[idx][activedays]
      } else {
        obj[idx][activedays] = true;
      }
      this.setData({
        activeday: obj
      });
    }
    console.log(that.data.activeday);
    // const days = this.data.days;
    // days[idx].choosed = !days[idx].choosed;
    // this.setData({
    //   days,
    // });
  },
  resetActiveDay: function () {
    this.setData({
      activeday: {
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {}
      }
    })
  },
  putActiveDay: function () {
    var returndata = {};
    var activedays = this.data.activeday;
    var that = this.data;
    returndata[that.cur_year + '/' + that.cur_month] = activedays['0'];
    returndata[that.cur_year1 + '/' + that.cur_month1] = activedays['1'];
    returndata[that.cur_year2 + '/' + that.cur_month2] = activedays['2'];
    returndata[that.cur_year3 + '/' + that.cur_month3] = activedays['3'];
    returndata[that.cur_year4 + '/' + that.cur_month4] = activedays['4'];
    returndata[that.cur_year5 + '/' + that.cur_month5] = activedays['5'];
    console.log(returndata);

    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    // prevPage.setData({
    //   returndata
    // })
    // app.setData({
    //   'returndata.otherdate': returndata
    // })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var finalday = [];
    for (var i in returndata) {
      for (var j in returndata[i]) {
        finalday.push(i + '/' + j);
      }
    }
    prevPage.setData({
      dateshow: finalday.join('，')
    })
    // prevPage.setData({
    //   dateshow:
    // })
    wx.navigateBack({
      delta: 1
    })
  }
});