import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import Feed from "./Feed/Feed";
import TextBar from "./TextBar/TextBar";
import Message from "./Feed/Message/Message";

const AppContainter = styled.div`
    max-width: 600px;
    margin: 0 auto;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    
`;

const msgA = <Message text={'hello'} iconSide={'left'} />
const msgB = <Message text={'tomer kohn'} iconSide={'right'} />

class App extends Component {
  render() {
    return (
      <AppContainter>
          <Feed messages={[msgA,msgB]}/>
          <TextBar/>
      </AppContainter>
    );
  }
}

export default App;
