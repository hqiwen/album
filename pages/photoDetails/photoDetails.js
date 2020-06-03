// pages/photoDetails/photoDetails.js
const { findPhoto, findNextPhoto } = require('../../utils/util.js')

Page({
  startX : '',
  startY : '',
  endX : '',
  endY : '',
  monthArray: [],
  monthIndex: 0,
  index: 0,

  /**
   * 页面的初始数据
   */
  data: {
    mode: 'scaleToFill',
    isShowSharePhoto: false,
    postUrl: '',
    photo: '',
  },

  touchStart(e) {
    this.startX = e.changedTouches[0].clientX
    this.startY = e.changedTouches[0].clientY
  },

  touchEnd(e) {
    this.endX = e.changedTouches[0].clientX;
    this.endY = e.changedTouches[0].clientY;
    let turn = this.getTouchData(this.endX, this.endY, this.startX, this.startY)
    let { photo, newMonthIndex, newIndex } = findNextPhoto(this.monthArray, this.monthIndex, this.index, turn)
    this.monthIndex = newMonthIndex
    this.index = newIndex;
    this.setData({
      photo: photo
    })
    wx.setNavigationBarTitle({
      title: (this.monthIndex + 1).toString(),
    })
    console.log(this.monthIndex, this.index)
  },

  getTouchData(endX, endY, startX, startY) {
    let turn = "";
    if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
      turn = "right";
    } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
      turn = "left";
    }
    return turn;
  },

  toggleLike() {
    let photo = findPhoto(this.monthArray, this.monthIndex, this.index)
    photo.like = !photo.like
    this.setData({photo}, function() {
      console.log(this.data)
    })
  },

  removePhoto() {
    let {monthArray, monthIndex, index} = this;
    let { photo, newMonthIndex, newIndex } = findNextPhoto(monthArray, monthIndex, index, 'left');
    monthArray[monthIndex].photos.splice(index, 1)
    this.monthIndex = newMonthIndex
    this.index = newIndex;
    this.setData({
      photo
    })
    wx.setNavigationBarTitle({
      title: (this.monthIndex + 1).toString(),
    })
    console.log(monthIndex, index)
  },

  savePoster() {
    let that = this
    let promise1 = new Promise((resolve, reject) => {
      wx.getImageInfo({
        src: that.data.photo.src,
        success: res => resolve(res)
      })
    }).then(res => {
      wx.showLoading({
        title: '分享图片生成中...',
        icon: 'loading',
        duration: 1000
      })
      const query = wx.createSelectorQuery()
      query.select('#hoCanvas')
        .fields({ node: true, size: true })
        .exec((res1) => {
          console.log(res1)
          const canvas = res1[0].node
          const ctx = canvas.getContext('2d')

          const dpr = wx.getSystemInfoSync().pixelRatio;
          canvas.width = res1[0].width * dpr
          canvas.height = res1[0].height * dpr
          ctx.scale(dpr, dpr)

          let img = canvas.createImage()
          img.src = res.path
          console.log(img)
          img.onload = function() {
            ctx.drawImage(img, 0, 0, 256, 256)

            wx.canvasToTempFilePath({
                canvas: canvas,
                success: res2 => {
                  that.setData({
                    isShowSharePhoto: false
                  })
                  that.saveImageToAlbum(res2.tempFilePath);
                  wx.hideLoading()
                },
                fail: (res) => {
                  console.log(res)
                }
              }, this)
          }
        })
    })
  },

  saveImageToAlbum(path) {
    wx.saveImageToPhotosAlbum({
      filePath: path,
      success: res => {
        wx.showModal({
          title: '保存成功',
          content: '图片保存到了朋友圈，快去分享吧',
          showCancel: false,
          confirmText: '好的',
        })
      },
      fail: res => console.log(res)
    })
  },

  share(){
    let that = this
    this.setData({ isShowSharePhoto: true })
    wx.showModal({
      title: '保存',
      content: '保存到相册',
      success: res => {
        if(res.confirm) {
          that.savePoster();
          console.log('用户点击确定')
        } else if(res.cancel) {
          that.setData({ isShowSharePhoto: false })
          console.log('用户点击取消')
        }}
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptPhoto', function (res) {
      //console.log(res)
      that.setData({
        photo: res.data || [],
      })
      let { monthArray, monthIndex, index } = res
      that.monthArray = monthArray
      that.monthIndex = monthIndex
      that.index = index
      wx.setNavigationBarTitle({
        title: (monthIndex + 1).toString(),
      })
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