// components/home/home.js
const app = getApp();
const { API, beats, icom, config, mta, regeneratorRuntime, promisify, Router } = app;
let myVideo;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showHome: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    ready() {
      myVideo = wx.createVideoContext('myVideoBox');
    }
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () { },
    hide: function () { },
    resize: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //即刻购买
    btnBuyClick() {
      icom.alert('敬请期待');
    },
    //参与互动
    btnActClick() {
      wx,wx.navigateTo({
        url: '/pages/web/web?v=' + Math.random()
      })
    }
  }
})
