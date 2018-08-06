
import {ajax as AJAX} from './Request';
import {QINIU_URL, QINIU_DOMAIN_IMG_URL,QINIU_IMG_TOKEN_URL,WANGSU, QINIU_PFOP,QINIU_MANAGE_TOKEN_URL, QINIU_VIDEO_TOKEN_URL, QINIU_FILE_TOKEN_URL,QINIU_IMG_DOMAIN_URL,QINIU_DOMAIN_VIDEO_URL,QINIU_DOMAIN_FILE_URL,WANGSU_URL,WANGSU_IMG_TOKEN_URL,WANGSU_PFOP,WANGSU_IMG_DOMAIN_URL,WANGSU_VIDEO_TOKEN_URL,WANGSU_DOMAIN_VIDEO_URL} from './url.jsx';


module.exports = {
  supportMime: {
    image: [
      "image/jpeg", "image/png", "image/jpg", "image/gif"
    ],
    video: ["video/mp4"],
    audio: ["audio/mp4","audio/mp3", "audio/mpeg"],
    office: ["application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  },
  img_water: {
    defaultWater: "shuiyindemo"
  },
  getUploadConfig:function(type='wangsu'){
    if(type === 'qiniu'){
        return {
            QINIU_URL,//上传地址
            QINIU_IMG_TOKEN_URL,//请求图片的token
            QINIU_PFOP,//网宿持久保存请求地址
            QINIU_VIDEO_TOKEN_URL, //请求媒体资源的token
            QINIU_FILE_TOKEN_URL, //其他资源的token的获取
            QINIU_IMG_DOMAIN_URL,//图片文件地址的前缀
            QINIU_DOMAIN_IMG_URL,//备份，兼容处理
            QINIU_DOMAIN_VIDEO_URL, //视频文件地址的前缀
            QINIU_DOMAIN_FILE_URL, //其他文件地址前缀
        };
    };
    if(type === 'wangsu'){
      return {
          WANGSU_URL, //上传地址，
          WANGSU_IMG_TOKEN_URL, //请求图片的token
          WANGSU_PFOP,
          WANGSU_IMG_DOMAIN_URL, //图片文件地址的前缀
          WANGSU_VIDEO_TOKEN_URL,
          WANGSU_DOMAIN_VIDEO_URL
      }
    }

  },
  makeGuid: function() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
        guid += "-";
      }
    return guid;
  },

  nowTime: function() {
    let time = Date.parse(new Date()) / 1000;
    return time;
  },

  checkQiniu: {

    checkQiniuImgToken: function(key) {

      let timestamp = Date.parse(new Date()) / 1000;
      let last_qiniu_token_time = localStorage.getItem("last_qiniu_token_time_" + key);
      let mark = false;

      if (last_qiniu_token_time) {
        if ((timestamp - last_qiniu_token_time) < 3500) {
          //console.log("time not out ");
          mark = true;
        }
      }
      let qiniu_token = "";
      if (localStorage.getItem("qiniu_" + key + "_token") && mark) {
        qiniu_token = localStorage.getItem("qiniu_" + key + "_token");
      }
      return qiniu_token;

    },
    returnToken: function(key = 'image',params={}) {
      let token = this.checkQiniuImgToken(key);
      token = !!token === true
        ? token
        : this.getQiniuToken(key,params);
      return token;
    },
      //此处已取消所有七牛token请求
    getQiniuToken: function(type = 'image',params) {
      console.log("getQiniuToken",type);
      let token = "";
      // let url= QINIU_IMG_TOKEN_URL;
      let url=  WANGSU.TOKEN;
      if (type == 'image') {
        url = WANGSU_IMG_TOKEN_URL;
      } else {
        url = WANGSU_VIDEO_TOKEN_URL;
      }
      // else if (type == 'file') {
      //   url = WANGSU_FILE_TOKEN_URL;
      // }
      // else if (type == 'manage') {
      //   url = "QINIU_MANAGE_TOKEN_URL";
      // }

      AJAX.requestData({
        url: url,
        method: 'post',
        isAsync: false,
        defaultData: {}
      }, params, (data) => {
        //console.log(data); data = JSON.parse(data);
        token = data.uptoken;
        //console.log("token=", token);
        localStorage.setItem("qiniu_" + type + "_token", token);
        localStorage.setItem("last_qiniu_token_time_" + type, Date.parse(new Date()) / 1000);
      }, () => {
        //console.log("err:", err);
        return false;
      });
      return token;
    }
  }
}
