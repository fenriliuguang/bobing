// app.js
App({
  onLaunch() {
    wx.loadFontFace({
      family: '汉仪尚魏手书',
      source: "url('http://localhost:8080/HYShangWeiShouShuW.ttf')",
      global: true
    })
  },
  globalData: {
    userInfo: null,
    isLogin: false,
    unionid: null,
    openid: "test",
    myroom: ""
  },
})
