// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        host : getApp().globalData.host,
        isdone: false,
        userInfo: null,
        avatarUrl: getApp().globalData.host + "/static/image/wechat.png",
        isLogin: false,
        isshare: false,
        roomid : ""
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

    canLogin: function () {
        if (!this.data.isLogin){
            wx.getUserProfile({
                desc : "用于完善个人信息",
                success: (res) => {
                    this.setData({
                        userInfo: res.userInfo,
                        avatarUrl :res.userInfo.avatarUrl,
                        isLogin: true
                    })
                    setTimeout(()=>{
                        wx.login({
                            success: (res) => {
                                if (res.code) {
                                    wx.request({
                                        // 登录接口
                                        url: 'http://localhost:8080/login',
                                        data: {
                                            code: res.code
                                        },
                                        success: (r) => {
                                            
                                            var app = getApp()
                                            app.globalData.isLogin = true
                                            app.globalData.unionid = r.data.unionid
                                            app.globalData.openid = r.data.openid
                                            app.globalData.userInfo = this.data.userInfo

                                            if(this.data.isshare){
                                                app.globalData.roomid = this.data.roomid
                                                wx.redirectTo({
                                                  url: '/pages/room/room',
                                                })
                                            }else {
                                                wx.redirectTo({
                                                    url: '/pages/home/home',
                                                })
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    },1000)
                }
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.roomid != undefined){
            this.setData({
                isshare: true,
                roomid: options.roomid
            })
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.hideHomeButton()
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