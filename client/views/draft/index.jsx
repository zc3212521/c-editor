import React, { Component } from 'react';
import {
    convertFromRaw,
    convertToRaw,
    CompositeDecorator,
    Editor,
    EditorState,
    AtomicBlockUtils,
} from 'draft-js';

import ImgDec from 'component/decorators/img'

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
                        blockRendererFn={mediaBlockRenderer}
                        editorState={this.state.editorState}
                        onChange={this.onChange}
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

function mediaBlockRenderer(block) {
    console.log(888, block.getType(), block.getEntityAt(0))
    if (block.getType() === 'atomic') {
        return {
            component: Media,
            editable: false,
        };
    }

    return null;
}

const Audio = (props) => {
    return <audio controls src={props.src} style={styles.media} />;
};

const Video = (props) => {
    return <video controls src={props.src} style={styles.media} />;
};

const Media = (props) => {
    // console.log(111, props)
    const entity = props.contentState.getEntity(
        props.block.getEntityAt(0)
    );
    const {src} = entity.getData();
    const {size} = entity.getData();
    const type = entity.getType();

    // console.log(222, size)
    let media;
    if (type === 'audio') {
        media = <Audio src={src} />;
    } else if (type === 'image-custom') {
        media = <ImgDec src={src} />
    } else if (type === 'video') {
        media = <Video src={src} />;
    }

    return media;
};
