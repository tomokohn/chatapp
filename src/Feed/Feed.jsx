import React from 'react';
import styled from "styled-components";
import { composeMessage } from '../sevices/messageGenerator.service';


const FeedContainer = styled.div`
    overflow-y: auto;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
`;

const shouldShowAvatar = (isBot, index, array) => {
  if (!isBot) return true;
  if (index === (array.length - 1)) return true;
  if (array[index].isBot && array[index + 1].isBot) return false;
  return true;
};

const Feed = ({messages}) => (
    <FeedContainer>
      {messages.map((msg, i, arr) =>
          composeMessage({
          key: i,
          showAvatar: shouldShowAvatar(msg.isBot, i, arr),
          ...msg
        })
      )}
    </FeedContainer>
)

export default Feed;