// pages/singer/singer.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        singer:[
            {
                img:"../../image/hcy.jpg",
                txt:"华晨宇",
                num:1
            },
            {
                img:"../../image/dyt.jpg",
                txt:"戴雨彤",
                num:2
            },
            {
                img:"../../image/gblf.jpg",
                txt:"隔壁老樊",
                num: 3
            },
            {
                img:"../../image/jjy.jpg",
                txt:"鞠婧祎",
                num: 4
            },
            {
                img:"../../image/mr.jpg",
                txt:"梦然",
                num: 5
            },
            {
                img:"../../image/yxm.jpg",
                txt:"野小马",
                num: 6
            },
            {
                img:"../../image/zj.jpg",
                txt:"张杰",
                num: 7
            },
            {
                img:"../../image/xs.jpg",
                txt:"许嵩",
                num: 8
            },
            {
                img:"../../image/xzq.jpg",
                txt:"薛之谦",
                num: 9
            }
        ]
    },
    getRanking(){
        wx.reLaunch({
            url: '/pages/ranking/ranking'
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