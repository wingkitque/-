const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    inputValue: '',
    inputTime: '',
    head: '',
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    userInfo: {},
    pic: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hidden1:true,
    anonymity:false,
    openid:'',
    reader_id:'',
    reader_existence:false,
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

  onLoad: function () {
    var that = this
    that.setData({
      userInfo:app.globalData.userInfo
    })
    var openid = app.globalData.openid;
    console.log(openid)
    wx.request({
      url: 'https://www.wingkit.xyz/qingyuan/return_talk.php',
      data: {
        openid: openid
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

  //数据双向绑定 获取文本详细值
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  add_talk:function(){
    this.setData({
      hidden1:false
    })
  },

  identity_real_me:function(e){
    wx.showToast({
      title: '不能私聊自己哟~~',
      icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
      duration: 2000,
      mask: true    //是否有透明蒙层，默认为false 
      //如果有透明蒙层，弹窗的期间不能点击文档内容 
    })
  },

  identity_real:function(e){
    var other_nickName = e.target.dataset.nickname;
    wx.showModal({
      title: '与'+other_nickName+'私聊',
      content: '确认要进行私聊吗？',
      success: function (res) {
        if (res.confirm) {
          console.log(e)
          var openid = e.target.dataset.openid;
          var nickName = e.target.dataset.nickname;
          var gender = e.target.dataset.gender;
          var head = e.target.dataset.head;
          console.log("forum页面对方的openid:" + openid);
          console.log("forum页面对方的nickName:" + nickName);
          console.log("forum页面对方的gender:" + gender);
          console.log("forum页面对方的head:" + head);
          wx.navigateTo({
            url: `../private_chat/private_chat?other_openid=${openid}&other_nickName=${nickName}&other_gender=${gender}&other_head=${head}`,
          })
        } else {
          console.log('点击取消')
        }
      }
    })
    
  },

  sendthem: function () {
    //wx.setStorageSync('key', this.data.num)
    var that = this;
    var inputValue = that.data.inputValue;
    var stamp = + new Date();  //获取时间戳
    var inputTime = util.format(stamp);  // 转换成标准时间格式
    var flag = true;
    var openid = app.globalData.openid;
    var nickName = that.data.userInfo.nickName;
    var gender = that.data.userInfo.gender;
    var head = that.data.userInfo.avatarUrl;

    var anonymity = that.data.anonymity; //匿名true or false
    var region = that.data.TabCur;
    
    console.log(nickName)
    console.log(gender)
    console.log(head)
    console.log(inputTime)
    console.log(app.globalData.openid)
    console.log(anonymity)
    console.log(region)
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
        wx.request({
          url: 'https://www.wingkit.xyz/qingyuan/add_talk.php',
          data: {
            inputValue: inputValue,
            time: inputTime,
            openid: openid,
            nickName: nickName,
            gender: gender,
            head: head,
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
