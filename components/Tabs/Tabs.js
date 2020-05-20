// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      default: [],
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
    // 切换item
    itemTab(e) {
      const { index } = e.currentTarget.dataset;
      // 将索引传递到父组件
      this.triggerEvent("handleItemTab", index);
    },
  },
});
