// compontent/popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: 'title'
    },
    content: {
      type: String,
      value: 'this is the content'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleShow: function() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    confirm: function() {
      this.triggerEvent("confirm");
    },
    exit: function() {
      this.triggerEvent("exit");
    }
  }
})
