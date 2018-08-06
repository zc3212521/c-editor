/**
 * Creates a composite decorator based on the provided plugins
 */

import { List } from 'immutable';
import { CompositeDecorator } from 'draft-js';
import decorateComponentWithProps from 'decorate-component-with-props';

export default (decorators, getEditorState, setEditorState) => {
  const convertedDecorators = List(decorators)
    .map((decorator) => ({
      ...decorator,
      component: decorateComponentWithProps(decorator.component, { getEditorState, setEditorState }), // 将第二个参数作为props转入第一个参数表示的组件中
    }))
    .toJS();

  return new CompositeDecorator(convertedDecorators);
};
