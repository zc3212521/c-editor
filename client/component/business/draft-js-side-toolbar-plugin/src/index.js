import React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import createStore from './utils/createStore';
import Toolbar from './components/Toolbar';
import DefaultBlockTypeSelect from './components/DefaultBlockTypeSelect';
import InsertMedia from './components/InsertMedia';
import buttonStyles from './buttonStyles.css';
import blockTypeSelectStyles from './blockTypeSelectStyles.css';
import toolbarStyles from './toolbarStyles.css';

const Separate = () => (<span>&nbsp;&nbsp;&nbsp;</span>);

export default (config = {}) => {
  const defaultTheme = { buttonStyles, blockTypeSelectStyles, toolbarStyles };


  const store = createStore({
    isVisible: false,
  });

  const {
    theme = defaultTheme,
    structure = [
      DefaultBlockTypeSelect,
        Separate,
        InsertMedia
    ]
  } = config;

  const toolbarProps = {
    store,
    structure,
    theme,
  };

  return {
    initialize: ({ setEditorState, getEditorState, getEditorRef, setReadOnly }) => {
      store.updateItem('getEditorState', getEditorState);
      store.updateItem('setEditorState', setEditorState);
      store.updateItem('setReadOnly', setReadOnly);
      store.updateItem('getEditorRef', getEditorRef);
    },
    // Re-Render the toolbar on every change
    onChange: (editorState) => {
      store.updateItem('editorState', editorState);
      return editorState;
    },
    SideToolbar: decorateComponentWithProps(Toolbar, toolbarProps),
  };
};
