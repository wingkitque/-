// pages/booklist/booklist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://www.wingkit.xyz/qingyuan/img/search1.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://www.wingkit.xyz/qingyuan/img/search2.jpg',
    }, {
      id: 2,
      type: 'image',
        url: 'https://www.wingkit.xyz/qingyuan/img/search3.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://www.wingkit.xyz/qingyuan/img/search4.jpg'
    }],
    
    arr:[],
    searchValue:'',
    book_count:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  more: function (e) {
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    var number = e.currentTarget.dataset.number;
    var identity = e.currentTarget.dataset.identity;
    var phone = e.currentTarget.dataset.phone;
    var atten = e.currentTarget.dataset.atten;
    console.log("number:" + number)
    wx.navigateTo({
      url: `../shop_information/shop_information?id=${id}&name=${name}&number=${number}&identity=${identity}&atten=${atten}&phone=${phone}`,
    })
  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      searchValue:options.searchValue
    })
    var searchValue = that.data.searchValue
    console.log(searchValue)

    wx.request({
 //     url: 'https://www.wingkit.xyz/qingyuan/return_search_shoplist.php',
      url: 'https://www.wingkit.xyz/qingyuan/return_search_shoplist.php',
      data: {
        searchValue:searchValue
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
          that.setData({
            arry: res.data,
            book_count: res.data.length,
          })
          console.log(that.data.book_count)
        }
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