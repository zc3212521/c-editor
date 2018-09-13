/* eslint-disable react/no-children-prop */
import React, {Component} from 'react';
import {RichUtils} from 'draft-js';
import {Button, Modal, message, Icon} from 'antd';
import UploadFile from '../../../../../../component/common/upload'
import {PRO_QINIU} from '../../../../../../component/common/upload/util'
import WatermarkImgUpload from '../../../../../../component/common/watermarkImgUplod';
import cloneDeep from 'lodash/cloneDeep';

export default ({mediaType, children, title=''}) => (
    class BlockStyleButton extends Component {
        constructor(props) {
            super(props)
            this.state = {
                up: false,
                img: [],
                fileType: '',
                images: [],
                loadingRemoteImageFun: null,
                provisible: false,
                previsible: false,
                pfopImages: [],
                down: false
            }
            this.addMedia = this.addMedia.bind(this)
            this.getPictures = this.getPictures.bind(this)
            this.startUpload = this.startUpload.bind(this)
            this.handlePictureSeletorOK = this.handlePictureSeletorOK.bind(this)
            this.handlePictureSeletorCancel = this.handlePictureSeletorCancel.bind(this)
            this.groupAppend = this.groupAppend.bind(this)
            this.handleCancelUploading = this.handleCancelUploading.bind(this)
            this.realLoading = this.realLoading.bind(this)
            this.reloadUploadingPictrue = this.reloadUploadingPictrue.bind(this)
            this.failureLoading = this.failureLoading.bind(this)
            this.reloadPfopingPictrue = this.reloadPfopingPictrue.bind(this)
            this.successLoading = this.successLoading.bind(this)
            this.reback = this.reback.bind(this)
        }

        addMedia = (e) => {
            this.setState({
                up: true,
                fileType: mediaType
            })
            this.props.setReadOnly(true)

        }

        preventBubblingUp = (event) => {
            event.preventDefault();
        }

        getPictures(pictureList) {
            console.log('getPictures', pictureList)
            message.destroy();
            let picList = pictureList.map(item => {
                if (typeof(item.url) !== 'undefined') {
                    return item.url
                }
            });

            this.setState({
                img: picList,
                up: false
            })
            if(mediaType === 'watermarkImage') {
                console.log('mediaType', mediaType);
                mediaType = 'image';
            }
            picList.map((item, i) => {
                setTimeout(() => {
                    let editorState = this.props.modifier(mediaType, this.props.getEditorState(), item, {name: 'haha'})
                    this.props.setEditorState(editorState)
                }, i*100)
            })
            this.props.setReadOnly(false)
        }

        startUpload(file) {
            message.loading("上传中...", 0)
        }

        handlePictureSeletorOK() {
            this.setState({
                up: false
            })
        }

        handlePictureSeletorCancel() {
            this.setState({
                up: false
            })
        }

        groupAppend(pictureList) {
            let len = pictureList.length
            if (!len) return false;

            let images = pictureList.map(item => {
                return {"url": item};
            })
            let pfopImages = new Array(len);
            pfopImages.fill(0);

            this.setState({
                images,
                pfopImages
            });
            this.prepareToSendImageToEditor()
        }

        prepareToSendImageToEditor() {
            if (!!this.state.images.length) {
                this.state.loadingRemoteImageFun = message.loading('图片正在处理并生成预览，请稍等片刻...', 0);
            }
        }

        handleCancelUploading(e) {
            this.setState({provisible: false, previsible: false, pfopImages: []});
        }

        realLoading(type) {
            let images = cloneDeep(this.state.pfopImages);
            console.log("images", images);
            // console.log("realLoading provisible false");
            this.setState({provisible: false, images: [], pfopImages: [], previsible: false});
            this.getPictures(images);
        }

        reloadUploadingPictrue(picture, index) {
            // console.log("reloadUploadingPictrue picture, index", picture, index);
            let thePicture = picture.substr(0, ~picture.lastIndexOf("?t=")
                ? picture.lastIndexOf("?t=")
                : picture.length);
            let n = picture.substr((~picture.lastIndexOf("?t=")
                ? picture.lastIndexOf("?t=")
                : 1));
            let newPicture = thePicture + "?t=" + (parseInt(n) + 1);
            if (!!this.state.pfopImages[index]) {
                this.state.pfopImages[index].url = newPicture;
            }
            this.forceUpdate();
        }

        failureLoading(event, index) {
            let picture = this.state.images[index].url;
            if (!!picture && picture != "reset") {
                setTimeout(() => {
                    //无效时每100毫秒刷新一次
                    this.reloadPfopingPictrue(picture, index);
                }, 200)
            }
        }

        reloadPfopingPictrue(picture, index) {
            let thePicture = picture.substr(0, ~picture.lastIndexOf("?t=")
                ? picture.lastIndexOf("?t=")
                : picture.length);
            let n = picture.substr((~picture.lastIndexOf("?t=")
                ? picture.lastIndexOf("?t=")
                : picture.length) + 3)
            if (n >= 200) {
                message.error("图片处理超时，请重试！")
                this.setState({
                    previsible: false
                })
                setTimeout(this.state.loadingRemoteImageFun, 500);
                return false
            }
            picture = thePicture + "?t=" + (parseInt(!!n
                ? n
                : "0") + 1);
            this.state.images[index].url = picture;
            this.forceUpdate();
        }

        successLoading(index) {
            let pfopArr = cloneDeep(this.state.pfopImages);
            pfopArr[index] = 1;
            this.setState({
                pfopImages: pfopArr
            }, () => {
                if(this.state.images.length && !this.state.pfopImages.some(item => item === 0)) { //全部加载成功
                    this.getPictures(this.state.images)
                    this.setState({
                        down: true
                    })
                }
            })

            setTimeout(this.state.loadingRemoteImageFun, 500);

        }

        reback() {
            this.setState({
                down: false
            })
        }


        render() {
            const {theme} = this.props;
            console.log(5566, this.props)
            const uploadConfig = PRO_QINIU.getUploadConfig("wangsu");
            const className = 'gost';
            if (mediaType === 'watermarkImage') {
                let className = 'RichEditor-styleButton';
                let that = this;
                return (
                    <div style={{display: 'inline-block'}}>
                        <div
                            className={theme.buttonWrapper}
                            onMouseDown={this.preventBubblingUp}
                        >
                            <WatermarkImgUpload
                                limitCount={50}
                                imageList={this.state.images.map((item) => {
                                    item.url
                                })}
                                atuoSize={[650, 0]}
                                receiveSelectedPictures={this.groupAppend}
                                uploadConfig={uploadConfig}
                                down={this.state.down}
                                reback={this.reback}
                            >
                                <Button
                                    type={className}
                                    children={children}
                                    style={{width: '36px', height: '36px', padding: 0}}
                                    title={title}
                                />
                            </WatermarkImgUpload>
                        </div>

                        <div
                            style={{
                                width: 0,
                                height: 0,
                                display: "inline",
                                overflow: "hidden",
                                position: "absolute"
                            }}
                        >
                            {this.state.images.map((item, index) => <img
                                key={index}
                                style={{width: "100px"}} src={item.url}
                                onError={(event) => this.failureLoading(event, index)}
                                onLoad={() => this.successLoading(index)}/>)}

                        </div>
                    </div>
                )
            }
            return (
                <div style={{display: 'inline-block'}}>
                    <div
                        className={theme.buttonWrapper}
                        onMouseDown={this.preventBubblingUp}
                    >
                        <UploadFile
                            id="pictures"
                            cbReceiver={this.getPictures}
                            isMultiple={true}
                            isShowUploadList={false}
                            fileType={this.state.fileType}
                            startUpload={this.startUpload}
                            limit={20}>
                            <Button
                                type={className}
                                onClick={this.addMedia}
                                children={children}
                                style={{width: '36px', height: '36px', padding: 0}}
                                title={title}
                            />
                        </UploadFile>

                    </div>
                </div>
            );
        }
    }
);
