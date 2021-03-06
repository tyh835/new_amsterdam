import React from 'react';
import styled from 'styled-components';
import { Box } from '@rebass/grid';

const Disclaimer = styled(Box)`
  font-family: ${props => props.theme.fonts.sans};
  width: 100%;
  font-size: 8px;
  text-align: right;
  background-color: ${props => props.theme.color.blue};
  color: #fff;

  > a,
  > a:visited {
    font-family: ${props => props.theme.fonts.sans};
    color: #fff;
  }
`;

export default () => {
  return (
    <Disclaimer>
      Windmill icons made by{' '}
      <a
        href="https://www.flaticon.com/authors/zlatko-najdenovski"
        title="Zlatko Najdenovski"
        rel="noopener noreferrer"
      >
        Zlatko Najdenovski
      </a>{' '}
      and{' '}
      <a
        href="https://www.flaticon.com/authors/roundicons"
        title="Roundicons"
        rel="noopener noreferrer"
      >
        Roundicons
      </a>{' '}
      from{' '}
      <a
        href="https://www.flaticon.com/"
        title="Flaticon"
        rel="noopener noreferrer"
      >
        www.flaticon.com
      </a>{' '}
      is licensed by{' '}
      <a
        href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0"
        target="_blank"
        rel="noopener noreferrer"
      >
        CC 3.0 BY
      </a>
    </Disclaimer>
  );
};
