import React from 'react';
import styled, { keyframes } from 'styled-components';
import arrow from '../../../assets/arrow-down.png';

const showAnimation = keyframes`
 0% { opacity: 0; }
 30% { opacity: 0.2; }
 40% { opacity: 0.6; }
 100% { opacity: 1; }
`

const Button = styled.button`
  position: absolute;  
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 90px;
  right: 20px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: #ff007c;
  opacity: 1;
  animation-name: ${showAnimation};
  animation-duration: 0.5s;
  -webkit-box-shadow: 3px 3px 4px 0px rgba(97,97,97,1);
  -moz-box-shadow: 3px 3px 4px 0px rgba(97,97,97,1);
  box-shadow: 3px 3px 4px 0px rgba(97,97,97,1);
  
  &:focus {
    outline: none;
  }
`;

const ScrollBottom = (props) =>(
  <Button onClick={() => props.onClickDown()}>
    <img src={arrow} alt='scroll down button'/>
  </Button>
);

export default ScrollBottom;