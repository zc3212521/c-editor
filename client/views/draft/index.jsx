import React, { Component } from 'react';
import {
    convertFromRaw,
    convertToRaw,
    CompositeDecorator,
    Editor,
    EditorState,
    AtomicBlockUtils,
    RichUtils
} from 'draft-js';

import Media from "../../component/decorators/media/Media"

import {removeImgBlock} from "./util/removeImgBlock"

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
                "src": "https://wscdn.ql1d.com/63176873725799917118.jpg",
                "size" : "big"
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

const styles = {
    root: {
        fontFamily: '\'Helvetica\', sans-serif',
        padding: 20,
        width: 600,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    immutable: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '2px 0',
    },
    mutable: {
        backgroundColor: 'rgba(204, 204, 255, 1.0)',
        padding: '2px 0',
    },
    segmented: {
        backgroundColor: 'rgba(248, 222, 126, 1.0)',
        padding: '2px 0',
    },
    media: {
        maxWidth: '100%',
        // Fix an issue with Firefox rendering video controls
        // with 'pre-wrap' white-space
        whiteSpace: 'initial'
    },
    mediaWrap: {
        maxWidth: '80%',
    }
};

export default class CustomImageEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // editorState: EditorState.createWithContent(convertFromRaw(initialState)),
            editorState: EditorState.createEmpty(),
        }

        // const decorator = new CompositeDecorator([
        //     {
        //         strategy: getEntityStrategy('IMMUTABLE'),
        //         component: TokenSpan,
        //     },
        //     {
        //         strategy: getEntityStrategy('MUTABLE'),
        //         component: TokenSpan,
        //     },
        //     {
        //         strategy: getEntityStrategy('SEGMENTED'),
        //         component: TokenSpan,
        //     },
        // ]);

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
            this.setState({editorState})
            const content = this.state.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };
        this.logState = () => {
            const content = this.state.editorState.getCurrentContent();
            console.log(convertToRaw(content));
        };

        this.blockRenderer = (block) => {
            if (block.getType() === 'atomic') {
                return {
                    component: Media,
                    editable: false,
                    props: {
                        onChangeSize: (blockKey, imgWidth) => {
                            console.log(110, blockKey, imgWidth)
                            // var {liveTeXEdits} = this.state;
                            // this.setState({
                            //     liveTeXEdits: liveTeXEdits.remove(blockKey),
                            //     editorState:EditorState.createWithContent(newContentState),
                            // });
                        },
                        onRemove: (blockKey, newContentState) => this.removeImg(blockKey, newContentState),
                    },
                };
            }

            return null;
        }

        this.removeImg = (blockKey) => {
            var {editorState} = this.state;
            this.setState({
                editorState: removeImgBlock(editorState, blockKey),
            });
        };

        this._handleKeyCommand = (command, editorState) => {
            var newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState) {
                this.onChange(newState);
                return true;
            }
        }
    }

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    focus = () => {
        this.editor.focus();
    };

    addImg = (e) => {
        e.preventDefault();
        const {editorState} = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'IMG',
            'IMMUTABLE',
            {src: "https://wscdn.ql1d.com/31999134935610288861.jpg"}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            {currentContent: contentStateWithEntity}
        );

        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(
                newEditorState,
                entityKey,
                ' '
            )
        }, () => {
            setTimeout(() => this.focus(), 0);
        });
    }

    render() {
        return (
            <div style={styles.root}>
                <div style={styles.editor} onClick={this.focus}>
                    <Editor
                        blockRendererFn={this.blockRenderer}
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this._handleKeyCommand}
                        placeholder="Enter some text..."
                        ref="editor"
                    />
                </div>
                <input
                    onClick={this.logState}
                    style={styles.button}
                    type="button"
                    value="Log State"
                />
                <input
                    onClick={this.addImg}
                    style={styles.button}
                    type="button"
                    value="add img"
                />
            </div>
        );
    }
}