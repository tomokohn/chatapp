import React from 'react';
import styled from 'styled-components';
import './TypingLoader.css';

const applyRadius = (last) => last ? '0 15px 15px 15px' : '15px 15px 15px 0';

const Continer = styled.div`
  height: 19px;
  width: 22px;
  background: #e9e9e9;
  padding: 12px;
  border-radius: ${props => applyRadius(props.last)};
  border-radius: ${props => props.solo && !props.last && '24px'};
  margin-block-start: 3px;
  margin-block-end: 0;
  grid-column: 2;
`;

const TypingLoader = (props) => (
  <Continer {...props}>
    <div className="loader">Typing...</div>
  </Continer>
);

export default TypingLoader;
