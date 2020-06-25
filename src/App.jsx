import React, { Component } from 'react';
import styled from 'styled-components';
import calculator from './sevices/calc.service';
import {botGreeting, randomAnswer} from './sevices/messageGenerator.service';
import Feed from "./components/Feed/Feed";
import TextBar from "./components/TextBar/TextBar";
import {
    greetingMessage,
    askNameMessage,
    askExpressionMessage,
    MAYA_TYPING_TIME,
    MAYA_ASKS_MORE
  } from './cosnts';

const AppContainter = styled.div`
    max-width: 480px;
    margin: 0 auto;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
`;

class App extends Component {
  constructor(props) {
    super();
    this.handleUserMessage = this.handleUserMessage.bind(this);
    this.dedupBotAnswers = this.dedupBotAnswers.bind(this);

    const userName = localStorage.getItem('userName') || '';
    const firstMessage = userName ? {text: botGreeting(userName), isBot: true} : greetingMessage;
    const secondMessage = userName ? askExpressionMessage : askNameMessage;
    this.state = {
      messages: [firstMessage],
      userName: userName,
      currentAnswer: 0
    };
    this.addMessagesToFeedQeue(secondMessage);
  }

  handleUserMessage(message) {
    const { userName, currentAnswer } = this.state;
    if (userName) {
      const expressionMessage = {text: message, isBot: false, showAvatar: true};
      const expressionResult = calculator(message);
      const resultMessage = {text: expressionResult, isBot: true};
      const mayaAnswerIndex = randomAnswer(MAYA_ASKS_MORE, currentAnswer)
      const askMoreMessage = {text: randomAnswer(MAYA_ASKS_MORE, mayaAnswerIndex), isBot: true, last: true};
      this.setState(prevState =>({messages: [ ...prevState.messages, expressionMessage, resultMessage], currentAnswer: mayaAnswerIndex}), () => this.addMessagesToFeedQeue(askMoreMessage));
    } else {
      const userNameMessage = {text: message, isBot: false, showAvatar: true};
      const greetingWithNameMessage = {text: botGreeting(message, true), isBot: true, showAvatar: true};
      this.setState(prevState =>({messages: [...prevState.messages, userNameMessage, greetingWithNameMessage], userName: message}), () => this.addMessagesToFeedQeue(askExpressionMessage));
      localStorage.setItem('userName', message)
    }
  }

  addMessagesToFeedQeue(message) {
    setTimeout(()=> this.setState(prevState =>({messages: [...prevState.messages, message]})), MAYA_TYPING_TIME);
  }

  dedupBotAnswers (msgs) {
    let counter = 0;
    return msgs.reduce((acc, msg) => {
      counter = msg.isBot ? counter : 0;
      if(counter < 2 && msg.isBot) {
        counter++;
        return [...acc, msg]
      }
      if(!msg.isBot) return [...acc, msg];
      return acc;
    }, []);
  }

  render() {
    const { messages } = this.state;
    const dedupedMsgs = this.dedupBotAnswers(messages);
    return (
      <AppContainter>
          <Feed messages={dedupedMsgs}/>
          <TextBar onSubmit={this.handleUserMessage}/>
      </AppContainter>
    );
  }
}

export default App;


