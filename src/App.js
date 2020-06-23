import React, { Component } from 'react';
import styled from 'styled-components';
import calculator from './sevices/calc.service';
import { composeMessage, botGreeting } from './sevices/messageGenerator.service';
import Feed from "./Feed/Feed";
import TextBar from "./TextBar/TextBar";
import {
    MAYA_FIRST_GREETING,
    MAYA_ASKS_NAME,
    MAYA_ASKS_EXPRRSION,
    MAYA_ASKS_MORE
  } from './cosnts'

const AppContainter = styled.div`
    max-width: 460px;
    margin: 0 auto;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;

const greetingMessage = composeMessage({text: MAYA_FIRST_GREETING, isBot: true});
const askNameMessage = composeMessage({text: MAYA_ASKS_NAME, isBot: true, last: true ,showAvatar: true});
const askExpressionMessage = composeMessage({text: MAYA_ASKS_EXPRRSION, isBot: true, last: true ,showAvatar: true});
const askMoreMessage = composeMessage({text: MAYA_ASKS_MORE, isBot: true, last: true ,showAvatar: true});


class App extends Component {
  constructor(props) {
    super();
    this.handleUserMessage = this.handleUserMessage.bind(this);

    const userName = localStorage.getItem('userName') || '';
    const firstMessage = userName ? composeMessage({text: botGreeting(userName), isBot: true}) : greetingMessage;
    const secondMessage = userName ? askExpressionMessage : askNameMessage;
    this.state = {
      messages: [firstMessage,secondMessage],
      userName: userName
    }
  }

  handleUserMessage(message) {
    const { userName, messages } = this.state;
    if (userName) {
      const expressionMessage = composeMessage({text: message, isBot: false, showAvatar: true});
      const expressionResult = calculator(message);
      const resultMessage = composeMessage({text: expressionResult, isBot: true});
      this.setState({messages: [...messages, expressionMessage, resultMessage, askMoreMessage]});
    } else {
      const userNameMessage = composeMessage({text: message, isBot: false, showAvatar: true});
      const greetingWithNameMessage = composeMessage({text: botGreeting(message), isBot: true, showAvatar: true});
      this.setState({messages: [...messages, userNameMessage, greetingWithNameMessage, askExpressionMessage]}, () => localStorage.setItem('userName', message));
    }
  }

  render() {
    const { messages } = this.state;
    return (
      <AppContainter>
          <Feed messages={messages}/>
          <TextBar onSubmit={this.handleUserMessage}/>
      </AppContainter>
    );
  }
}

export default App;
