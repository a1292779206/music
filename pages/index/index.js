Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图图片路径
    swiper_picture:[
                "../../image/goods01.jpg",
                "../../image/goods02.jpg",
                "../../image/goods03.jpg",
                "../../image/goods04.jpg"
            ],
    soar:[], // 储存巅峰歌曲
    peak: [],  // 储存飙升歌曲
    hot: [],  // 储存热门歌曲
    soar_scroll:[] // 滑动
},
    // getRankingList(){
    //     wx.reLaunch({
    //         url: '/pages/rankingList/rankingList?str=0'
    //     })
    // },
    soar_more(){
        wx.reLaunch({
            url: '/pages/rankingList/rankingList?str=0'
        })
    },
    soar_peak(){
        wx.reLaunch({
            url: '/pages/rankingList/rankingList?str=1'
        })
    },
    soar_hot(){
        wx.reLaunch({
            url: '/pages/rankingList/rankingList?str=2'
        })
    },
    getSinger(){
        wx.reLaunch({
            url: '/pages/singer/singer'
        })
    },
    getRanking(){
        wx.reLaunch({
            url: '/pages/ranking/ranking'
        })
    },
    getRadio(){
        wx.reLaunch({
            url: '/pages/radio/radio'
        })
    },
    jump(e){
        // console.log(e);
        let index = e.currentTarget.dataset['index'];
        let str = JSON.stringify(this.data.soar_scroll[index]);
        wx.redirectTo({
            url: '/pages/music/music?jsonStr=' + str
        })
    },
    jump_peak(e){
        // console.log(e);
        let index = e.currentTarget.dataset['index'];
        let str = JSON.stringify(this.data.peak[index]);
        wx.redirectTo({
            url: '/pages/music/music?jsonStr=' + str
        })
    },
    jump_hot(e){
        // console.log(e);
        let index = e.currentTarget.dataset['index'];
        let str = JSON.stringify(this.data.hot[index]);
        wx.redirectTo({
            url: '/pages/music/music?jsonStr=' + str
        })
    },

   
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this = this;
      //   请求热门歌曲接口数据
      wx.request({
          url: 'http://127.0.0.1:3000/songPeak', //仅为示例，并非真实的接口地址
          header: {
              'content-type': 'application/json' // 默认值
          },
          success(res) {
            //   console.log(res)
              _this.setData({
                  peak: res.data.peak,
              })
          }
      });
      //   请求热门歌曲接口数据
      wx.request({
          url: 'http://127.0.0.1:3000/songSoar', //仅为示例，并非真实的接口地址
          header: {
              'content-type': 'application/json' // 默认值
          },
          success(res) {
            //   console.log(res)
              _this.setData({
                  soar: res.data.soar,
              })
          }
      });
      //   请求热门歌曲接口数据
      wx.request({
          url: 'http://127.0.0.1:3000/songHot', //仅为示例，并非真实的接口地址
          header: {
              'content-type': 'application/json' // 默认值
          },
          success(res) {
            //   console.log(res)
              _this.setData({
                  hot: res.data.hot,
              })
          }
      });
      //   请求热门歌曲接口数据
      wx.request({
          url: 'http://127.0.0.1:3000/songSoarscorll', //仅为示例，并非真实的接口地址
          header: {
              'content-type': 'application/json' // 默认值
          },
          success(res) {
            //   console.log(res)
              _this.setData({
                  soar_scroll: res.data.soar_scroll,
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
            //   console.log(res.windowWidth)
              _this.setData({
                  scrollWidth: res.windowWidth,
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