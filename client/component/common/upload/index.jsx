import React, {Component} from 'react'
import {Upload, Button, Icon, message} from 'antd';
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import uniqBy from "lodash/uniqBy";

class UploadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            qiniu: {
                token: ""
            },
            file_key: '',
            files: [],
            upReceiverFun: null
        }
    }

    componentDidMount() {
        let list = [];
        if (!!this.props.fileList) {
            this.props.fileList.copyWithin(list);
        }
        if (!!list) {
            this.setState({files: list});
        }
    }

    onChange(info) {
        const { queryFilePrefix } = this.props.uploadProps
        let fileList = cloneDeep(info.fileList);
        let upload_status = "begin";
        fileList = uniqBy(fileList, "name"); //去除重复的文件
        console.log('onchange', info)

        //图片上传错误
        if (fileList.some((item, index) => item.status === "error")) {
            message.error("上传未成功，请重试", 5)
            this.setState({files: []})
        }

        //图片上传中
        if (fileList.some((item, index) => item.status === "uploading")) {
            console.log("文件正在上传，上传文件:", info.fileList)
            this.setState({files: fileList})
            if(upload_status === 'begin'){

            }
        }

        //图片全部上传完成
        if (fileList.every((item, index) => item.status === "done")) {
            let _this = this;
            //是否超出上传数量
            if(!!_this.props.limit && fileList.length > _this.props.limit){
                message.info(`只能保留最后上传的 ${_this.props.limit} 个文件，其他超出的已经被顶掉。`, 5);
                fileList = fileList.slice(fileList.length - _this.props.limit);
            }
            let url = "";
            if (this.props.fileType === "image") {
                url = queryFilePrefix.img;
            } else if (this.props.fileType === "video") {
                url = queryFilePrefix.video;
            } else if (this.props.fileType === "audio") {
                url = queryFilePrefix.audio;
            }
            console.log("请求文件前缀", url)
            //读取远程路径并显示链接
            fileList.forEach((file) => {
                file.url = url + "/" + file.originFileObj.keys;
            });
            console.log('加入url参数',fileList)
            _this.setState({files: fileList})
            _this.forceUpdate();
            console.log("准备上传给父组件", _this.state.files)
            _this.props.cbReceiver(_this.state.files);
            message.destroy();
        }
    }

    componentWillReceiveProps(nextProps, prevProps) {
        // console.log("打印参数props", nextProps, this.state.files);
        if (isEqual(nextProps.fileList, this.state.files)) {
            return false;
        }
        // console.log("我是变化", nextProps);
        if(nextProps.isOpenModel === false){
            this.setState({
                files:[]
            })
        }
    }

    render() {

        const uploadProps = this.props.uploadProps
        uploadProps.showUploadList = false

        return (
            <Upload {...uploadProps} fileList={this.state.files} onChange={this.onChange.bind(this)}>
                {this.props.children}
            </Upload>
        )
    }
}


module.exports = UploadFile;
