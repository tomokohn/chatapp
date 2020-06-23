import React from 'react';
import styled from "styled-components";


const FeedContainer = styled.div`
    overflow-y: auto;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
`;

const Feed = ({messages}) => (
  <FeedContainer>
    {messages.map(msg => msg)}
  </FeedContainer>
)

export default Feed;