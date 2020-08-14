// pages/music/music.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collection: [], //存储歌曲信息
        num: 0,            // 获取路径索引值
        lastSong: true,    //判断点击
        // big:[],        // 所有歌词    
        isStop: true, //播放与暂停的判断
        musicWord: [], //存储歌词
        musicActive: 0, //高亮的歌词
        distance: 30, //歌词滚动距离
        rotate: 0,
        timer: null, //定时器
        isCollect: true, // 是否收藏判断
        collect: "../../image/collect_h.png" //收藏的图片路径
    },
    collection() {
        var _this = this;
        this.data.isCollect != this.data.isCollect
        this.setData({
            collect: (_this.data.isCollect ? "../../image/collect.png" : "../../image/collect_h.png")
        })
        // 将收藏的歌曲存储到全局变量中
        var app = getApp();
        if (this.data.collect == "../../images/collect_h.png") {
            app.globalData.collect.forEach(function (item, index) {
                if (item.src == _this.data.song) {
                    app.globalData.collect.splice(index, 1);
                }
            })
        } else {
            app.globalData.collect.push(this.data.collection);
        }
    },

    // 音乐播放
    autoplay() {
        var _this = this;
        this.setData({
            isStop: (!_this.data.isStop)
        });
        _this.audioCtx.play()
        // 将歌曲存储到全局变量中
        var app = getApp();
        app.globalData.near.forEach(function (item) {
            if (item.src == _this.data.song) {
                _this.setData({
                    isPlay: true,
                })
            }
        });
        if (this.data.isPlay != true) {

            app.globalData.near.push(this.data.collection);
        }
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            _this.data.rotate++;
            _this.setData({
                rotate: _this.data.rotate,
            })
        }, 100)
    },
    // 播放结束
    ended() {
        var _this = this;
        clearInterval(this.timer);
        this.setData({
            isShow: (!_this.data.isShow),
            songActive: 0,
            distance: 30,
            rotate: 0,
        });
    },
    // 下一首
    nextSong(e) {
        var _this = this;
        var index = this.data.collection;
        var mathfont = this.data.num
        if (mathfont < 1) {
            this.data.num = 18
        } else {
            this.data.num--
        }
        var isStop = false
        
        this.setData({
            song: index[_this.data.num].src,
            isStop: isStop
        })
        _this.audioCtx.play()
        console.log(e)
        console.log(index)
        console.log(_this.data.num)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        wx.request({
            url: 'http://127.0.0.1:3000/songBig', //仅为示例，并非真实的接口地址
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                //   console.log(res)
                _this.setData({
                    collection: res.data.big,
                })
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function (e) {
        this.audioCtx = wx.createAudioContext('myAudio');
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