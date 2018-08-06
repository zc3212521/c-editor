import React, {Component} from 'react';
import {
    convertFromRaw,
    EditorState,
} from 'draft-js';
import { Link } from 'react-router-dom'

import '../../resource/iconfont/iconfont.less';

import colors from './ColorsToggle/colors';

import Editor, {composeDecorators} from 'component/business/draft-js-plugins-editor/src';

import createImagePlugin from 'component/business/draft-js-image-plugin/src';

import createFocusPlugin from 'component/business/draft-js-focus-plugin/src';

import createBlockDndPlugin from 'component/business/draft-js-drag-n-drop-plugin/src';

import createSideToolbarPlugin from 'component/business/draft-js-side-toolbar-plugin/src';

import createInlineToolbarPlugin, {Separator} from 'component/business/draft-js-inline-toolbar-plugin/src';

import createLinkPlugin from 'component/business/draft-js-anchor-plugin/src';

import ColorsButton from './ColorsToggle';

import editorStyles from './editorStyles.css';

import './editor.less';

import {stateToHTML} from 'draft-js-export-html';

import {stateFromHTML} from 'draft-js-import-html';

const focusPlugin = createFocusPlugin();

const blockDndPlugin = createBlockDndPlugin();

const decorator = composeDecorators(
    focusPlugin.decorator,
    blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({decorator});

import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
} from 'component/business/draft-js-buttons/src';

// 侧边栏组件
const sideToolbarPlugin = createSideToolbarPlugin();
const {SideToolbar} = sideToolbarPlugin;

const linkPlugin = createLinkPlugin({placeholder: '输入链接后键入Enter确认'});

// 行内组件
const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
        linkPlugin.LinkButton,
        Separator,
        ColorsButton,
    ],
    // customStyleMap: colors  //todo not work
});

const {InlineToolbar} = inlineToolbarPlugin;

const plugins = [
    blockDndPlugin,
    focusPlugin,
    imagePlugin,
    sideToolbarPlugin,
    inlineToolbarPlugin,
    linkPlugin,
];

/* eslint-disable */
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
/* eslint-enable */

let HTML = '';

// let contentState = stateFromHTML(HTML);

export default class CustomImageEditor extends Component {
    state = {
        editorState: EditorState.createWithContent(convertFromRaw(initialState)),
        toHTML: '',
    };

    onChange = (editorState) => {
        let obj = {};
        Object.keys(colors).map((item, i) => {
            obj[item] = {style: colors[item]};
        });

        let options = {
            inlineStyles: obj,
            entityStyleFn: (entity) => {
                const entityType = entity.get('type').toLowerCase();
                if (entityType === 'audio') {
                    const data = entity.getData();
                    return {
                        element: 'audio',
                        attributes: {
                            src: data.src,
                            controls: ' controls'
                        },
                        style: {
                            // Put styles here...
                        },
                    };
                }
                if (entityType === 'video') {
                    const data = entity.getData();
                    return {
                        element: 'video',
                        attributes: {
                            src: data.src,
                            controls: ' controls'
                        },
                        style: {
                            // Put styles here...
                        },
                    };
                }
            },
        };

        let contentState = editorState.getCurrentContent();

        let html = stateToHTML(contentState, options);

        this.setState({
            editorState,
            toHTML: html,
        });

    };

    focus = () => {
        this.editor.focus();
    };

    render() {
        return (
            <div style={{padding: '50px'}}>
                <Link to="/draft">123</Link>
                <div className={editorStyles.editor} onClick={this.focus}>
                    <Editor
                        customStyleMap={colors}
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => {
                            this.editor = element;
                        }}
                        placeholder="美好的一天从书写开始..."
                    />
                    <SideToolbar modifier={imagePlugin.addImage}/>
                    <InlineToolbar/>
                </div>
                <div>{this.state.toHTML}</div>
            </div>
        );
    }
}