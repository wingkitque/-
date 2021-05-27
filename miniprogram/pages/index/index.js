//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    sum:0,
    sum_max:0,
    seat_no:'true',
    searchValue:'',

    //轮播图
    imgUrls: [
      'https://www.wingkit.xyz/qingyuan/img/index1.jpg',
      'https://www.wingkit.xyz/qingyuan/img/index2.jpg',
      'https://www.wingkit.xyz/qingyuan/img/index3.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
//    console.log(that.data.moment);
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
    that.onLoad();
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  get:function(){
    wx.navigateTo({
      url: '../get/get',
    })
  },
  how:function(){
    wx.navigateTo({
      url: '../how/how',
    })
  },
  show:function(){
    wx.navigateTo({
      url: '../show/show',
    })
  },
  shoplist: function () {
    wx.switchTab({
      url: '../shoplist/shoplist',
    })
  },
  suggest:function(){
    wx.navigateTo({
      url: '../suggest/suggest',
    })
  },
  //查找书籍
  //数据双向绑定 获取文本详细值
  bindKeyInput: function (e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  search_book:function(){
    var that = this
    console.log(that.data.searchValue)
    var searchValue = that.data.searchValue;
    wx.navigateTo({
      url: `../search_shoplist/search_shoplist?searchValue=${searchValue}`,
    })
  },
  onLoad: function () {
    var that = this
    var openid;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code
        //console.log(code)
        //发送请求
        wx.request({
          url: 'https://www.wingkit.xyz/qingyuan/demo.php', //接口地址
          data: {
            code: code,
          },
          method: 'GET',
          header: {
            'content-type': 'application/json' //默认值
          },
          success: function (res) {
            //得到openid
            openid = res.data.openid
            console.log("index.js加载的openID：" + openid)
            app.globalData.openid = res.data.openid
          }
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
       app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            encryptedData: res.encryptedData,
            iv: res.iv,
            hasUserInfo: true
          })
        }
      })
    }
  },


  getUserInfo: function (e) {
    var _this = this
    wx.login({
      success: function (res) {
        // console.log(res)
        _this.setData({
          code: res.code,
        })
      },
      fail: function (r) { },
    })

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      hasUserInfo: true
    })
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    if (res.from === 'share') {
    }
    return {
      title: '清远消费券使用指南',
      path: '/pages/index/index',
      success: function (res) {
        console.log('成功', res)
      }
    }
  }
})
