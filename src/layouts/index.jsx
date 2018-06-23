import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'rebass';
import theme from './theme.js';
import './global.css';

import Helmet from './components/Helmet.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Disclaimer from './components/Disclaimer.jsx';

const LayoutTemplate = ({ children }) => {
  return (
    <Fragment>
      <Helmet />
      <Header />
      {children()}
      <Footer />
      <Disclaimer />
    </Fragment>
  );
};

LayoutTemplate.propTypes = {
  children: PropTypes.func
};

const ThemedLayoutTemplate = props => {
  return (
    <Provider theme={theme}>
      <LayoutTemplate {...props} />
    </Provider>
  );
};

ThemedLayoutTemplate.propTypes = {
  children: PropTypes.func
};

export default ThemedLayoutTemplate;
