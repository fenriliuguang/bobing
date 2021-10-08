// pages/room/room.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        host : getApp().globalData.host,
        isconfig: false,
        ishelp:false,
        avatar: getApp().globalData.userInfo.avatarUrl,
        players: [
            {
                "identity":"房主",
                "name":"js",
                "avatar":getApp().globalData.host + "/static/image/wechat.png"
            },
            {
                "identity":"成员",
                "name":"js",
                "avatar":getApp().globalData.host + "/static/image/wechat.png"
            },
            {
                "identity":"成员",
                "name":"js",
                "avatar":getApp().globalData.host + "/static/image/wechat.png"
            },
            {
                "identity":"成员",
                "name":"js",
                "avatar":getApp().globalData.host + "/static/image/wechat.png"
            },
            {
                "identity":"成员",
                "name":"js",
                "avatar":getApp().globalData.host + "/static/image/wechat.png"
            },
            {
                "identity":"成员",
                "name":"js",
                "avatar":getApp().globalData.host + "/static/image/wechat.png"
            }
        ],
        show : [
            {
                "word":"状元",
                "size":"70px",
                "color":"#E1D200"
            },
            {
                "word":"对堂",
                "size":"60px",
                "color":"#ACB7BC"
            },
            {
                "word":"三红",
                "size":"50px",
                "color":"#D6772F"
            },
            {
                "word":"四进",
                "size":"40px",
                "color":"white"
            },
            {
                "word":"二举",
                "size":"40px",
                "color":"white"
            },
            {
                "word":"一秀",
                "size":"40px",
                "color":"white"
            },
            {
                "word":"很遗憾，没有中奖",
                "size":"20px",
                "color":"black"
            },
        ],
        showIndex: 6,
        canPlus: true,
        playing: 3,
        isplay: false,
        ismaster: true,
        restouzi: false,
        touzi: [1,2,3,4,5,6],
        isdone: false,
        ismyturn: true
    },
    returnHome(){
        wx.redirectTo({
          url: '/pages/home/home',
        })
    },

    switchhelp(){
        this.setData({
            ishelp : !this.data.ishelp
        })
    },

    switchconfig(){
        this.setData({
            isconfig: !this.data.isconfig
        })
    },
    onts: function(e){
        this.setData({
            isdone: true
        })
    }, 

    shake(){
        var result = 6
        var a = [0,0,0,0,0,0]
        var count = [0,0,0,0,0,0]
        for (var i = 0;i<=5;i++){
            a[i] = Math.floor(Math.random() * 5) +1
            count[a[i]-1]++
            this.setData({
                touzi : a
            })
        }

        for(var i =0;i<=5;i++){
            if(count[i] == 4){
                if(i==3){
                    result = 0
                    break
                }
                result = 3
            }
            if(count[i] >= 5){
                result = 0
                break
            }
        }

        if(count[3] == 3){
            result = 2
        }
        if(count[3] == 2){
            result = 4
        }
        if(count[3] == 1){
            result = 5
        }
        if(count[0] == 1&& count[1] == 1&& count[2] == 1&& count[3] == 1&& count[4] == 1){
            result = 1
        }

        this.setData({
            showIndex: result
        })

        this.setData({
            restouzi: true
        })
    },

    outs: function(){
        this.setData({
            isdone:false
        })
    },
    begin(){
        this.setData({
            isplay: true
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.connectSocket({
        //   url: 'ws://localhost:8080',
        // })
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