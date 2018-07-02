import React, { Component } from 'react';
import styled from 'styled-components';

import {Flex} from 'rebass';

const Wrapper = Flex.extend`
  width: 100%;
  height: 550px;
  background-color: ${props => props.theme.color.blue};
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  font-family: ${props => props.theme.fonts.header};
  display: grid;
  grid-template: 1fr 1fr 1fr 3fr 1fr / 25% 75%;
  grid-gap: 1.5rem;
`;

const Header = styled.h1`
  grid-column: span 2;
  justify-self: center;
  align-self: center;
  color: white;
`;

const Label = styled.label`
  justify-self: end;
  align-self: center;
  grid-column: span 1;
  color: ${props => props.theme.color.white};
`;

const Input = styled.input`
  width: 60%;
  height: 25px;
  border: 2px solid ${props => props.theme.color.teal};
  border-radius: 5px;
  grid-column: span 1;
  margin-left: 1rem;
  align-self: center;

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    width: 90%;
    margin-left: 0;
  }
`;

const TextInput = styled.textarea`
  width: 60%;
  height: 100%;
  border: 2px solid ${props => props.theme.color.teal};
  border-radius: 5px;
  grid-area: 4 / 2 / 5 / 3;
  margin-left: 1rem;
  resize: none;

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    width: 90%;
    margin-left: 0;
  }
`;

const Button = styled.button`
  height: 40px;
  width: 120px;
  ggrid-area: 5 / 2 / 6 / 3;
  justify-self: center;
  align-self: center;
  font-family: ${props => props.theme.fonts.header};
  font-size: 1.2rem;
  border-radius: 10px;
  border: 2px solid ${props => props.theme.color.teal};
  transition: ${props => props.theme.hover.transition};
  color: ${props => props.theme.color.teal};
  background-color: ${props => props.theme.color.white};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  &:hover {
    border: 2px solid ${props => props.theme.color.orange};
    color: ${props => props.theme.color.orange};
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', message: '' };
    this.validated = false;
  }

  validateInput = () => {
    // add actual validation
    this.validated = true;
  }

  handleSubmit = e => {
    this.validateInput();
    if (!this.validated) {
      e.preventDefault();
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, message } = this.state;
    return (
      <form name="contact" method="POST" action="/success" data-netlify="true">
        <p>
          <label>Email: <input type="text" name="name" onChange={this.handleChange} value={name} /></label>
        </p>
        <p>
          <label>Email: <input type="text" name="email" onChange={this.handleChange} value={email} /></label>
        </p>
        <p>
          <label>Message: <textarea name="message" onChange={this.handleChange} value={message}></textarea></label>
        </p>
        <div data-netlify-recaptcha></div>
        <p>
          <button type='submit'>Send</button>
        </p>
      </form>
    );
  }
}
