import { mount } from 'enzyme';
import { botGreeting, capitalize, composeMessage } from "./messageGenerator.service";
import calculator from "./calc.service";
import Message from "../components/Feed/Message/Message";
import {greetingMessage, MAYA_FALSE_EXPRESSION, MAYA_FIRST_GREETING} from "../cosnts";


describe('test services', () => {
  test('calulator return result experssion', ()=>{
    expect(calculator('1+1')).toEqual('2');
    expect(calculator('5+5*3')).toEqual('20');
  });

  test('calulator return answer not expression', ()=> {
    expect(calculator('not an expression')).toEqual(MAYA_FALSE_EXPRESSION);
  });

  test('compose meesage component', ()=> {
    const msg = composeMessage(greetingMessage);
    const wrapper = mount(msg);
    expect(wrapper.type()).toEqual(Message);
    expect(JSON.stringify(msg)).toContain(MAYA_FIRST_GREETING);
  });

  test('capitalize function', ()=> {
    expect(capitalize('tomer')).toEqual('Tomer');
    expect(capitalize('tomer')).not.toEqual('tomer');
  });

  test('botGreeting function', ()=> {
    expect(botGreeting('tomer', false)).toEqual('Nice to see you again Tomer. Let’s pick this up from where we left off');
    expect(botGreeting('tomer', true)).toEqual('Nice to meet you Tomer!');
  });
});