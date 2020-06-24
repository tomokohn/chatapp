import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { composeMessage } from '../sevices/messageGenerator.service';

const FeedContainer = styled.div`
    overflow-y: auto;
    padding-bottom: 15px;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
`;

class Feed extends Component {
  constructor(props) {
    super();
    this.feed = React.createRef()
  }

  componentDidUpdate() {
    this.scrollBottom()
  }

  scrollBottom() {
    const feed = this.feed.current;
    feed.scrollTop = feed.scrollHeight - feed.clientHeight;
  }

  shouldShowAvatar(isBot, index, array) {
    if (!isBot) return true;
    if (index === (array.length - 1)) return true;
    if (array[index].isBot && array[index + 1].isBot) {
      return false
    } else {
      return true;
    }
  };

  render() {

    return (
      <FeedContainer ref={this.feed}>
        {this.props.messages.map((msg, i, arr) =>
          composeMessage({
            ...msg,
            key: i,
            showAvatar: this.shouldShowAvatar(msg.isBot, i, arr)
          })
        )}
      </FeedContainer>
    )
  }

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