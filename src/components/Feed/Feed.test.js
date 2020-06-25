import React from 'react';
import renderer from 'react-test-renderer';
import Feed from './Feed';
import Message from "./Message/Message";
import {greetingMessage, askExpressionMessage} from '../../cosnts';


describe('Feed testing', () => {
  test('render Feed', () => {
    const component = renderer.create(<Feed messages={[]} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Feed has 2 messages', () => {
    const messages = [greetingMessage, askExpressionMessage];
    const component = renderer.create(<Feed messages={messages} />);
    const root = component.root;
    expect(root.findAllByType(Message).length).toEqual(2);
  });
});