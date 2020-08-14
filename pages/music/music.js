// pages/music/music.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        collection: [], //存储歌曲信息
        num:0,            // 获取路径索引值
        lastSong:true,    //判断点击
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
            app.globalData.collect.forEach(function(item, index) {
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
        app.globalData.near.forEach(function(item) {
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
        this.timer = setInterval(function() {
            _this.data.rotate++;
            _this.setData({
                rotate: _this.data.rotate,
            })
        }, 100)
    },
    // 暂停播放
    autoPause() {
        var _this = this;
        this.setData({
            isStop: (!_this.data.isStop)
        })
        clearInterval(this.timer);
        _this.audioCtx.pause()
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
    // 上一首
    lastSong(e){
        var _this = this;
        var index = this.data.collection;
        // console.log(e)
        // console.log(index)
        var mathfont = this.data.num
        if (mathfont > 17){
            this.data.num = 0
        }else{
            this.data.num++;
        }
        var isStop = false
        // 歌词制作
        var str = index[this.data.num].word;
        var arr = [];
        var arr2 = [];
        arr = str.split(',');
        for (var i = 0; i < arr.length; i++) {
            if (i % 2 == 0) {
                var obj = {
                    time: arr[i],
                    text: arr[i + 1]
                }
                arr2.push(obj)
            }
        }
        this.setData({
            song: index[_this.data.num].src,
            songImg: index[_this.data.num].hotImg,
            musicWord: arr2,
            isStop: isStop
        })
        // console.log(this.data.num)
        _this.audioCtx.play()
    },
    // 下一首
    nextSong(e){
        var _this = this;
        var index = this.data.collection;
        var mathfont = this.data.num
        if (mathfont < 1){
            this.data.num = 18
        }else{
            this.data.num--
        }
        var isStop = false
        // 歌词制作
        var str = index[this.data.num].word;
        var arr = [];
        var arr2 = [];
        arr = str.split(',');
        for (var i = 0; i < arr.length; i++) {
            if (i % 2 == 0) {
                var obj = {
                    time: arr[i],
                    text: arr[i + 1]
                }
                arr2.push(obj)
            }
        }
        this.setData({
            song: index[_this.data.num].src,
            songImg: index[_this.data.num].hotImg,
            musicWord: arr2,
            isStop: isStop
        })
    },
    // 歌词高亮与滚动功能
    change(e) {
        // 获取播放时间
        // console.log(e)
        var allm = "0" + parseInt(e.detail.duration / 60);
        var m = "0" + parseInt(e.detail.currentTime / 60);
        var s = parseInt(e.detail.currentTime % 60);
        var widt = (m / allm * width)
        if (s < 10) {
            s = "0" + s;
        };
        var str = m + ":" + s;
        var str1 = allm + ":" + s;
        // console.log({
        //     str: str,
        //     s:s,
        //     str1: str1
        // })
        // var curr = (allm / m * 76%);
       
        // var str = m + ":" + s;
        for (var i = 0; i < this.data.musicWord.length; i++) {
            // 歌词时间与播放时间比较
            if (this.data.musicWord[i].time == str) {
                if (this.data.songActive != i) {
                    // 高亮的歌词
                    this.setData({
                        songActive: i,
                        str: str,
                        str1: str1
                    })
                    // 滚动的距离
                    this.data.distance -= 30;
                    this.setData({
                        distance: this.data.distance,
                    })
                    break;
                }
            }

        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        // 把传入的数据转为对象
        var object = JSON.parse(options.jsonStr);
        // console.log(object)
        this.setData({
            collection: object,
            song: object.src,
            songImg: object.hotImg,
        })
        // 获取全局变量收藏数组信息判断是否收藏过
        var app = getApp();
        app.globalData.collect.forEach(function (item) {
            if (item.src == _this.data.song) {
                _this.setData({
                    collect: "../../image/collect.png",
                    isCollect: false
                })
            }
        })
        // 歌词制作
        var str = object.word;
        var arr = [];
        var arr2 = [];
        arr = str.split(',');
        for (var i = 0; i < arr.length; i++) {
            if (i % 2 == 0) {
                var obj = {
                    time: arr[i],
                    text: arr[i + 1]
                }
                arr2.push(obj)
            }
        }
        this.setData({
            musicWord: arr2,
        });
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
    onReady: function(e) {
        this.audioCtx = wx.createAudioContext('myAudio');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})