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
    userInfo: {
      avatarUrl: "http://localhost:8080/static/image/wechat.png"
    },
    isLogin: false,
    unionid: null,
    openid: "test",
    myroom: "",
    host:"http://localhost:8080"
  },
})
