// pages/todo/todo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    todoList: ['a', 'b', 'c']
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
    this.popup = this.selectComponent("#popup");
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
    
  },

  showPopup: function() {
    this.popup.toggleShow();
  },

  confirm: function () {
    this.popup.toggleShow();
    console.log("confirm")
  },
  exit: function () {
    this.popup.toggleShow();
    console.log('exit')
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  addList: function () {
    if (!this.data.inputValue) {
      this.showPopup()
    } else {
      let todoList = [...this.data.todoList, this.data.inputValue]
      this.setData({
        inputValue: '',
        todoList: todoList
      })
    }
  },
  removeList: function (e) {
    let index = e.currentTarget.dataset.indexofitem
    this.data.todoList.splice(index, 1)
    this.setData({
      todoList: this.data.todoList
    })
  },
  clearList: function () {
    let todoList = []
    this.setData({
      todoList: todoList
    })
  }
})
