import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import 'whatwg-fetch'

import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import uniqBy from "lodash/uniqBy";

import Zeditor from './views/editor'

// import Zeditor from '../bundle/index'

import {Upload, Button, Icon, message} from 'antd';
import {PRO_URL} from "component/common/upload/util";

const RndNum = function(n) {
    var rnd = "";
    for(var i = 0; i < n; i++)
        rnd += Math.floor(Math.random() * 10);
    return rnd;
}

const GetFileExtensionName = function(filename) {
    return(/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined
}

const tokenUrl = {
    default: "http://222.175.121.249:8082/qlwb/getWangsuUptoken.do",
    img: "http://222.175.121.249:8082/qlwb/getWangsuUptoken.do",
    video:  "http://222.175.121.249:8082/qlwb/getWangsuVideoUptoken.do"
}

const tokenID = "4549E191B1E5C634FD120B615D9BC917"


const supportMime = {
    image: [
        "image/jpeg", "image/png", "image/jpg", "image/gif"
    ],
    video: ["video/mp4"],
    audio: ["audio/mp4", "audio/mp3", "audio/mpeg"],
}

function inArray(arr, value) {
    for (let i = 0; i < arr.length; i++)
        if (arr[i] === value) {
            return true;
        }
    return false;
}

const fetchData = (url, data = {}, doProcess, onCatch = (e) => {console.warn("服务器或接口返回出错或数据处理过程中出错，参考：", e)}) => {
    let tokenName = 'tokenID';

    data = Object.assign({}, { [tokenName]: tokenID }, data);

    fetch(url + "?" + tokenName + "=" + tokenID, {
        method: "POST",
        body: JSON.stringify(data)
    }).then((res) => {
        if(res.ok){
            return res.json();
        }  else {
            message.error("something wrong!", 10);
        }

    }).then((theData) => {
        console.log("fetchData theData", theData);
        doProcess(theData);
    }).catch((e) => {
        onCatch(e);
    })
}


class Demo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoad: false,
            upToken: "",
            file_key: '',
            files: [],
            upReceiverFun: null,
            html: '',
            upFileType: 'image',
            limit: 20,
        }

        this.toHtml = this.toHtml.bind(this)
        this.beforeUpload = this.beforeUpload.bind(this)
        this.returnToken = this.returnToken.bind(this)
        this.receiveUpFileType = this.receiveUpFileType.bind(this)
    }

    toHtml(html) {
        this.setState({
            html
        })
    }

    receiveUpFileType(type) {
        this.setState({
            upFileType: type
        })
    }

    beforeUpload(file) {
        this.setState({
            files: []
        }, () => {
            console.log(222, this.state.upFileType)
            let isFormat = inArray(supportMime[this.state.upFileType], file.type);
            if (!isFormat) {
                message.error('只能上传指定文件，请重新选择！参考 File Mimetype: ' + supportMime[this.state.upFileType].join("、"), 10);
                return false;
            }
            if (!this.state.upToken) {
                let token = "";
                if (this.state.upFileType === 'image') {
                    token = this.returnToken();
                }
                if (this.state.upFileType === "video" || this.state.upFileType === "audio") {
                    token = this.returnToken("video");
                }
                console.log("拿到请求" + this.state.upFileType + '的token', token);
                // this.state.upToken = token;
                this.setState({
                    upToken: token
                })
            }
            file.keys =RndNum(20) + "." + GetFileExtensionName(file.name)[0];

            return isFormat;
        })
        message.info('上传中。。。')
    }

    // onChange(info) {
    //     let fileList = cloneDeep(info.fileList);
    //     let upload_status = "begin";
    //     fileList = uniqBy(fileList, "name"); //去除重复的文件
    //     console.log('onchange', info)
    //
    //     //图片上传错误
    //     if (fileList.some((item, index) => item.status === "error")) {
    //         message.error("上传未成功，请重试", 5)
    //         this.setState({files: []})
    //     }
    //
    //     //图片上传中
    //     if (fileList.some((item, index) => item.status === "uploading")) {
    //         console.log("文件正在上传，上传文件:", info.fileList)
    //         this.setState({files: fileList})
    //         if (upload_status === 'begin') {
    //             upload_status = "";
    //         }
    //     }
    //
    //     //图片全部上传完成
    //     if (fileList.every((item, index) => item.status === "done")) {
    //         let _this = this;
    //         //是否超出上传数量
    //         if (!!_this.state.limit && fileList.length > _this.state.limit) {
    //             message.info(`只能保留最后上传的 ${_this.state.limit} 个文件，其他超出的已经被顶掉。`, 5);
    //             fileList = fileList.slice(fileList.length - _this.state.limit);
    //         }
    //         let url = "";
    //         if (this.state.fileType === "image") {
    //             url = PRO_URL.WANGSU_IMG_DOMAIN_URL;
    //         } else if (this.state.fileType === "video" || this.state.fileType === "audio") {
    //             url = PRO_URL.WANGSU_DOMAIN_VIDEO_URL;
    //         }
    //         console.log("请求文件前缀", url)
    //         //读取远程路径并显示链接
    //         fileList.forEach((file) => {
    //             file.url = url + "/" + file.originFileObj.keys;
    //         });
    //         console.log('加入url参数', fileList)
    //         _this.setState({files: fileList})
    //         _this.forceUpdate();
    //         console.log("准备上传给父组件", _this.state.files)
    //         _this.props.cbReceiver(_this.state.files);
    //         message.destroy();
    //     }
    // }

    returnToken (key = 'image',params={}) {
        let token = this.checkQiniuImgToken(key);
        token = !!token === true
            ? token
            : this.getQiniuToken(key,params);
        return token;
    }

    checkQiniuImgToken(key) {
        let timestamp = Date.parse(new Date()) / 1000;
        let last_qiniu_token_time = localStorage.getItem("last_qiniu_token_time_" + key);
        let mark = false;

        if (last_qiniu_token_time) {
            if ((timestamp - last_qiniu_token_time) < 3500) {
                mark = true;
            }
        }
        let qiniu_token = "";
        if (localStorage.getItem("qiniu_" + key + "_token") && mark) {
            qiniu_token = localStorage.getItem("qiniu_" + key + "_token");
        }
        return qiniu_token;
    }

    getQiniuToken(type = 'image',params) {
        let token = "";
        let url=  tokenUrl.default;
        if (type === 'image') {
            url = tokenUrl.img;
        } else {
            url = tokenUrl.video;
        }

        fetchData(url, params, (data) => {
            token = data.uptoken;
            localStorage.setItem("qiniu_" + type + "_token", token);
            localStorage.setItem("last_qiniu_token_time_" + type, Date.parse(new Date()) / 1000);
        }, () => {
            return false;
        });
        return token;
    }

    render() {
        const initialState = {
            "entityMap": {
                "0": {
                    "type": "image",
                    "mutability": "IMMUTABLE",
                    "data": {
                        "src": "https://wscdn.ql1d.com/31999134935610288861.jpg"
                    }
                },
            },
            "blocks": [
                {
                    "key": "9gm3s",
                    "text": "你可以上下移动光标，查看左侧菜单可以跟随光标位置",
                    "type": "unstyled",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [],
                    "data": {}
                }, {
                    "key": "9gm88",
                    "text": "你可以选中文字，将展示行内编辑菜单栏",
                    "type": "unstyled",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [],
                    "data": {}
                },{
                    "key": "ov7r",
                    "text": " ",
                    "type": "atomic",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [{
                        "offset": 0,
                        "length": 1,
                        "key": 0
                    }],
                    "data": {}
                }, {
                    "key": "e23a8",
                    "text": "将鼠标移到图片上，可进行调整大小和移除操作",
                    "type": "unstyled",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [],
                    "data": {}
                },]
        };

        const uploadProps = {
            action: 'http://uploadfile.ql1d.com/file/upload',
            data: (file) => {//支持自定义保存文件名、扩展名支持
                let token = this.state.upToken, key = "";
                if (!token) {
                    token = this.returnToken();
                }
                key = file.keys;
                return {token, key}
            },
            multiple: true,
            beforeUpload: this.beforeUpload,
            queryFilePrefix: {
                img: 'https://wscdn.ql1d.com',
                video: 'https://wsqlydvideo.ql1d.com',
                audio: 'https://wsqlydvideo.ql1d.com',
            }
        }


        return (
            <div>
                <Zeditor
                    placeholder="告诉我你的故事..."
                    initialState={initialState}
                    toHtml={this.toHtml}
                    uploadProps={uploadProps} // 上传配置
                    receiveUpFileType={this.receiveUpFileType} //点击上传图片，音频，视频的回调，返回点击按钮的类型
                />
                <p>{this.state.html}</p>
            </div>
        )
    }
}

ReactDOM.render(
    <Demo />,
    document.getElementById('root')
);