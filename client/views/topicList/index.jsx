import React, { Component } from 'react';

import Editor, { createEditorStateWithText } from '../component/draft-js-plugins-editor/src';

import createInlineToolbarPlugin, { Separator } from '../component/draft-js-inline-toolbar-plugin/src';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
} from '../component/draft-js-buttons/src';
import editorStyles from './editorStyles.css';

const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
        Separator,
    ]
});
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];
const text = 'In this editor a toolbar shows up once you select part of the text …';

export default class CustomInlineToolbarEditor extends Component {

    state = {
        editorState: createEditorStateWithText(text),
    };

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    focus = () => {
        this.editor.focus();
    };

    render() {
        return (
            <div className={editorStyles.editor} onClick={this.focus}>
                <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    plugins={plugins}
                    ref={(element) => { this.editor = element; }}
                />
                <InlineToolbar />
            </div>
        );
    }
}