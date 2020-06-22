import React from 'react';
import styled from "styled-components";


const FeedContainer = styled.div`
`;

const Feed = ({messages}) => (
  <FeedContainer>
    {messages.map(msg => msg)}
  </FeedContainer>
)

export default Feed;