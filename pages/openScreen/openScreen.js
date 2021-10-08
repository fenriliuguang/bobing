// pages/openScreen/openScreen.js
Page({
    /**
     * 生命周期函数--监听页面显示
     * 开屏页自动跳转
     */
    data: {
        host : getApp().globalData.host,
    },
    onShow: function () {
        wx.hideHomeButton()
        setTimeout(function(){
            wx.redirectTo({
              url: '/pages/login/login',
            })
        },3000)
    }
})