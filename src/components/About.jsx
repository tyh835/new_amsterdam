import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import uuid from 'uuid/v4';

import { Flex, Box } from 'rebass';

import Image from './Image.jsx';

const Wrapper = Box.extend`
  height: 400px;
  display: grid;
  margin: 0;
  border-radius: 25px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  box-shadow: ${props => props.flat && '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'};
  grid-template: 20% 80% / repeat(3, 1fr);
  grid-template-areas:
    'image title .'
    'image text text';

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-areas:
      'title title title'
      'text text text';
    border-radius: ${props => props.flat || '0px'};
  }
  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 0px;
  }
`;

const ImageWrap = Flex.extend`
  justify-content: flex-end;
  align-items: center;
  grid-area: image;

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    display: none;
  }
`;

const TextBox = Flex.extend`
  font-family: ${props => props.theme.fonts.serif};
  font-size: 1rem;
  width: 100%;
  line-height: 2;
  overflow-y: scroll;
  grid-area: text;
`;

const ImageCircle = styled.div`
  overflow-x: hidden;
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const Title = styled.h2`
  font-family: ${props => props.theme.fonts.header};
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-decoration: underline;
  grid-area: title;
`;

const About = ({ flat, data, isPreview }) => {
  return (
    <Fade bottom duration={1000} distance="120px" key={data.heading}>
      <Wrapper flat={flat} width={[1, 525, 800, 800]}>
        <Title>{data.heading}</Title>
        <ImageWrap>
          <ImageCircle>
            <Image image={data.image} alt={data.alt} isPreview={isPreview} />
          </ImageCircle>
        </ImageWrap>
        <TextBox px={5} py={4} mb={4}>
          {data.description}
        </TextBox>
      </Wrapper>
    </Fade>
  );
};

About.propTypes = {
  data: PropTypes.shape({
    heading: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    description: PropTypes.string
  }),
  isPreview: PropTypes.bool
};

export default About;
