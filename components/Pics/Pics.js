// components/Pics/Pics.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      default: "",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    delImg() {
      // 自定义事假上传到父组件
      this.triggerEvent("delimg");
    },
  },
});
