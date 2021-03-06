import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Image from './Image.jsx';

const CardWrap = styled.div`
  width: ${props => props.dimensions.card.width || props.dimensions.card};
  height: ${props => props.dimensions.card.height || props.dimensions.card};
  background-color: ${props => props.theme.color.white};
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  grid-column: span 1;

  &:hover {
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.16), 0 4px 7px rgba(0, 0, 0, 0.23);
    cursor: pointer;
  }
`;

const ImageBox = styled.div`
  width: ${props => props.dimensions.card.image};
  height: ${props => props.dimensions.card.image};
  overflow-y: hidden;
`;

const TextBox = styled.div`
  font-family: ${props => props.theme.fonts.header};
  font-size: 1rem;
  color: ${props => props.theme.color.black};
  width: 100%;
  margin-top: 1rem;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    font-size: 1rem;
  }
`;

class Card extends Component {
  state = {
    showModal: false
  };

  handleClick = () => {
    if (this.props.toggleModal) {
      this.props.toggleModal(this.props.data);
    }
  };

  render() {
    const { data, dimensions } = this.props;
    return (
      <CardWrap dimensions={dimensions} onClick={this.handleClick}>
        {data.image && (
          <ImageBox dimensions={dimensions}>
            <Image image={data.image} alt={data.description} />
          </ImageBox>
        )}
        {data.label && <TextBox>{data.label}</TextBox>}
      </CardWrap>
    );
  }
}

Card.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.object,
    label: PropTypes.string
  }),
  dimensions: PropTypes.object
};

export default Card;
