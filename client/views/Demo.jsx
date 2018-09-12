import React, { Component } from 'react'
// import Zeditor from './editor'
import Zeditor from '../../out/index'

export default class Demo extends Component {
    constructor(props) {
        super(props)
        this.toHtml = this.toHtml.bind(this)
    }

    toHtml(html) {
        console.log('html:', html)
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
                "1": {
                    "type": "image",
                    "mutability": "IMMUTABLE",
                    "data": {
                        "src": "https://wscdn.ql1d.com/63176873725799917118.jpg"
                    }
                }
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
                    "text": "图片可拖动进行位置变换",
                    "type": "unstyled",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [],
                    "data": {}
                }, {
                    "key": "ovkl",
                    "text": " ",
                    "type": "atomic",
                    "depth": 0,
                    "inlineStyleRanges": [],
                    "entityRanges": [{
                        "offset": 0,
                        "length": 1,
                        "key": 1
                    }],
                    "data": {}
                },]
        };
        return <Zeditor placeholder="hahaha..." initialState={initialState} toHtml={this.toHtml}/>
    }
}