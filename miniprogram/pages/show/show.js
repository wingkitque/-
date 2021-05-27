// pages/show/show.js
Page({

  /**
   * 页面的初始数据
   */
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


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  previewImage: function (e) {
    console.log(1);
    var current = e.target.dataset.src;   //这里获取到的是一张本地的图片
    wx.previewImage({
      current: current,//需要预览的图片链接列表
      urls: [current]  //当前显示图片的链接
    })
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