// pages/five/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ifshowset:true,
    roomid:'',
    password:'',
    colnum:15,
    rownum:15,
    nowPointClass:'2',//1.白色，2：.黑色
    whitenum:0,
    blacknum:0,
    ifself : true,//自娱自乐模式
    realPoint:{
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //连接websocket

    // var ws = new WebSocket("ws://47.95.208.255:8080");

    // //成功连接websoc的时候

    // ws.onopen = function () { }

    // //成功获取服务端输出的消息

    // ws.onmessage = function (e) { }

    // //连接错误的时候
    // ws.onerror = function () { }

    // //向服务端发送数据

    // ws.send();
  },
  switch1Change: function (e) {
    this.setData({
      nowPointClass: (e.detail.value?'1':'2')
    })
    console.log(this.data.nowPointClass)
  },
  roomid(e) {
    this.setData({ roomid: e.detail.value });
  },
  password(e) {
    this.setData({ password: e.detail.value });
  },
  start: function () {
    var $this = this;
    if (this.data.ifshowset){
      if (this.data.roomid && this.data.password) {
        wx.showLoading({
          title: '加载中',
        });
        wx.request({
          url: 'http://47.95.208.255:3131/game.php', //仅为示例，并非真实的接口地址
          data: {
            'roomid': $this.data.roomid,
            'password': $this.data.password,
            'type': 1,
            'alldata': '{}'
          },
          header: {
            // 'content-type': 'application/json'
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          success: function (res) {
            console.log(res)
            if (res.data.code=='010'){//获取数据成功
              $this.setData({
                ifshowset: false,
                ifself: false,
                realPoint: {},
                whitenum: res.data.whitenum,
                blacknum: res.data.blacknum
              })
              if (res.data.alldata) {//获取数据成功
                $this.setData({
                  realPoint: JSON.parse(res.data.alldata)
                })
              }
            } else if (res.data.code == '000'){//密码错误
              wx.showModal({
                title: '提示',
                content: '密码错误！',
                success: function (res) {
                  // if (res.confirm) {
                  //   $this.setData({
                  //     password: ''
                  //   })
                  // } else if (res.cancel) {
                  //   $this.setData({
                  //     password: ''
                  //   })
                  // }
                }
              })
            } else if (res.data.code == '011') {//新建房间成功
              $this.setData({
                ifshowset: false,
                ifself: false,
                realPoint: {}
              })
            }
            wx.hideLoading();
          },
          error: function () {
            wx.hideLoading();
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请输入房间号和密码！',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击取消');
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        })
      }
    }else{
      //重置房间
      $this.setData({
        ifshowset: true,
        ifself: false,
        roomid:'',
        password:''
      })
    }
    
  },
  startByselft:function(){
    this.setData({
      ifshowset: false,
      ifself: true,
      realPoint:{}
    })
    
  },
  putPoint:function(event){
    var row = event.currentTarget.dataset.row;
    var col = event.currentTarget.dataset.col;
    var realpoint = this.data.realPoint;
    var dd = '';
    var that = this;
    var color = this.data.nowPointClass;
    if (realpoint[row]) {
      if (realpoint[row][col]) {
        wx.showToast({
          title: '不能重复',
          icon: 'error',
          duration: 1000
        })
        return false;
      }else{

        if (this.data.ifself) {
          color = (this.data.nowPointClass == '1' ? '2' : '1');
          this.setData({
            nowPointClass: color
          })
        }

        dd = 'realPoint.' + row + '.' + col;
        this.setData({
          [dd]: color
        })
      }
    } 
    else{

      if (this.data.ifself) {
        color = (this.data.nowPointClass == '1' ? '2' : '1');
        this.setData({
          nowPointClass: color
        })
      }
      dd = 'realPoint.' + row ;
      this.setData({
        [dd]: {
          [col]: color
        }
      })
    }
    if (color=='1'){
      this.setData({
        'whitenum':(this.data.whitenum*1+1)
      })
    }else{
      this.setData({
        'blacknum': (this.data.blacknum*1 + 1)
      })
    }
    var result = this.ifWin();
    if(result){
      wx.showModal({
        title: '提示',
        content: '重新来吧！' + result,
        success: function (res) {
          if (res.confirm) {
            that.clearRoom();
          } else if (res.cancel) {
            that.clearRoom();
          }
        }
      })
    }else{
      if (!this.data.ifself) {
       //提交数据
       console.log(this.data)
        wx.request({
          url: 'http://47.95.208.255:3131/game.php', //仅为示例，并非真实的接口地址
          data: {
            'roomid': that.data.roomid,
            'password': that.data.password,
            'type': 0,
            'alldata': JSON.stringify(that.data.realPoint),
            'whitenum': that.data.whitenum*1,
            'blacknum': that.data.blacknum*1
          },
          header: {
            // 'content-type': 'application/json'
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          success: function (res) {
            if (res.data.code == '013') {//更新数据成功
            }
          },
          error: function () {
          }
        })
      }
    }
    console.log(JSON.stringify(this.data.realPoint))
  },
  clearRoom:function(){
    var $this = this;
    wx.request({
      url: 'http://47.95.208.255:3131/game.php', //仅为示例，并非真实的接口地址
      data: {
        'roomid': $this.data.roomid,
        'password': $this.data.password,
        'type': 2
      },
      header: {
        // 'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function (res) {
        if (res.data.code == '021') {//删除数据成功
          $this.setData({
            ifshowset: false,
            ifself: false,
            realPoint: {},
            whitenum: 0,
            blacknum: 0
          })
        } else if (res.data.code == '022') {//删除数据不成功
          $this.setData({
            ifshowset: false,
            ifself: false,
            realPoint: {},
            whitenum: 0,
            blacknum: 0
          })

          wx.showModal({
            title: '提示',
            content: '删除数据不成功！',
            success: function (res) {
              if (res.confirm) {
                
              } else if (res.cancel) {
                
              }
            }
          })
        }
      },
      error: function () {
      }
    })
  },
  ifWin:function(){
    var nowcolor = null;
    var ifHaveStatu = {};
    var statu = {};
    var result = '';
    for (var i = 0; i<this.data.rownum;i++){
      if (this.data.realPoint[i]){
        for (var j = 0; j < this.data.colnum; j++) {
          if (this.data.realPoint[i][j]) {
            nowcolor = this.data.realPoint[i][j];
            result = '';
            // 上
            if (i >= 4) {
              ifHaveStatu.shang = true;
              statu.shang = true;
              for (var x = 1; x < 5; x++) {
                if (!this.data.realPoint[i - x] || this.data.realPoint[i - x][j] != nowcolor) {
                  statu.shang = false;
                  break;
                }
              }
              if (statu.shang){
                result+='上、';
              }
            }
            // 下
            if (i <= this.data.rownum - 5) {
              ifHaveStatu.xia = true;
              statu.xia = true;
              for (var x = 1; x < 5; x++) {
                if (!this.data.realPoint[i + x]||this.data.realPoint[i + x][j] != nowcolor) {
                  statu.xia = false;
                  break;
                }
              }
              if (statu.xia) {
                result += '下、';
              }
            }
            // 左
            if (j >= 4) {
              ifHaveStatu.zuo = true;
              statu.zuo = true;
              for (var x = 1; x < 5; x++) {
                if (!this.data.realPoint[i]||this.data.realPoint[i][j - x] != nowcolor) {
                  statu.zuo = false;
                  break;
                }
              }
              if (statu.zuo) {
                result += '左、';
              }
            }
            // 右
            if (j <= this.data.colnum - 5) {
              ifHaveStatu.you = true;
              statu.you = true;
              for (var x = 1; x < 5; x++) {
                if (!this.data.realPoint[i]||this.data.realPoint[i][j + x] != nowcolor) {
                  statu.you = false;
                  break;
                }
              }
              if (statu.you) {
                result += '右、';
              }
            }
            //上左，上右
            if (ifHaveStatu.shang && ifHaveStatu.zuo) {
              ifHaveStatu.shangzuo = true;
              statu.shangzuo = true;
              for (var x = 1; x < 5; x++) {
                if (!this.data.realPoint[i - x] || this.data.realPoint[i-x][j -x] != nowcolor) {
                  statu.shangzuo = false;
                  break;
                }
              }
              if (statu.shangzuo) {
                result += '上左、';
              }
            }
            if (ifHaveStatu.shang && ifHaveStatu.you) {
              ifHaveStatu.shangyou = true;
              statu.shangyou = true;
              for (var x = 1; x < 5; x++) {
                if (!this.data.realPoint[i - x] || this.data.realPoint[i - x][j + x] != nowcolor) {
                  statu.shangyou = false;
                  break;
                }
              }
              if (statu.shangyou) {
                result += '上右、';
              }
            }
            //下左，下右
            if (ifHaveStatu.xia && ifHaveStatu.zuo) {
              ifHaveStatu.xiazuo = true;
              statu.xiazuo = true;
              for (var x = 1; x < 5; x++) {
                if (!this.data.realPoint[i + x] || this.data.realPoint[i + x][j - x] != nowcolor) {
                  statu.xiazuo = false;
                  break;
                }
              }
              if (statu.xiazuo) {
                result += '下左、';
              }
            }
            if (ifHaveStatu.xia && ifHaveStatu.you) {
              ifHaveStatu.xiayou = true;
              statu.xiayou = true;
              for (var x = 1; x < 5; x++) {
                if (!this.data.realPoint[i + x] || this.data.realPoint[i + x][j + x] != nowcolor) {
                  statu.xiayou = false;
                  break;
                }
              }
              if (statu.xiayou) {
                result += '下右、';
              }
            }
            if (result){
              if (nowcolor == 1){

                return '白方胜！'
              }else{

                return '黑方胜！'
              }
            }
            console.log(result)
          
          }

        }
      }
      
    }
   
    return '';
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})