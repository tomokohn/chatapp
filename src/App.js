import React, { Component } from 'react';
import styled from 'styled-components';
import calculator from './sevices/calc.service';
import { botGreeting } from './sevices/messageGenerator.service';
import Feed from "./Feed/Feed";
import TextBar from "./TextBar/TextBar";
import {
    greetingMessage,
    askNameMessage,
    askExpressionMessage,
    askMoreMessage,
    MAYA_TYPING_TIME,
    MAYA_HAVE_NAME_PART_ONE,
    MAYA_HAVE_NAME_PART_TWO,
    MAYA_GREETING_RETURN_PART_ONE,
MAYA_GREETING_RETURN_PART_TWO
  } from './cosnts';

const AppContainter = styled.div`
    max-width: 460px;
    margin: 0 auto;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
`;




class App extends Component {
  constructor(props) {
    super();
    this.handleUserMessage = this.handleUserMessage.bind(this);

    const userName = localStorage.getItem('userName') || '';
    const firstMessage = userName ? {text: botGreeting(userName,), isBot: true} : greetingMessage;
    const secondMessage = userName ? askExpressionMessage : askNameMessage;
    this.state = {
      messages: [firstMessage],
      userName: userName
    }
    this.addMessagesToFeedQeue(secondMessage);
  }

  handleUserMessage(message) {
    const { userName, messages } = this.state;
    if (userName) {
      const expressionMessage = {text: message, isBot: false, showAvatar: true};
      const expressionResult = calculator(message);
      const resultMessage = {text: expressionResult, isBot: true};
      this.setState({messages: [...messages, expressionMessage, resultMessage]}, () => this.addMessagesToFeedQeue(askMoreMessage));
    } else {
      const userNameMessage = {text: message, isBot: false, showAvatar: true};
      const greetingWithNameMessage = {text: botGreeting(message, true), isBot: true, showAvatar: true};
      this.setState({messages: [...messages, userNameMessage, greetingWithNameMessage], userName: message}, () => this.addMessagesToFeedQeue(askExpressionMessage));
      localStorage.setItem('userName', message)
    }
  }

  addMessagesToFeedQeue(message) {
    setTimeout(()=> this.setState({messages: [...this.state.messages, message]}), MAYA_TYPING_TIME);
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
