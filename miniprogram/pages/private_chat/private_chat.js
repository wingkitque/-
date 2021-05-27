const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    inputValue: '',
    inputTime: '',
    head: '',
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    userInfo: {},
    other_userInfo: {},
    pic: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hidden1: true,
    anonymity: false,
    openid: '',
    other_openid:'',
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    //        console.log(that.data.moment);
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
    that.onLoad();
  },

  onLoad: function (e) {
    var that = this;
    if(e != undefined)
    wx.setNavigationBarTitle({
      title: '私聊【'+e.other_nickName+'】中'
    })
    that.setData({
      userInfo: app.globalData.userInfo,
      openid: app.globalData.openid,
    })
    console.log("e的值:"+e)
    if(!(e == undefined))
    (
      app.globalData.other_openid = e.other_openid,
      app.globalData.other_nickName = e.other_nickName,
      app.globalData.other_gender = e.other_gender,
      app.globalData.other_head = e.other_head
    )
    console.log("对方的openid:" + app.globalData.other_openid)
    console.log("对方的nickName:" + app.globalData.other_nickName)
    console.log("对方的gender:" + app.globalData.other_gender)
    console.log("对方的head:" + app.globalData.other_head)
    var send_openid = app.globalData.openid;
    var receive_openid = app.globalData.other_openid;
    console.log("我的openid:"+send_openid)
    wx.request({
      url: 'https://www.wingkit.xyz/qingyuan/return_private_talk.php',
      data: {
        send_openid: send_openid,
        receive_openid: receive_openid,
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data),
          that.setData({ arry: res.data, })
      }
    })
  },

  //数据双向绑定 获取文本详细值
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  add_talk: function () {
    this.setData({
      hidden1: false
    })
  },

  identity_real: function (e) {
    var openid = e.target.dataset.openid;
    console.log("对方的openid:" + openid);
    wx.navigateTo({
      url: `../private_chat/private_chat?other_openid=${openid}`,
    })
  },

  sendthem: function () {
    //wx.setStorageSync('key', this.data.num)
    var that = this;
    var inputValue = that.data.inputValue;
    var stamp = + new Date();  //获取时间戳
    var inputTime = util.format(stamp);  // 转换成标准时间格式
    var flag = true;
    var send_openid = app.globalData.openid;
    var send_nickName = that.data.userInfo.nickName;
    var send_gender = that.data.userInfo.gender;
    var send_head = that.data.userInfo.avatarUrl;
    var receive_openid = app.globalData.other_openid;
    var receive_nickName = app.globalData.other_nickName;
    var receive_gender = app.globalData.other_gender;
    var receive_head = app.globalData.other_head;

    var anonymity = that.data.anonymity; //匿名true or false

    console.log("发送方nickName:"+send_nickName)
    console.log("发送方gender:"+send_gender)
    console.log("发送方head:"+send_head)
    console.log("发送方openid:"+send_openid)
    console.log("接收方nickName:" + receive_nickName)
    console.log("接收方gender:" + receive_gender)
    console.log("接收方head:" + receive_head)
    console.log("接收方openid:" + receive_openid)
    console.log("发送的数据inputTime："+inputValue)
    console.log("发送的时间inputTime："+inputTime)
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
      if (inputValue.length > 100) {
        wx.showToast({
          title: '字数不能多于100！',
          icon: 'none',
          duration: 2000
        })
      }
      else {
        wx.request({
          url: 'https://www.wingkit.xyz/qingyuan/add_private_talk.php',
          data: {
            inputValue: inputValue,
            time: inputTime,
            send_openid: send_openid,
            send_nickName: send_nickName,
            send_gender: send_gender,
            send_head: send_head,
            receive_openid: receive_openid,
            receive_nickName: receive_nickName,
            receive_gender: receive_gender,
            receive_head: receive_head,
            anonymity: anonymity,
          },
          method: 'GET',
          header: { "content-type": "application/x-www-form-urlencoded" },
          success: function (res) {
            console.log(res.data)
            wx.showToast({
              title: '发送成功！',
              icon: 'error',
              duration: 1000
            })
            that.setData({ inputValue: '', })
            that.onLoad();
          }
        })
      }
    }
    this.setData({
      hidden1: true
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
