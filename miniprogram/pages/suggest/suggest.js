// pages/suggest/suggest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://www.wingkit.xyz/qingyuan/img/suggest1.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://www.wingkit.xyz/qingyuan/img/suggest2.jpg',
    }, {
      id: 2,
      type: 'image',
        url: 'https://www.wingkit.xyz/qingyuan/img/suggest3.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://www.wingkit.xyz/qingyuan/img/suggest4.jpg'
    }],
  },

  suggest:function(e){
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `../feedback/feedback?type=${type}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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