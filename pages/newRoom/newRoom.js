// pages/newRoom/newRoom.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        host : getApp().globalData.host,
        array : [
            {
                "prize" : "",
                "amount" :0
            },
            {
                "prize" : "",
                "amount" :0
            },
            {
                "prize" : "",
                "amount" :0
            },
            {
                "prize" : "",
                "amount" :0
            },
            {
                "prize" : "",
                "amount" :0
            },
            {
                "prize" : "",
                "amount" :0
            }
        ],
        isdone:false,
        num : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    },
    getvalue: function(e){
        var newarray = this.data.array
        newarray[e.currentTarget.dataset.index].prize = e.detail.value
        this.setData({
            array: newarray
        })
    },
    bindPickerChange: function(e){
        var newarray = this.data.array
        newarray[e.currentTarget.dataset.index].amount = e.detail.value
        this.setData({
            array: newarray
        })
    },
    back : () => {
        wx.redirectTo({
          url: '/pages/home/home',
        })
    },
    onts: function(e){
        this.setData({
            isdone: true
        })
    }, 

    outs: function(){
        this.setData({
            isdone:false
        })
    },

    build: function(){
        var app = getApp()
        wx.request({
            // 新建房间，根据房主openid和时间戳生成唯一的房间号，并初始化房间信息
            url: 'http://localhost:8080/build',
            method: "POST",
            data: {
                openid : app.globalData.openid,
                roomInfo : JSON.stringify(this.data.array)
            },
            dataType:"json",
            // 返回房间id
            success: function(res){
                app.globalData.myroom = res.data.roomid
                wx.redirectTo({
                  url: '/pages/room/room',
                })
            }
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