// pages/photos/photo.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
        width: '150rpx',
        height: '150rpx',
        mode: 'scaleToFill',
        yearArray: [{
          year: '2018',
          month: [{
            month: '1',
            photos: [{
                src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
                like: true
              },
              {
                src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
                like: false
              },
            ]
          }, {
            month: '2',
            photos: [{
                src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
                like: false
              },
              {
                src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
                like: false
              },
              {
                src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
                like: false
            }]
          }]
        },{
          year: '2019',
          month: [{
            month: '1',
            photos: [
              {
                src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
                like: true
              },
              {
                src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
                like: true
              },
            ]
          }, {
            month: '2',
            photos: [{
              src: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
              like: false
            }]
          }]
        }]
  },

  toMonth: function(event) {
    let year = event.currentTarget.dataset.year
    let monthArray = this.data.yearArray.find(val => val.year === year) || []
    let monthPhotos = monthArray && monthArray.month;
    console.log(this.data.yearArray)
    wx.navigateTo({
      url: '../monthPhotos/monthPhotos',
      success: function(res) {
        res.eventChannel.emit('acceptMonthData', {
          data: monthPhotos,
          year: year
        })
      }
    })
  },

  toHome() {
    wx.navigateTo({
      url: '../photos/photos'
    })
  },

  toLove() {
    let photos = [];
    this.data.yearArray.forEach(val => {
      val.month.forEach(value => {
        photos = photos.concat(value.photos)
      })
    })
    let lovePhotos = photos.filter(val => val.like === true)
    console.log(lovePhotos);
    
    wx.navigateTo({
      url: '../lovePhoto/lovePhoto',
      success: function (res) {
        res.eventChannel.emit('acceptLovePhoto', {
          data: lovePhotos,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})