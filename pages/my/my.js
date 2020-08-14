// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        near_playId: "null", //判断最近中歌曲的哪一首歌要播放
        collect_playId: "null",//判断收藏中歌曲的哪一首歌要播放
        near: [],               //存储最近歌曲信息
        collects: [],           //存储收藏歌曲信息
        tab: true               //判断切换最近与收藏
    },
    history() {
        this.setData({
            tab: false,
        })
    },
    like() {
        this.setData({
            tab: true,
        })
    },
    // 播放歌曲
    play(e){
        var _this = this;
        // 初始化歌曲的状态
        wx.createAudioContext(this.data.near_playId).pause();
        wx.createAudioContext(this.data.near_playId).seek(0);
        wx.createAudioContext(this.data.collect_playId).pause();
        wx.createAudioContext(this.data.collect_playId).seek(0);
        var index = e.target.dataset['index'];
        var type = e.target.dataset['type'];
        // 实现最近与收藏的同步播放
        if (type == "near") {//判断要播放的是否来自最近歌单
            this.setData({
                near_playId: ((index).toString()),
            });
            wx.createAudioContext(this.data.near_playId).play();
            // 遍历收藏歌单看是否有跟播放的歌一样的信息
            this.data.collects.forEach(function (item, index) {
                if (_this.data.near[parseInt(_this.data.near_playId)].song == item.song) {
                    _this.setData({
                        collect_playId: ((index).toString()),
                    });
                    wx.createAudioContext(_this.data.collect_playId).play();
                };
            });

        };
        if (type == "collect") {
            this.setData({
                collect_playId: ((index).toString()),
            });
            wx.createAudioContext(this.data.collect_playId).play();
            this.data.near.forEach(function (item, index) {
                if (_this.data.collects[_this.data.collect_playId].song == item.song) {
                    _this.setData({
                        near_playId: ((index).toString()),
                    });
                }
                wx.createAudioContext(_this.data.near_playId).play();
            })
        }
        
    },
    //暂停播放
    pause() {
        var _this = this;
        wx.createAudioContext(this.data.near_playId).pause();
        wx.createAudioContext(this.data.collect_playId).pause();
        this.setData({
            near_playId: "null",
            collect_playId: "null",
        });
    },
    // 播放结束初始化歌曲状态
    ended() {
        this.setData({
            near_playId: "null",
            collect_playId: "null",
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var _this = this;
        // 获取全局变量数据
        var app = getApp();
        // 将全局变量收藏与最近的歌曲导入
        this.setData({
            collects: app.globalData.collect,
            near: app.globalData.near,
        })
        wx.login({
            success(res) {
                if (res.code) {
                    // 获取用户信息
                    wx.getUserInfo({
                        success: function ({ userInfo }) {
                            _this.setData({ userInfo })
                        }
                    })

                } else {
                    console.log("登陆失败");
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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