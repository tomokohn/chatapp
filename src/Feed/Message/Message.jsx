import React from 'react';
import styled from 'styled-components';
import botAvatar from '../../assets/mayas_avatar.png';
import userAvatar from '../../assets/user_avatar.png';


const applyRadius = (last) => last ? '0 15px 15px 15px' : '15px 15px 15px 0';

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
  border-radius: ${props => applyRadius(props.last)};
  border-radius: ${props => !props.bot && '24px'};
  margin-block-start: 3px;
  margin-block-end: 0;
  grid-column: 2;
  color: ${ props => props.bot ? '#000' : '#fbfbfb'};
`;

const AvatarImg = styled.img`
  width: 40px;
  padding: 0 5px;
`;

const Message = ({text, isBot, showAvatar, last}) => (
  <MassageContainer bot={isBot}>
    { showAvatar ? <AvatarImg src={isBot ?botAvatar : userAvatar} alt=""/> : null}
    <Text last={last} bot={isBot}>{text}</Text>
  </MassageContainer>
);

export default Message;