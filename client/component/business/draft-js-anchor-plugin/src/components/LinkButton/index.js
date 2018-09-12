import React, { Component } from 'react';
import PropTypes from 'prop-types';
import unionClassNames from 'union-class-names';
import EditorUtils from '../../utils/EditorUtils';
import AddLinkForm from './AddLinkForm';
import { Button } from 'antd';

export default class LinkButton extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    store: PropTypes.object.isRequired,
    ownTheme: PropTypes.object.isRequired,
    onRemoveLinkAtSelection: PropTypes.func.isRequired,
  };

  onMouseDown = (event) => {
    event.preventDefault();
  }

  onAddLinkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { ownTheme, placeholder, onOverrideContent } = this.props;
    const content = (props) =>
      <AddLinkForm {...props} placeholder={placeholder} theme={ownTheme} />;
    onOverrideContent(content);
  }

  render() {
    const { theme, onRemoveLinkAtSelection } = this.props;
    const hasLinkSelected = EditorUtils.hasEntity(
      this.props.store.getEditorState(),
      'LINK'
    );
    const className = hasLinkSelected
      ?  'primary' : 'gost';

    return (
      <div
        className={theme.buttonWrapper}
        onMouseDown={this.onMouseDown}
      >
        <Button
            title="添加链接"
          type={className}
          onClick={hasLinkSelected ? onRemoveLinkAtSelection : this.onAddLinkClick}
          style={{width:'36px', height:'36px', fontSize:'0', padding:'0'}}
        >
            <i className='iconfont icon-link' />
        </Button>
      </div>
    );
  }
}
