# z-react-editor 富文本编辑器

> 基于 draftjs 的一款富文本编辑器

### 功能介绍

1. 侧边栏实现块元素的样式修改和文件上传的功能，上传只支持类似第三方（七牛，网宿cdn）模式。

2. 选中文字可实现行内元素的样式修改和添加链接功能

3. 上传图片可调节图片尺寸

### 安装

```
    npm i z-react-editor -S
```

### 配置

配置项 | 说明 | 类型 | 默认
------------ | ------------- | ------------ | ------------
 placeholder | placeholder | String | 无
 toHtml      | 接收转换后的HTML | Function(html:string) | 无
 uploadProps | 上传配置 | Object | 无
 receiveUpFileType | 点击上传按钮，返回点击按钮的类型 | Function(type:string) | 无

##### uploadProps 介绍

> 相关介绍可查看 antd upload 组件uploadProps配置介绍

配置项 | 说明 | 类型 | 默认
------------ | ------------- | ------------ | ------------
 action | 必选参数, 上传的地址 | String | 无
 data      | 上传所需参数或返回上传参数的方法 | object | 无
 multiple | 上传配置 | Object | 无
 beforeUpload | 上传文件之前的钩子，参数为上传的文件 | Function(file) | 无
 queryFilePrefix | 上传文件访问地址前缀 | object 参考实例 | 无

> 代码示例

```
const uploadProps = {
            action: 'http://***/file/upload',
            data: (file) => {//支持自定义保存文件名、扩展名支持
                let token = this.state.upToken,
                    key = "";
                if (!token) {
                    token = this.returnToken(); // 获取token代码
                }
                key = file.keys;
                return {token, key}
            },
            multiple: true, // 是否支持多文件上传
            beforeUpload: this.beforeUpload, // 文件开始上传之前的回调
            queryFilePrefix: { // 上传后远程文件地址前缀
                img: 'https://img-prefix',
                video: 'https://video-prefix',
                audio: 'https://audio-prefix',
            }
        }

```

```
this.beforeUpload = (files) =>  {
                                  console.log(files)
                              }
```