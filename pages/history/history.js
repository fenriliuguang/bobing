// pages/history/history.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        host : getApp().globalData.host,
        sum:0,
        a:0,
        b:0,
        c:0,
        d:0,
        e:0,
        f:0
    },
    back : () => {
        wx.redirectTo({
          url: '/pages/home/home',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var app = getApp()
        wx.request({
          url: 'http://localhost:8080/history',
          data: {
            "openid":"2",//app.globalData.openid
          },
          method: "POST",
          success: (res) => {
              this.setData({
                  "sum" : res.data.sum,
                  "a": res.data.a,
                  "b": res.data.b,
                  "c":res.data.c,
                  "d":res.data.d,
                  "e":res.data.e,
                  "f":res.data.f,
              })
          }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.hideHomeButton()
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

    }
})