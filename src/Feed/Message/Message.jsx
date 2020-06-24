import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import botAvatar from '../../assets/mayas_avatar.png';
import userAvatar from '../../assets/user_avatar.png';
import TypingLoader from "./Typing-loder/TypingLoader";
import {MAYA_TYPING_TIME} from "../../cosnts";


const applyRadius = (last) => last ? '0 20px 20px 20px' : '20px 20px 20px 0';

const MassageContainer = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-rows: minmax(48px, auto);
  align-items: end;
  justify-content: start;
  direction: ${ props => props.bot ? 'ltr' : 'rtl'};
  margin: ${ props => props.bot ? '0px' : '15px 0'};
`;

const Text = styled.p`
  background: ${ props => props.bot ? '#e9e9e9' : '#4a4a4a'};
  padding: 12px;
  border-radius: ${props => !props.bot ? '20px' : applyRadius(props.last)};
  margin-block-start: 3px;
  margin-block-end: 0;
  grid-column: 2;
  color: ${ props => props.bot ? '#000' : '#fbfbfb'};
  direction: ltr;
  overflow-wrap: break-word;
  word-wrap: break-word;
  max-width: ${ props => `${props.brake - 120}px`}; 
`;

const AvatarImg = styled.img`
  width: 40px;
  padding: 0 5px;
`;

class Message extends Component {
  constructor() {
    super();
    this.state = {
      showTyping: true
    }
    this.message = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => this.setState({showTyping: false,}), MAYA_TYPING_TIME);
    this.textWidth =  this.message.current && this.message.current.clientWidth;
  }
  render() {
    const {text, isBot, showAvatar, last} = this.props;
    const { showTyping } = this.state;
    const avatar = isBot ? botAvatar : userAvatar;
    const imgAltText = isBot ? 'Maya\'s avatar' : 'User\'s avatar';
    return (
      <MassageContainer bot={isBot} ref={this.message}>
        { showAvatar && <AvatarImg src={ avatar } alt={ imgAltText }/>}
        { isBot && showTyping ? <TypingLoader last={last} solo={ showTyping }/> : <Text last={last} bot={isBot} brake={this.textWidth}>{text}</Text>}
      </MassageContainer>
    )
  }
};

export default Message;

Message.propTypes = {
  text: PropTypes.string,
  isBot: PropTypes.bool,
  showAvatar: PropTypes.bool,
  last: PropTypes.bool
};