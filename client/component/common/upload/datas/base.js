/**
 * Created by Administrator on 2016/5/20.
 */
 const base = {
  Config: {
    showReduxDevTools: false,
    watermarkImage: [
      {
        type: "white_small",
        tip: "白色小图",
        value: "http://7xjl1j.com1.z0.glb.clouddn.com/white_small.png",
        valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS93aGl0ZV9zbWFsbC5wbmc="
      }, {
        type: "white_big",
        tip: "白色大图",
        value: "http://7xjl1j.com1.z0.glb.clouddn.com/white_big.png",
        valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS93aGl0ZV9iaWcucG5n"
      }, {
        type: "gray_small",
        tip: "灰色小图",
        value: "http://7xjl1j.com1.z0.glb.clouddn.com/gray_small.png",
        valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS9ncmF5X3NtYWxsLnBuZw=="
      }, {
        type: "gray_big",
        tip: "灰色大图",
        value: "http://7xjl1j.com1.z0.glb.clouddn.com/gray_big.png",
        valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS9ncmF5X2JpZy5wbmc="
      }, {
        type: "black_small",
        tip: "黑色小图",
        value: "http://7xjl1j.com1.z0.glb.clouddn.com/black_small.png",
        valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS9ibGFja19zbWFsbC5wbmc="
      }, {
        type: "black_big",
        tip: "黑色大图",
        value: "http://7xjl1j.com1.z0.glb.clouddn.com/black_big.png",
        valuebase64: "aHR0cDovLzd4amwxai5jb20xLnowLmdsYi5jbG91ZGRuLmNvbS9ibGFja19iaWcucG5n"
      }
    ]
  },
}

if (process.env.NODE_ENV === 'production') {
  base.Config.server = {
    ajax: 'http://114.55.148.57:8083/', //正式（公网）服务器
    ajaxup: 'http://114.55.148.57:8083/', //正式媒体资源上传服务器（勿删）
      new_ajax: "http://114.55.182.166:80/qlwb/" // 正式新后台地址
  }
} else {
  base.Config.server = {
    ajax: 'http://222.175.121.249:8082/qlwb/', //测试服务器
    ajaxup: 'http://120.26.3.40:8082/qlwb/', //测试媒体资源上传服务器
    new_ajax: "http://222.175.121.252:8088/qlwb/" // 测试新后台地址
  }
}

module.exports = base
