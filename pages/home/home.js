// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        unionid : null,
        userInfo : null,
        isdone: [false,false,false]
    },

    nextPage: (e) => {
        switch(e.currentTarget.dataset.dd) {
            case '0':
                wx.redirectTo({
                  url: '/pages/newRoom/newRoom',
                })
                break
            case '1':
                wx.redirectTo({
                  url: '/pages/history/history',
                })
                break
            case '2':
                wx.redirectTo({
                  url: '/pages/culture/culture',
                })
                break
        }
    },

    onts: function(e){
        var d = [false,false,false]
        d[parseInt(e.currentTarget.dataset.dd)] = true
        this.setData({
            isdone: d
        })
    }, 

    outs: function(e){
        this.setData({
            isdone: [false,false,false]
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        var app = getApp()
        this.setData({
            userInfo: app.globalData.userInfo,
            unionid: app.globalData.unionid
        })
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