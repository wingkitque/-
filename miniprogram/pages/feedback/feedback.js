const util = require('../../utils/util.js')
const app = getApp()
Page({

  data: {
    type:'',
    inputValue: '',
    inputTime: '',
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  onLoad: function (e) {
    this.setData({
      type:e.type
    })
    console.log(e)
    console.log(this.data.type)

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
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

  //数据双向绑定 获取文本详细值
  bindKeyInput: function (e) {
    this.setData({
      value: e.detail.value
    })
  },

  saveMemo: function () {
    //wx.setStorageSync('key', this.data.num)
    var that = this;
    var inputValue = that.data.value;
    var stamp = +new Date();  //获取时间戳
    var inputTime = util.format(stamp);  // 转换成标准时间格式
    var flag = true;
    var openid = 0;
    var nickName = that.data.userInfo.nickName;
    var gender = that.data.userInfo.gender;
    var head = that.data.userInfo.avatarUrl;
    //post至数据库保存
    //判断是否为空
    if (inputValue == '' || inputValue == undefined) {
      wx.showToast({
        title: '内容不能为空！',
        icon: 'none',
        duration: 2000
      })
    } else {
      //判断是否超过字长
      if (inputValue.length > 80) {
        wx.showToast({
          title: '字数不能多于80！',
          icon: 'none',
          duration: 2000
        })
      }
      else {
        //验证完后开始保存数据库

        //先获取openid
        wx.login({
          success: function (res) {
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
                //给全局变量赋值
                app.globalData.openid = res.data.openid
                //console.log('这是全局量：' + app.globalData.openid)
                openid = app.globalData.openid;
                //console.log('这是局部变量：' + app.globalData.openid)
                // console.log(openid)
                //成功后连同openid一起保存至数据库
                wx.request({
                  url: 'https://www.wingkit.xyz/qingyuan/wxdb_savedata.php',
                  //data: { value: inputValue,time: inputTime },
                  data: {
                    value: inputValue,
                    time: inputTime,
                    openid: openid,
                    nickName: nickName,
                    gender: gender,
                    head: head
                  },
                  method: 'GET',
                  header: { "content-type": "application/x-www-form-urlencoded" },
                  success: function (res) {
                    console.log(res.data)
                    wx.showToast({
                      title: '添加成功！',
                      icon: 'error',
                      duration: 1000
                    })
                    that.setData({ value: '', })
                    that.setData({ inputValue: '', })
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }
                })

              }
            })
          }
        })
      }
    }
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
