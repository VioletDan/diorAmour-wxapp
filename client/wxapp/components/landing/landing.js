// components/landing/landing.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showLand: Boolean
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
    btnJumpClick() {
      this.setData({
        showLand: false
      });
      let pages = getCurrentPages();
      let page = pages[pages.length - 1];
      page.setData({ showLand: false, showHome: true });
    }
  }
})
