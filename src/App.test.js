import React from 'react';
import App from './App';
import waitForExpect from 'wait-for-expect';
import { mount } from 'enzyme';
import {askExpressionMessage} from "./cosnts";


describe('<App />', () => {
  beforeAll(() => {
    global.localStorage = {
      getItem: function () {
        return ''
      },
      setItem: function () {
        return ''
      }
    };
  });

  test('All messages loaded', async () => {
    const component = mount(<App />);
    await waitForExpect(() => {
      expect(component.find('.message').length).toEqual(2);
    }, 5000);
  });

  test('remove more then then two strate bot answers', async () => {
    const component = mount(<App />);
    await waitForExpect(() => {
      const instance = component.instance();
      const msgs = [askExpressionMessage,askExpressionMessage,askExpressionMessage];
      const deduped = instance.dedupBotAnswers(msgs);
      expect(deduped.length).toEqual(2);
      msgs.push({text: 'hi maya'})
      instance.dedupBotAnswers(msgs);
      expect(instance.dedupBotAnswers(msgs).length).toEqual(3);
    }, 4000);
  });
})
