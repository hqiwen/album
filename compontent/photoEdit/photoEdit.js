// compontent/photoEdit/photoEdit.js
Component({

  startX : '',
  startY : '',
  endX : '',
  endY : '',

  /**
   * 组件的属性列表
   */
  properties: {
    photo:{
      type: "string",
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    touchStart(e) {
      this.startX = e.changedTouches[0].clientX
      this.startY = e.changedTouches[0].clientY
    },

    touchEnd(e) {
      this.endX = e.changedTouches[0].clientX;
      this.endY = e.changedTouches[0].clientY;
      let turn = this.getTouchData(this.endX, this.endY, this.startX, this.startY)
      this.triggerEvent("finishedTouch", {turn})
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
      this.triggerEvent("toggleLike")
    },

    removePhoto() {
      this.triggerEvent("removePhoto")
    },
  
    share(){
      this.triggerEvent("share")
    },

  }
})
