import React, {Component} from 'react';
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

class TextBar extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handlePressSend = this.handlePressSend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handlePressSend(e) {
    if (e.keyCode === 13) {
      this.handleSubmit(this.state.value);
    }
  }

  handleSubmit(value) {
    if(!value) return;
    this.props.onSubmit(value);
    this.setState({value: ''});
  }

  render() {
    const { value } = this.state;
    return (
        <Container>
          <Input type="text" value={value} onChange={this.handleChange} onKeyDown={this.handlePressSend} />
          <Button onClick={ () => this.handleSubmit(value)}>
            <SubmitIcon src={submitIcon} alt="submit button icon"/>
          </Button>
        </Container>
    )
  }
}

export default TextBar;