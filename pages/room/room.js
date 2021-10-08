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
        ismyturn: true,
        socket: wx.connectSocket({
            url: 'ws://localhost:8080/room',
          }),
        wait : true
    },
    returnHome(){
        wx.redirectTo({
          url: '/pages/home/home',
        })
    },

    onShareAppMessage(){
        return {
            title: '一起博饼吧',
            path: '/pages/login/login?roomid=' + getApp().globalData.myroom // 路径，传递参数到指定页面。
        }
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


        this.data.socket.send(JSON.stringify({
            ID: getApp().globalData.openid,
            Content: JSON.stringify({
                type : 1,
                roomid: getApp().globalData.roomid,
                openid: getApp().globalData.openid,
                touzi : a,         // 牌型
                result : result    // 结果
            }),
            SentAt: 0,
            Type: 1
        }))

        while(this.data.wait){

        }

        this.setData({
            restouzi: true,
            wait: true
        })
    },

    outs: function(){
        this.setData({
            isdone:false
        })
    },
    begin(){
        this.data.socket.send(JSON.stringify({
            ID: getApp().globalData.openid,
            Content: JSON.stringify({
                type : 2,
                roomid: getApp().globalData.roomid,
                openid: getApp().globalData.openid,
            }),
            SentAt: 0,
            Type: 1
        }))
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var d = new Date

        // 发送注册信息
        var registerMsg = {
            ID: getApp().globalData.openid,
            Content: "",
            SentAt: d.getTime(),
            Type: 3
        }

        this.data.socket.onOpen = () =>{
            this.data.socket.send(JSON.stringify(registerMsg))
        }

        this.data.socket.onMessage = (data) =>{
            var resMsg = JSON.parse(data)
            var c = JSON.parse(resMsg.Content)
            switch (c.type) {
                // type == 0 表示有新成员加入房间,将服务端准备好的用户列表装入
                // data 结构为 {
                //     ID : "",
                //     Content : "{             -------- Content 是一个JSON字符串 
                //         "type": 0;
                //         "players": [
                //             {
                //                 "identity":"房主",
                //                 "name":"js",
                //                 "avatar":""
                //             },
                //             {
                //                 "identity":"成员",
                //                 "name":"js",
                //                 "avatar":""
                //             }
                //         ]
                //     }"
                // }
                case 0:
                    this.setData({
                        players : c.players
                    })
                    break;
                case 1:
                    // type == 1 表示 某个玩家摇骰子结束
                    // Content 结构为 {
                    //     "type":1,
                    //     "index":0,            ------   该玩家在数组players中的下标
                    //     "touzi":[1,2,3,4,5,6] ------   摇色子牌型
                    //     "showIndex": 2        ------   该玩家获奖情况
                    //     "next":1,             ------   下一个玩家players下标
                    //     "openid":""           ------   该玩家id
                    // }
                    this.setData({
                        touzi:c.touzi,
                        wait: false,                   // 取消阻塞
                        showIndex: c.showIndex
                    })

                    setTimeout(()=>{
                        this.setData({
                            ismyturn: getApp().globalData.openid === c.openid,
                            playing: c.next
                        })
                    },500)
                    break;
                case 2:
                    // type == 2 表示 房主声明游戏开始
                    // Content 结构为 {
                    //     "type":2,
                    //     "index":0,            ------   房主在数组players中的下标
                    //     "openid":""           ------   该玩家id
                    // }
                    this.setData({
                        isplay:true,
                        ismyturn: getApp().globalData.openid === c.openid,
                        playing: c.index,
                    })
                default:
                    break;
            }
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

        var d = new Date
        // 发送用户加入房间信息
        var msg = {
            ID: getApp().globalData.openid,
            Content: JSON.stringify({
                type : 0,     // 发送的数据，type == 0表示加入房间
                roomid: getApp().globalData.roomid,
                openid: getApp().globalData.openid,
                userInfo: getApp().globalData.userInfo,
                msg: "用户加入房间"
            }),
            SentAt: d.getTime(),
            Type: 1
        }

        this.data.socket.send(JSON.stringify(msg))

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
})