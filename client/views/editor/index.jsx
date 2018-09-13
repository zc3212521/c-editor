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
        // Separator,
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


let HTML = '';

// let contentState = stateFromHTML(HTML);

 class Zeditor extends Component {
    constructor(props) {
        super(props)

        let init_editorState = props.initialState ? EditorState.createWithContent(convertFromRaw(props.initialState)) : EditorState.createEmpty()

        this.state = {
            editorState: init_editorState,
            toHTML: '',
        };

    }


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
                    console.log(7788, entity.getData())
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

        this.props.toHtml(html);

    };

    focus = () => {
        this.editor.focus();
    };

    render() {
        return (
            <div style={{padding: '50px'}}>
                <div className={editorStyles.editor} onClick={this.focus}>
                    <Editor
                        customStyleMap={colors}
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => {
                            this.editor = element;
                        }}
                        placeholder={this.props.placeholder}
                    />
                    <SideToolbar modifier={imagePlugin.addImage}/>
                    <InlineToolbar/>
                </div>
            </div>
        );
    }
}

module.exports = Zeditor