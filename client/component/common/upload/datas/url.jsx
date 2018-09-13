
import PRO_BASE from './base.js';


const newsradar_prefix = PRO_BASE.Config.server.new_ajax + "intelligence/"; // 情报站地址前缀

module.exports = {
    VALIDATION_CODE: PRO_BASE.Config.server.ajax + "yzm.do",
    //七牛上传配置
    QINIU_PFOPING_STATUS: {
        url: "http://api.qiniu.com/status/get/prefop", //url
        method: 'GET'
    },

    QINIU_URL: "http://up.qiniu.com", //上传地址，现在暂只支持七牛上传
    QINIU_IMG_TOKEN_URL: PRO_BASE.Config.server.ajax + "getQiniuUptoken.do", //请求图片的token
    QINIU_PFOP: {
        url: PRO_BASE.Config.server.ajax + "QiniuPicPersist.do" //七牛持久保存请求地址
    },
    QINIU_VIDEO_TOKEN_URL: PRO_BASE.Config.server.ajax + "getQiniuUptoken.do", //请求媒体资源的token
    QINIU_FILE_TOKEN_URL: PRO_BASE.Config.server.ajax + "getQiniuUptoken.do?name=patch", //其他资源的token的获取
    QINIU_IMG_DOMAIN_URL: "https://image.qiluyidian.mobi", //图片文件地址的前缀
    QINIU_DOMAIN_IMG_URL: "https://image.qiluyidian.mobi", //图片文件地址的前缀
    QINIU_DOMAIN_VIDEO_URL: "https://image.qiluyidian.mobi", //视频文件地址的前缀
    QINIU_DOMAIN_FILE_URL: "https://static.qiluyidian.com/", //其他文件地址前缀


    //网宿配置 用于lz-editor
    // WANGSU_URL: "http://dzcm.up0.v1.wcsapi.com/file/upload", //上传地址
    WANGSU_URL: "http://uploadfile.ql1d.com/file/upload", //上传加速服务修改上传地址
    WANGSU_IMG_TOKEN_URL: PRO_BASE.Config.server.ajaxup + "getWangsuUptoken.do", //请求图片的token
    WANGSU_VIDEO_TOKEN_URL: PRO_BASE.Config.server.ajaxup + "getWangsuVideoUptoken.do", //请求媒体资源的token
    WANGSU_PFOP: {
        url: PRO_BASE.Config.server.ajaxup + "wangsuPicPersist.do"//网宿持久保存请求地址
    },
    WANGSU_IMG_DOMAIN_URL: "https://wscdn.ql1d.com", //图片文件地址的前缀
    WANGSU_DOMAIN_VIDEO_URL: "https://wsqlydvideo.ql1d.com", //视频文件地址的前缀
    //用于picturesEditor
    WANGSU: {
        // UP: 'http://dzcm.up0.v1.wcsapi.com/file/upload',
        UP: 'http://uploadfile.ql1d.com/file/upload', //上传加速服务修改上传地址
        TOKEN: "http://222.175.121.249:8082/qlwb/getWangsuUptoken.do",
        PFOP: {
            url: "http://222.175.121.249:8082/qlwb/wangsuPicPersist.do"//网宿持久保存请求地址
        },
        IMG_URL: 'https://wscdn.ql1d.com',
        IMG_DOMAIN_URL: "https://wscdn.ql1d.com", //图片文件地址的前缀
        DOMAIN_VIDEO_URL: "https://wsqlydvideo.ql1d.com", //视频文件地址的前缀
    }
};
