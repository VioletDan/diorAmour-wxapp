const app = getApp();
const { API, beats, icom, config, mta, regeneratorRuntime, promisify, Router } = app;
//-------------------------------------------------------初始化-------------------------------------------------------
let $query, toNext, $page;
let myVideo;
let idArr = ['#home', '#customized', '#order', '#personal'];
Page({
  data: {
    currentPageIndex: 0,
    show: false, //显示tabbar
    appData: app.data,
    bgmPlay: false,
    showAuth: false, //授权
    getInfo: 'getNumber',
    showLand: true, //showLand
    showHome:false
  }, //页面的初始数据
  onLoad(option) {
    icom.OS();
    $page = this;
    $query = option;
    console.log('getQueryString', option);
    app.initApp();
  },
  onReady: function () {
  }, //监听页面初次渲染完成
  onShow: function () {
  }, //监听页面显示
  onHide: function () { }, //监听页面隐藏
  onUnload: function () { }, //监听页面卸载
  onPullDownRefresh: function () { }, //页面相关事件处理函数--监听用户下拉动作
  onReachBottom: function () { }, //页面上拉触底事件的处理函数
  onShareAppMessage: function () { //用户点击右上角分享
    return app.setShareData();
  },
  // 更新数据
  //=========== Event ============
  navChange(e) {
    let index = e.detail;
    this.setData({
      currentPageIndex: index
    });
  },
  // 取消授权
  onAuthCancle(e) {
    console.log(e.detail)
    //播放视频
    myVideo.play()
    $page.setData({
      showAuth: false,
      loadingDiolag: false,
    })
  },
  // 拿到授权
  onAuthSure(e) {
    console.log(e.detail)
  }

}) //end page

//-------------------------------------------------------业务逻辑-------------------------------------------------------
