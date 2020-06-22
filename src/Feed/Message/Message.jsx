import React from 'react';
import styled from 'styled-components';
import botAvatar from '../../assets/mayas_avatar.png';
import userAvatar from '../../assets/user_avatar.png';

const MassageContainer = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
`;

const Text = styled.p`
  background: #e9e9e9;
  grid-column-start: 2;
`;

const Message = ({text, iconSide}) => (
  <MassageContainer>
    <Text>{text}</Text>
    <div><img src={botAvatar} alt=""/></div>
  </MassageContainer>
);

export default Message;