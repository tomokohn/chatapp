import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { composeMessage } from '../../sevices/messageGenerator.service';
import ScrollBottom from "./ScrollBottom/ScrollBottom";

const FeedContainer = styled.div`
    overflow-y: auto;
    padding-bottom: 15px;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
`;


const Feed = ({ messages }) => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const feed = React.createRef();

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    },[]);
    return ref.current;
  }
  const scrollBottom = () => {
    const currentFeed = feed.current;
    currentFeed.scrollTop = currentFeed.scrollHeight - currentFeed.clientHeight;
  }

  const prevMessages = usePrevious(messages);
  useEffect(() => {
    if (prevMessages && (prevMessages.length !== messages.length)) scrollBottom();
  }, [messages]);

  const handleScroll = () => {
    const currentFeed = feed.current;
    const shouldshowBtn = currentFeed.scrollHeight > currentFeed.scrollTop + 800;
    if (currentFeed.scrollHeight - currentFeed.scrollTop === currentFeed.clientHeight) {
      setShowScrollBtn(false);
    } else if (shouldshowBtn) setShowScrollBtn(true);
  }

  const shouldShowAvatar = (isBot, index, array) => {
    if (!isBot) return true;
    if (index === (array.length - 1)) return true;
    if (array[index].isBot && array[index + 1].isBot) {
      return false
    } else {
      return true;
    }
  };

  return (
    <FeedContainer className="feed" ref={feed} onScroll={handleScroll}>
      {messages.map((msg, i, arr) =>
        composeMessage({
          ...msg,
          key: i,
          showAvatar: shouldShowAvatar(msg.isBot, i, arr)
        })
      )}
      {showScrollBtn && <ScrollBottom onClickDown={() => scrollBottom()} />}
    </FeedContainer>
  )
}

export default Feed;

Feed.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      isBot: PropTypes.bool,
      last: PropTypes.bool
    })
  ),
};