/* eslint-disable react/no-children-prop */
import React, { Component } from 'react';
import { RichUtils } from 'draft-js';
import unionClassNames from 'union-class-names';
import { Button } from 'antd'

export default ({ style, children }) => (
  class InlineStyleButton extends Component {

    toggleStyle = (event) => {
      event.preventDefault();
      this.props.setEditorState(
        RichUtils.toggleInlineStyle(
          this.props.getEditorState(),
          style
        )
      );
    }

    preventBubblingUp = (event) => { event.preventDefault(); }

    // we check if this.props.getEditorstate is undefined first in case the button is rendered before the editor
    styleIsActive = () => this.props.getEditorState && this.props.getEditorState().getCurrentInlineStyle().has(style);

    render() {
      const { theme } = this.props;
      const className = this.styleIsActive() ? 'primary' : 'gost';
      return (
        <div
          className={theme.buttonWrapper}
          onMouseDown={this.preventBubblingUp}
        >
            <Button
                type={className}
                onClick={this.toggleStyle}
                children={children}
                style={{width:'36px', height:'36px', fontSize:'0', padding:'0'}}
            />
        </div>
      );
    }
  }
);
