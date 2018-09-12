import React from 'react';
import { RichUtils, EditorState, Modifier } from 'draft-js';
import { Button } from 'antd';
import styleSpan from './StyleSpan.css';
import colors from './colors';
import 'immutable';

let colorArr = [];
Object.keys(colors).map((color, i) => {
    colorArr.push({label: color, style: colors[color].color})
});

export default class ColorsButton extends React.Component {
    constructor(props) {
        super(props);
        this.toggleStyle = this.toggleStyle.bind(this);
    }

    toggleStyle(style) {
        event.preventDefault();
        const editorState = this.props.getEditorState();
        const selection = editorState.getSelection();
        const nextContentState = Object.keys(colors)
            .reduce((contentState, color) => {
                return Modifier.removeInlineStyle(contentState, selection, color)
            }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            'change-inline-style'
        );

        const currentStyle = editorState.getCurrentInlineStyle();
        if (!currentStyle.has(style)) {
            nextEditorState = RichUtils.toggleInlineStyle(
                nextEditorState,
                style
            );
        };
        this.props.setEditorState(nextEditorState);

    }

    preventBubblingUp = (event) => { event.preventDefault(); }
    render() {
        let currentStyle = this.props.getEditorState().getCurrentInlineStyle();
        let Buttons = colorArr.map((color, i) => {
            let className = currentStyle.has(color.label) ? 'primary' : 'gost';
            return (
                <div key={`color-${color.label}`} className={styleSpan.button} onMouseDown={this.preventBubblingUp}>
                    <Button
                        type={className}
                        onClick={() => {this.toggleStyle(color.label)}}
                        style={{width:'36px', height:'36px', padding:'0'}}
                    >
                        <i style={{backgroundColor: color.style, display:'inline-block', height:'16px',marginTop:'4px',width:'16px',borderRadius:'3px'}} />
                    </Button>
                </div>
            )
        })

        return <div>{ Buttons }</div>
    }
}
