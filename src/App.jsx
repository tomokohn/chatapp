import React, { useState } from 'react';
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
    position: relative;
    max-width: 480px;
    margin: 0 auto;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
`;

const userName = localStorage.getItem('userName') || '';
const firstMessage = userName ? { text: botGreeting(userName), isBot: true } : greetingMessage;
const secondMessage = userName ? askExpressionMessage : askNameMessage;
const initialState = {
  messages: [firstMessage],
  userName: userName,
  currentAnswer: 0
};
const App = () => {
  const [messages, setMessages] = useState(initialState.messages);
  const [currentAnswer, setCurrentAnswer] = useState(initialState.currentAnswer);
  const [userName, setUserName] = useState(initialState.userName);
  const addMessagesToFeedQeue = (message) => {
    setTimeout(() => setMessages((prevMessages) => {
      console.log('msg out', prevMessages, message);
      return [...prevMessages, message]
    }),MAYA_TYPING_TIME)
  };

  if (messages.length === 1) addMessagesToFeedQeue(secondMessage);

  const handleUserMessage = (message) => {
    if (userName) {
      const expressionMessage = {text: message, isBot: false, showAvatar: true};
      const expressionResult = calculator(message);
      const resultMessage = {text: expressionResult, isBot: true};
      const mayaAnswerIndex = randomAnswer(MAYA_ASKS_MORE, currentAnswer)
      const askMoreMessage = {text: randomAnswer(MAYA_ASKS_MORE, mayaAnswerIndex), isBot: true, last: true};
      setMessages(() =>{
        console.log("SET MESS!")
        return [...messages, expressionMessage, resultMessage]
      });
      setCurrentAnswer(() =>(mayaAnswerIndex));
      addMessagesToFeedQeue(askMoreMessage);
    } else {
      const userNameMessage = {text: message, isBot: false, showAvatar: true};
      const greetingWithNameMessage = {text: botGreeting(message, true), isBot: true, showAvatar: true};
      setMessages(() =>([...messages, userNameMessage, greetingWithNameMessage]));
      setUserName(() =>(message));
      addMessagesToFeedQeue(askExpressionMessage);
      localStorage.setItem('userName', message)
    }
  }

  const dedupBotAnswers = (msgs) => {
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

  
  const dedupedMsgs = dedupBotAnswers(messages);

  return (
    <AppContainter>
        <Feed messages={dedupedMsgs}/>
        <TextBar onSubmit={handleUserMessage}/>
    </AppContainter>
  );
}

export default App;


