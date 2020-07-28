import React, { useState } from 'react';
import styled from 'styled-components';
import submitIcon from '../../assets/submit_icon.png'

const Container = styled.div`
    background: #f8f8f8;
    display: grid;
    grid-template-columns: auto 50px;
    padding: 10px;
    height: 50px;
    align-items: center;
`;

const Input = styled.input`
  font-size: 18px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid darkgray;
  outline: none;
`;

const Button = styled.button`
  height: 100%;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:focus {
    outline: none;
  }
`;

const SubmitIcon = styled.img`
  width: 20px;
`;

const TextBar = ({onSubmit}) => {

  const [value, setValue] = useState('');

  const handleChange = (event) => setValue(event.target.value);
  

  const handleSubmit = (value) => {
    if (!value) return;
    onSubmit(value);
    setValue('');
  }

  const handlePressSend = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(value);
    }
  }

  return (
    <Container>
      <Input type="text" value={value} onChange={handleChange} onKeyDown={handlePressSend} />
      <Button onClick={() => handleSubmit(value)}>
        <SubmitIcon src={submitIcon} alt="submit button icon"/>
      </Button>
    </Container>
    )
}

export default TextBar;