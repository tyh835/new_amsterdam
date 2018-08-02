import React from 'react';
import Helmet from 'react-helmet';

// Favicons
import appleIcon from '../../img/apple-touch-icon.png';
import favicon32 from '../../img/favicon-32x32.png';
import favicon16 from '../../img/favicon-16x16.png';
import maskIcon from '../../img/safari-pinned-tab.svg';

export default () => (
  <Helmet
    title="New Amsterdam Bakery"
    meta={[
      {
        property: 'og:title',
        content: 'New Amsterdam Bakery'
      },
      {
        name: 'msapplication-TileColor',
        content: '#da532c'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      },
      {
        name: 'description',
        content:
          'Display Page for New Amsterdam Bakery: Cakes, Bread, and Pastries'
      }
    ]}
    link={[
      {
        href: `${appleIcon}`,
        rel: 'icon',
        size: '180x180'
      },
      {
        href: `${favicon32}`,
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32'
      },
      {
        href: `${favicon16}`,
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16'
      },
      {
        href: `${maskIcon}`,
        rel: 'mask-icon',
        color: '#5bbad5'
      }
    ]}
  >
    <html lang="en" />
  </Helmet>
);
