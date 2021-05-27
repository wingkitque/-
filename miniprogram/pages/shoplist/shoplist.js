const app = getApp()
Page({
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://www.wingkit.xyz/qingyuan/img/shoplist1.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://www.wingkit.xyz/qingyuan/img/shoplist2.jpg',
    }, {
      id: 2,
      type: 'image',
        url: 'https://www.wingkit.xyz/qingyuan/img/shoplist3.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://www.wingkit.xyz/qingyuan/img/shoplist4.jpg'
    }],


    arry: [],
    only_usable: false,
    Tab1: ["电商", "餐饮", "酒店", "旅游"],
    TabCur: 0,
    list: [],
    load: true
  },
  tabSelect(e) {
    var that = this;
    that.setData({
      TabCur: e.currentTarget.dataset.id,
      //      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    console.log("TabCur的值为:" + that.data.TabCur)
    //    console.log("scrollLeft的值为:"+that.data.scrollLeft)
  },
  onLoad: function () {

    var that = this;
    console.log("日志登陆")
    wx.login({
      success: function (res) {
        var code = res.code
        //console.log(code)
        //发送请求
        // console.log('openid是：' + openid)
        wx.request({
          url: 'https://www.wingkit.xyz/qingyuan/return_shoplist.php',
          data: {
            // openid: openid
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
      }
    })
  },
  onShow: function () {
    //   this.onLoad()
    console.log('页面显示')
  },
  more: function (e) {
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    var number = e.currentTarget.dataset.number;
    var identity = e.currentTarget.dataset.identity;
    var phone = e.currentTarget.dataset.phone;
    var atten = e.currentTarget.dataset.atten;
    console.log("number:"+number)
    wx.navigateTo({
      url: `../shop_information/shop_information?id=${id}&name=${name}&number=${number}&identity=${identity}&atten=${atten}&phone=${phone}`,
    })
  },

  SetShadow(e) {
    var that = this
    if (that.data.only_usable == false) {
      that.setData({
        shadow: e.detail.value,
        only_usable: true
      })
    }
    else {
      that.setData({
        shadow: e.detail.value,
        only_usable: false
      })
    }

    console.log(that.data.only_usable)
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


