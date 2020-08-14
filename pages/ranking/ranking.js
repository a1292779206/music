// pages/rankingList/rankingList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // rankinglist: ["巅峰榜", "飙升榜", "热歌榜", "新歌榜", "人气榜", "流行指数榜", "专辑畅销榜", "听歌识曲榜", "MV榜", "由你音乐榜", "内地榜"],
        conId: 0,   //代表默认第一项
        rankinglist: [
            {
                name: "巅峰榜",
                color: "#4f7bb6",
                img: "../../image/df.jpg",
                text: "巅峰榜"
            }
        ],
        rankinglist_song: [],
        playId: "null",

    },
    jump_music(e) {
        // console.log(e)
        var _this = this;
        var num = e.currentTarget.dataset['num'];
        let str = JSON.stringify(this.data.rankinglist_song[this.data.conId][num]);
        wx.redirectTo({
            url: '/pages/music/music?jsonStr=' + str
        })
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            conId: (options.str ? options.str : 0),
        })
        var _this = this;
       
        //   请求热门歌曲接口数据
        wx.request({
            url: 'http://127.0.0.1:3000/songBig', //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res)
                _this.data.rankinglist_song.push(res.data.big);
                _this.setData({
                    rankinglist_song: _this.data.rankinglist_song,
                })
            }
        });
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
        // wx.getSystemInfo小程序所有信息
        // 获取屏幕高度
        var _this = this;
        wx.getSystemInfo({
            success(res) {
                // this.setData()页面数据同步
                _this.setData({
                    scrollHeigth: res.windowHeight
                })
            }
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