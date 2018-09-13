/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Button, Icon } from 'antd';

export default class BlockTypeSelect extends React.Component {

    state = {
        style: {
            transform: 'translate(-50%) scale(0)',
        },
        onEnter: false
    }

    onMouseEnter = () => {
        this.setState({
            style: {
                transform: 'translate(-50%) scale(1)',
                transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
            },
            onEnter: true
        });
    }

    onMouseLeave = () => {
        this.setState({
            style: {
                transform: 'translate(-50%) scale(0)',
            },
            onEnter: false
        });
    }

    onMouseDown = (clickEvent) => {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();
    }

    render() {
        const { theme, getEditorState, setEditorState, setReadOnly } = this.props;
        let spacer = "";
        if(this.state.onEnter) {
            spacer = <div className={theme.blockTypeSelectStyles.spacer} />
        }
        return (
            <div
                style={{display:'inline-block'}}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onMouseDown={this.onClick}
            >
                <Button type='gost' icon='plus'/>
                {/*<Icon type='plus' style={{color:'#333',fontSize:'16px'}}/>*/}
                { spacer }
                <div className={theme.blockTypeSelectStyles.popup} style={this.state.style}>
                    {this.props.structure.map((Component, index) => (
                        <Component
                            key={index}
                            getEditorState={getEditorState}
                            setEditorState={setEditorState}
                            setReadOnly={setReadOnly}
                            theme={theme.buttonStyles}
                            modifier={this.props.modifier}
                            uploadProps={this.props.uploadProps}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
