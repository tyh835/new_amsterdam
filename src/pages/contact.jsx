import React, { Component } from 'react';
import styled from 'styled-components';
import { Flex } from '@rebass/grid';
import EmailValidator from 'email-validator';

import Modal from '../components/Modal.jsx';

const FormWrap = styled(Flex)`
  width: 100%;
  height: 550px;
  background: linear-gradient(
    to bottom,
    ${props => props.theme.color.teal},
    ${props => props.theme.color.blue}
  );
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  font-family: ${props => props.theme.fonts.header};
  display: grid;
  grid-template: 1fr 1fr 1fr 1fr 3fr 1fr / 1fr 3fr;
  grid-gap: 1.5rem;
`;

const Header = styled.h1`
  grid-column: span 2;
  justify-self: center;
  align-self: center;
  padding: 0.5rem 3rem;
  border-radius: 15px;
  color: ${props => props.theme.color.orange};
  background-color: ${props => props.theme.color.white};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16), 0 1px 3px rgba(0, 0, 0, 0.23);

  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    font-size: 1.5rem;
    padding: 0.5rem 1.5rem;
  }
`;

const Label = styled.p`
  justify-self: end;
  align-self: center;
  grid-column: span 1;
  color: ${props => props.theme.color.white};
`;

const Input = styled.input`
  width: 60%;
  height: 30px;
  font-size: 0.9rem;
  font-family: ${props => props.theme.fonts.sans};
  line-height: 1.5;
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
  font-size: 0.9rem !important;
  font-family: ${props => props.theme.fonts.sans};
  border: 2px solid ${props => props.theme.color.teal};
  border-radius: 5px;
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
  grid-area: 6 / 2 / 7 / 3;
  justify-self: center;
  align-self: center;
  font-family: ${props => props.theme.fonts.header};
  font-size: 1.2rem;
  border-radius: 10px;
  border: 1px solid ${props => props.theme.color.teal};
  transition: ${props => props.theme.hover.transition};
  color: ${props => props.theme.color.teal};
  background-color: ${props => props.theme.color.white};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.16), 0 1px 3px rgba(0, 0, 0, 0.23);

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
  state = {
    name: '',
    email: '',
    message: '',
    phone: '',
    sendTo: 'nabakerycakes@gmail.com',
    showModal: false,
    modalMessage: ''
  };

  validated = false;

  exitModal = () => {
    this.setState({ showModal: false });
  };

  validateInput = () => {
    const { name, email, message, phone } = this.state;
    const phoneRegex = /^[1]?-?\(?[0-9]{3}\)?-?\s?[0-9]{3}-?\s?[0-9]{4}/;
    const validPhone = phoneRegex.test(phone);
    const validEmail = EmailValidator.validate(email);
    if (!name || !email || !message || !phone) {
      this.setState({
        showModal: true,
        modalMessage: 'Please fill out all fields, thank you.'
      });
      return false;
    } else if (!validEmail) {
      this.setState({
        showModal: true,
        modalMessage: 'Please enter a valid email address.'
      });
      return false;
    } else if (!validPhone) {
      this.setState({
        showModal: true,
        modalMessage: 'Please enter a valid phone number.'
      });
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = e => {
    const validated = this.validateInput();
    if (!validated) {
      e.preventDefault();
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, message, phone, sendTo } = this.state;
    return (
      <FormWrap py={40} px={[3, 50, 100, 200]}>
        <Form
          name="contact"
          method="POST"
          action={`https://formspree.io/${sendTo}`}
          onSubmit={this.handleSubmit}
        >
          <input
            type="hidden"
            name="_next"
            value="https://newamsterdambakery.com/success"
          />
          <input type="hidden" name="_format" value="plain" />
          <input type="hidden" name="_subject" value="New Amsterdam Bakery" />
          <input type="text" name="_gotcha" style={{ display: 'none' }} />
          <Header>Contact Us</Header>
          <Label>Your Name: </Label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <Label>Your Email: </Label>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Label>Your Phone: </Label>
          <Input
            type="text"
            name="phone"
            value={phone}
            onChange={this.handleChange}
          />
          <Label>Message: </Label>
          <TextInput
            name="message"
            value={message}
            onChange={this.handleChange}
          />
          <Button type="submit">Submit</Button>
        </Form>
        {this.state.showModal && (
          <Modal
            exitModal={this.exitModal}
            data={{ description: this.state.modalMessage }}
          />
        )}
      </FormWrap>
    );
  }
}
