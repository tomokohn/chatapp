import React, { Component } from 'react';
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

class Feed extends Component {
  constructor(props) {
    super();
    this.state = {
      showScrollBtn: false
    }
    this.feed = React.createRef();

    this.scrollBottom = this.scrollBottom.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.messages.length !== this.props.messages.length) this.scrollBottom();
  }

  handleScroll() {
    const feed = this.feed.current;
    const shouldshowBtn = feed.scrollHeight > feed.scrollTop + 800;
    if (feed.scrollHeight - feed.scrollTop === feed.clientHeight) {
      this.setState({showScrollBtn: false });
    } else if (shouldshowBtn) this.setState({showScrollBtn: true });
  }

  scrollBottom() {
    const feed = this.feed.current;
    feed.scrollTop = feed.scrollHeight - feed.clientHeight;;
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
      <FeedContainer className="feed" ref={this.feed} onScroll={this.handleScroll}>
        {this.props.messages.map((msg, i, arr) =>
          composeMessage({
            ...msg,
            key: i,
            showAvatar: this.shouldShowAvatar(msg.isBot, i, arr)
          })
        )}
        { this.state.showScrollBtn  && <ScrollBottom onClickDown={()=> this.scrollBottom()}/>}
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