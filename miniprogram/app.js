//app.js
//const app = getApp()
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var code = res.code
          //console.log(code)
          //发送请求
//           wx.request({
//             url: 'https://www.wingkit.xyz/mini/demo.php', //接口地址
//             data: {
//               code: code,
//             },
//             method: 'GET',
//             header: {
//               'content-type': 'application/json' //默认值
//             },
//             success: function (res) {
//               //得到openid
//               var openid = res.data.openid
//               console.log("app.js加载的openID:"+openid)
// //              app.globalData.openid = res.data.openid
//             }
//           })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log('已经授权')
              console.log(res.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    other_userInfo: null,
    other_openid:0,
    other_nickName:"null",
    other_gender:1,
    other_head:"null",
    openid: 0,
    seat_no: "001",
  }
})